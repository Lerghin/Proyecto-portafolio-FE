import { useContext, useEffect, useState } from "react";
import "./Products.css";
import { AddToCartIcon, RemoveFromCartIcon } from "./../Icons.jsx";
import { CartContext } from "../context/cart.jsx";
import { LS } from "../../Utils/LS.js";

export function Products({ products }) {
  const { addToCart, cart, removeFromCart } = useContext(CartContext);
  const [userRole, setUserRole] = useState(null);

  const checkProductInCart= product=>{
    return  cart.some(item=>item._id===product._id)
  } 

  useEffect(() => {
    try {
      const role = LS.getText("role")?.trim();  // Handle potential null or undefined role
      if (role) {
        setUserRole(role);
      } else {
        setUserRole("GUEST");  // Set a default role if no role is found
      }
    } catch (error) {
      console.error("Error fetching role:", error);
      setUserRole("GUEST");  // Default role in case of error
    }
  }, []);


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
                {userRole !== 'ADMIN' && (   <button
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
                    )}
                </div>
              </li>
            </div>
          );
        })}
      </ul>
    </main>
  );
}