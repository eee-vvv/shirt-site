import { useContext } from 'react';
import { CartContext } from '../lib/context';

type Props = {
  id: number;
  buttonContent: String;
};

const AddToCartButton = ({ id, buttonContent }: Props) => {
  const [cartContext, setCartContext] = useContext(CartContext);

  const handleClick = () => {
    const alreadyInCart = cartContext.includes(id);

    if (!alreadyInCart) {
      setCartContext([...cartContext, id]);
    } else {
      console.log('already in cart')
    }
  };

  return <button onClick={handleClick}>{buttonContent}</button>;
};

export default AddToCartButton;
