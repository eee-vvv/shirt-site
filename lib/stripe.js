const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createProduct = async (productName, price) => {
  try {
    const product = await stripe.products.create({
      name: productName,
      default_price_data: {
        unit_amount: price,
        currency: 'usd',
      },
      expand: ['default_price'],
    });
    return product;
  } catch (e) {
    return { error: e };
  }
};

const editProduct = async (productName, price)

export { createProduct };
