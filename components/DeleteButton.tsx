type Props = {
  id: number;
  buttonContent: String;
};

const DeleteButton = ({ id, buttonContent }: Props) => {
  // TODO:
  //  1) Client-side handling of multiple clicks
  const handleClick = async () => {
    const response = await fetch(`/api/product/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify('product deleted'),
    });
    const result = await response.json();
    return result.data;
  };

  return <button onClick={handleClick}>{buttonContent}</button>;
};

export default DeleteButton;
