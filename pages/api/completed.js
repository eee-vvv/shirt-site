const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import getRawBody from 'raw-body';
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

        try {
          // update database
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
