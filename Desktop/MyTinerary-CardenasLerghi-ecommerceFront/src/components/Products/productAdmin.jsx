import './Products.css';
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { API } from '../../utils/axios';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { ref, deleteObject } from "firebase/storage"; // Importa deleteObject y ref
import { storage } from '../../credenciales'; // Asegúrate de que esto apunta a la configuración correcta de Firebase

export function ProductAdmin({ products }) {
  const navigate = useNavigate();
  const [productList, setProductList] = useState(products);

  // Función para manejar la eliminación del producto
  const handleDelete = async (id, thumbnail) => {
    try {
      // Elimina el producto en la base de datos
      await API.delete(`/products/${id}`);
      
      // Elimina la imagen en Firebase Storage
      const imageRef = ref(storage, thumbnail);
      await deleteObject(imageRef);

      toast.success('Producto e imagen eliminados con éxito');
      
      // Filtra el producto eliminado fuera del estado
      setProductList(productList.filter(product => product._id !== id));
    } catch (error) {
      toast.error('Error al eliminar el producto o la imagen');
      console.error(error);
    }
  };

  // Función para navegar a la página de edición
  const handleEdit = (id) => {
    navigate(`/editProduct/${id}`);
  };

  useEffect(() => {
    setProductList(products);
  }, [products]);

  return (
    <main className='products'>
      <ul>
        {productList.slice(0, 30).map(product => {
          return (
            <div key={product._id} className="product-card">
              <li>
                <img src={product.thumbnail} alt={product.name} />
                <div>
                  <strong>Nombre: {product.name}</strong>
                </div>
                <div>
                  <strong>Categoría: {product.category}</strong>
                </div>
                <div>
                  Precio: ${product.price}
                </div>
                <div>
                  Stock: {product.stock}
                </div>
                <div className="product-actions">
                  <button 
                    className="edit-button" 
                    onClick={() => handleEdit(product._id)}
                  >
                    <FaUserEdit /> Editar
                  </button>
                  <button 
                    className="delete-button" 
                    onClick={() => handleDelete(product._id, product.thumbnail)}
                  >
                    <MdDeleteForever /> Eliminar
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
