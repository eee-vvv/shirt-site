import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';

const publishableKey =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'nokey';
const stripePromise = loadStripe(publishableKey);

type Props = {
  priceIds: String[];
};

const CheckoutButton = ({ priceIds }: Props) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log(
        'Order canceled -- continue to shop around and checkout when you’re ready.'
      );
    }
  }, []);

  console.log("price ids: ", priceIds)

  const handleCheckout = async () => {};

  return (
    <button type="submit" role="link">
      Checkout
    </button>
  );
};

export default CheckoutButton;
