type Props = {
  id: number;
  buttonContent: String;
};

const AddToCartButton = ({ id, buttonContent }: Props) => {
  const handleClick = () => {
    console.log('click')
  }

  return <button onClick={handleClick}>{buttonContent}</button>;
};
