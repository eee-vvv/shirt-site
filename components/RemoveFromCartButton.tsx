import { useContext } from 'react';
import { CartContext } from '../lib/context';

type Props = {
  id: number;
};

const RemoveFromCartButton = ({ id }: Props) => {
  const [cartContext, setCartContext] = useContext(CartContext);

  console.log('cart context --> ', cartContext)

  const handleClick = (e: React.SyntheticEvent) => {
    const tempCart = cartContext.filter(val => val !== id)
    setCartContext(tempCart)
  };

  return <button onClick={handleClick}>X</button>;
};

export default RemoveFromCartButton;
