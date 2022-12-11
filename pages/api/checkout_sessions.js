const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      if (!req.body.ids) {
        res.status(400).json('No IDs in REQ body');
      }

      const lineItems = req.body.ids.map((id) => ({
        price: id,
        quantity: 1,
      }));

      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        automatic_tax: { enabled: true },
        shipping_address_collection: { allowed_countries: ['US'] },
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              tax_behavior: 'inclusive',
              fixed_amount: { amount: 0, currency: 'usd' },
              display_name: 'Free shipping',
              delivery_estimate: {
                minimum: { unit: 'business_day', value: 7 },
                maximum: { unit: 'business_day', value: 10 },
              },
            },
          },
        ],
      });

      res.json({ id: session.id });
    } catch (err) {
      console.error('error: ', err.message);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
