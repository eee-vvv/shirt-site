import { useContext } from "react"
import { CartContext, ProductsContext } from "../lib/context"



const Cart = () => {
  const [cartContext, setCartContext]= useContext(CartContext)
  const productsContext = useContext(ProductsContext)
  return (
    <div>
      <h1>Cart Open</h1>
      <ul>
        {
        cartContext.map(id => 
        {
        const product = productsContext.find(product => product.id === id)
        return <li key={id}>{product?.name}</li>
        }
        )}
      </ul>
    </div>
  )
}

export default Cart
