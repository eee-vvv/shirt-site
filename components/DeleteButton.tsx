import { useRouter } from 'next/router'

type Props = {
  id: number;
  buttonContent: String;
};

const DeleteButton = ({ id, buttonContent }: Props) => {
  // TODO:
  //  1) Client-side handling of multiple clicks
  const router = useRouter()

  const handleClick = async () => {
    const response = await fetch(`/api/product/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify('product deleted'),
    });
    const result = await response.json();
    if (result.message === 'product deleted') {
      console.log('deleted!')
      router.reload()
    } else {
      console.log('something went wrong...')
    }
  };

  return <button onClick={handleClick}>{buttonContent}</button>;
};

export default DeleteButton;
