import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';

const publishableKey =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'nokey';
const stripePromise = loadStripe(publishableKey);

type Props = {
  priceIds: (string | undefined)[];
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


  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: priceIds }),
    });
    response.json().then((data) => {
      const id = data.id;
      stripe
        ?.redirectToCheckout({
          sessionId: id,
        })
        .then((result) => {
          // console.log('result: ', result);
        })
        .catch((e) => {
          console.error(e);
        });
    });
  };

  return <button onClick={handleCheckout}>Checkout</button>;
};

export default CheckoutButton;
