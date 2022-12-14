import {
  handleGetProductByStripeProductId,
  handleMarkProductAsSold,
} from '../../db/queryHandlers';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import getRawBody from 'raw-body';
import { archiveProduct } from '../../lib/stripe';
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const rawBody = await getRawBody(req);
      const sig = req.headers['stripe-signature'];

      let event;

      // Attempt to reconstruct and validate passed event
      try {
        event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
      } catch (error) {
        console.log('webhook error');
        res.status(400).send(`Webhook Error: ${error.message}`);
        return;
      }

      if (event.type === 'checkout.session.completed') {
        const checkoutSession = event.data.object;
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
          checkoutSession.id,
          {
            expand: ['line_items'],
          }
        );
        const lineItems = sessionWithLineItems.line_items.data;

        // expire all other sessions that have the same line items

        // const allSessions = await stripe.checkout.sessions.list({});
        // allSessions.data.forEach(async (ses) => {
        //   const sesWithLineItems = await stripe.checkout.sessions.retrieve(
        //     ses.id,
        //     {
        //       expand: ['line_items'],
        //     }
        //   );
        //   const items = sesWithLineItems.line_items.data;
        //   items.forEach((item) => {
        //     lineItems.forEach(async (lineItem) => {
        //       if (lineItem.price.product === item.price.prodcut) {
        //         await stripe.checkout.sessions.expire(ses.id);
        //       }
        //     });
        //   });
        // });

        try {
          lineItems.forEach((item) => {
            archiveProduct(item.price.product)
              .then((archivedProduct) => {
                handleGetProductByStripeProductId(archivedProduct.id)
                  .then((product) => {
                    handleMarkProductAsSold(product.id).then((product) => {
                      console.log('done!: ', product.id);
                    });
                  })
                  .catch((e) => {
                    console.error(
                      'Error fetching product to mark as sold: ',
                      item.price.product
                    );
                  });
              })
              .catch((e) => {
                console.error('Error archiving product: ', item.product);
              });
          });
        } catch (error) {
          res.status(400).send(error.message);
          return;
        }
      } else {
        res.status(400).send('Error: Unhandled event type');
        return;
      }

      res.status(200).json({ received: true });
    } catch (err) {
      console.error('error: ', err.message);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
