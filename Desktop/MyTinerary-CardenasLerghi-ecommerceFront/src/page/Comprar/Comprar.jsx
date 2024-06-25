import { useState, useEffect } from "react";
import "./Comprar.css";
import Formulario from "../../components/Formulario/Formulario.jsx";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function Comprar() {
  const [cartData, setCartData] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [userId, setUserId] = useState(null); // Estado para almacenar el userId

  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.userId) {
      setUserId(location.state.userId);
      console.log(location.state) // Obtener el userId del estado de la ubicación
    }
  }, [location.state]);

  useEffect(() => {
    const storedCartData = JSON.parse(sessionStorage.getItem("cartData"));
    setCartData(storedCartData);
  }, []);

  const Pagar = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMostrarFormulario(true);
  };

  // Calcular el total de compras
  const total = cartData.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  return (
    <>
      <section className="checkout">
        {cartData && cartData.length > 0 && (
          <div>
            <div className="title"><h2>Resumen de Compras</h2></div>
            <div className="products">
              <ul>
                {cartData.map((product) => (
                  <main key={product._id}>
                    <div>
                      <li>
                        <img src={product.thumbnail} alt={product.title} />
                        <div>
                          <strong>{product.title}</strong>
                        </div>
                        <div>
                          <strong>Cantidad: {product.quantity}</strong>
                        </div>
                        <div>
                          USD$ {product.price}
                        </div>
                      </li>
                    </div>
                  </main>
                ))}
              </ul>
            </div>
            <h2>
              <b>Total: $</b>
              {total}
            </h2>
          </div>
        )}
        <div className="button">
          <a
            type="button"
            className="btn btn-primary"
            href="#formulario"
            onClick={Pagar}
          >
            Pagar
          </a>

          <Link type="button" className="btn btn-danger" to="/home">
            Atras
          </Link>
        </div>
      </section>
      <br /> <br />
      <section id="formulario" className={`formulario${mostrarFormulario ? "" : " oculto"}`}>
        {mostrarFormulario && (
          <>
            <h2>Formulario de Pago</h2>
            <Formulario userId={userId} cartData={cartData} total={total} /> {/* Pasamos el total al componente Formulario */}
          </>
        )}
      </section>
    </>
  );
}

export default Comprar;
