const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/// RETURNS newly-created product
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

/// RETURNS object containing productId and priceId
const editProduct = async (id, productName, price, priceId) => {
  try {
    console.log('in editProduct');
    console.log('price: ', price);
    const stripePrice = await stripe.prices.retrieve(priceId);
    let newPriceId = priceId;

    if (stripePrice !== price) {
      const newPrice = await stripe.prices.create({
        unit_amount: price,
        currency: 'usd',
        product: id,
      });
      newPriceId = newPrice.id;
    }

    const product = await stripe.products.update(id, {
      name: productName,
      default_price: newPriceId,
    });

    return {
      productId: id,
      priceId: newPriceId,
    };
  } catch (error) {
    return { error };
  }
};

export { createProduct, editProduct };
