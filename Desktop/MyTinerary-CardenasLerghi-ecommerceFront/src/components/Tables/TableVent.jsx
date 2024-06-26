import { useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import { LS } from "../../utils/LS";
import { API } from "../../utils/axios";
import './../../page/Ventas/ventas.css';  // Importa los estilos CSS

const TableVent = ({ data, onDelete }) => {
  const {
    id,
    nombre,
    fechaPago,
    apellido,
    referenciaPago,
    cedula,
    metodoPago,
    productos,
    userId,
    montoDepositado
  } = data;

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = LS.getText("role");
    if (role) {
      setUserRole(role.trim());
    }
  }, []);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres borrar la Vacante?")) {
      try {
        await API.delete(`/vacant/delete/${id}`);
        onDelete(id);
        navigate('/vacantes');
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <tr>
      <td>{fechaPago}</td>
      <td>{nombre} {apellido}</td>
      <td>{cedula}</td>
      <td>
        {productos.map((pro) => (
          <div key={pro._id}>
            <b>Nombre:</b> {pro.nombre} <br />
            <b>Cantidad:</b> {pro.cantidad} Unidad(es)
          </div>
        ))}
      </td>
      <td>{montoDepositado}</td>
      <td>{referenciaPago}</td>
      <td>{metodoPago}</td>
      <td>{userId.email}</td>
   
    </tr>
  );
};

export default TableVent;
