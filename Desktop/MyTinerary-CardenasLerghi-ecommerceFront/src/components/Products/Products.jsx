import { useContext } from "react";
import "./Products.css";
import { AddToCartIcon, RemoveFromCartIcon } from "./../Icons.jsx";
import { CartContext } from "../context/cart.jsx";

export function Products({ products }) {
  const { addToCart, cart, removeFromCart } = useContext(CartContext);

  const checkProductInCart= product=>{
    return  cart.some(item=>item._id===product._id)
  } 

  return (
    <main className="products">
      <ul>
        {products.slice(0, 30).map((product) => {
         const isProductIncart= checkProductInCart(product)
          return (
            <div key={product._id}>
              <li>
                <img src={product.thumbnail} alt={product.name} />
                <div>
                  <strong>{product.name}</strong>
                </div>
                <div style={{ fontSize: "0.9rem", whiteSpace: "pre-wrap" }}>
                  {product.description}
                </div>
                <div>${product.price}</div>
                <div>
                  <button
                    style={{
                      backgroundColor: isProductIncart ? "red" : "#09f",
                    }}
                    onClick={() => {
                      isProductIncart
                        ? removeFromCart(product)
                        : addToCart(product);
                    }}
                  >
                    {isProductIncart ? (
                      <RemoveFromCartIcon />
                    ) : (
                      <AddToCartIcon />
                    )}
                  </button>
                </div>
              </li>
            </div>
          );
        })}
      </ul>
    </main>
  );
}