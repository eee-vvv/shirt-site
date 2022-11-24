import { useContext } from 'react';
import { CartContext } from '../lib/context';

type Props = {
  id: number;
  buttonContent: String;
};

const AddToCartButton = ({ id, buttonContent }: Props) => {
  const [cartContext, setCartContext] = useContext(CartContext);

  const handleClick = () => {
    console.log('click');
  };

  return (
    <button key={id} onClick={() => setCartContext([...cartContext, id])}>
      {buttonContent}
    </button>
  );
};

export default AddToCartButton;
