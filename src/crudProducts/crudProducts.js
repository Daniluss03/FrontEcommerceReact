import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const CrudProducts = () => {
  //url para crear
  const url = "http://localhost:8080/api/provedores/post";
  //url para editar
  const url2 ="http://localhost:8080/api/provedores/editar"
//const url para eliminar
  const url3 = "http://localhost:8080/api/provedores/";
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [form, setForm] = useState({
		product_id: "",
    product_name: "",
    description:"",
		price: "",
		quantity_available: "",
		category:"",
    tipoModal: "",
  });

  const [data, setData] = useState([]);

  const fetchProvedores = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/provedores/list');
      const responseData = await response.text(); // Obtener la respuesta como texto
  
      if (responseData.trim() !== '') { // Verificar si la respuesta no está vacía
        const result = JSON.parse(responseData); // Intentar analizar la respuesta como JSON
        setData(result);
        console.log(result);
      } else {
        console.error("La respuesta está vacía");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  


  const peticionPost = async () => {
    try {
      const { id, ...formData } = form; 
      console.log(form)
      await axios.post(url, formData);
      setModalInsertar(false);
      fetchProvedores();
    } catch (error) {
      console.log(form)
      console.log(error.message);
    }
  };

  const peticionPut = async () => {
    try {
      await axios.put(`${url2}`, form);

      console.log(form)
      setModalInsertar(false);
      fetchProvedores();
    } catch (error) {
      console.log(error.message);
      console.log(form)
    }
  };

  const peticionDelete = async () => {
    try {
     
      await axios.delete(`${url3}${form.product_id}`);
      setModalInsertar(false);
      setModalEliminar(false);
      fetchProvedores();
    } catch (error) {
      console.log(error.message);
      console.log(`${url3}${form.product_id}`)
    }
  };

  // Función para abrir/cerrar el modal
  const toggleModal = () => {
    setModalInsertar(!modalInsertar);
  };
  const toggleModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  useEffect(() => {
    fetchProvedores();
    
  }, []);


  const seleccionarEmpresa = (item) => {
    setForm({
      product_id: item.product_id,
      product_name: item.product_name,
      description: item.description,
      price: item.price,
      quantity_available: item.quantity_available,
      category: item.category,
      tipoModal: 'actualizar',
    });
  
  };
  

  const handleChange = async (e) => {
    e.persist();
    await setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="container mt-3 shadow-lg p-3 mb-5 bg-body rounded">
      <button
        className="btn btn-success"
        onClick={() => {
          setForm({
            product_id: "",
            product_name: "",
            description:"",
            price: "",
            quantity_available: "",
            category:"",
            tipoModal: "insertar",
          });
          setModalInsertar(true);
        }}
      >Crear</button>
      <table id="tabla" className="table mt-2 table-bordered table-striped">
        <thead>
          <tr className="text-center">
            {/* th deben tener el nombre de las columnas de los parámetros */}
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Categoria</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.product_id}>
              <td>{item.product_name}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>{item.quantity_available}</td>
              <td>{item.category}</td>
              <td>
                <button className="btn btn-primary" onClick={()=>{
                  seleccionarEmpresa(item); 
                  setModalInsertar(true);}}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{
                  seleccionarEmpresa(item); 
                  setModalEliminar({modalEliminar: true})}}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal para insertar o actualizar */}
      <Modal isOpen={modalInsertar} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {form.tipoModal === "insertar"
            ? "Insertar Empresa"
            : "Actualizar Empresa"}
        </ModalHeader>
        <ModalBody>
          {/* Contenido del formulario dentro del modal */}
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input
              className="form-control"
              type="text"
              name="product_id"
              id="product_id"
              readOnly
              onChange={handleChange}
              value={form ? form.product_id : data.length + 1} // Reemplaza 'data.length + 1' con el valor correspondiente
            />
            <br />
            <label htmlFor="nombre">Nombre</label>
            <input
              className="form-control"
              type="text"
              name="product_name"
              id="product_name"
              onChange={handleChange}
              value={form ? form.product_name : ""}
            />
            <br />
            <label htmlFor="nombre">Descripcion</label>
            <input
              className="form-control"
              type="text"
              name="description"
              id="description"
              onChange={handleChange}
              value={form ? form.description : ""}
            />
            <br />
            <label htmlFor="nombre">Precio</label>
            <input
              className="form-control"
              type="text"
              name="price"
              id="price"
              onChange={handleChange}
              value={form ? form.price : ""}
            />
            <br />
            <label htmlFor="nombre">Cantidad</label>
            <input
              className="form-control"
              type="text"
              name="quantity_available"
              id="quantity_available"
              onChange={handleChange}
              value={form ? form.quantity_available : ""}
            />
            <br />
            <label htmlFor="pais">Categoria</label>
            <input
              className="form-control"
              type="text"
              name="category"
              id="category"
              onChange={handleChange}
              value={form ? form.category : ""}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          {form.tipoModal === "insertar" ? (
            <button className="btn btn-success" onClick={peticionPost}>
              Insertar
            </button>
          ) : (
            <button className="btn btn-primary" onClick={peticionPut}>
              Actualizar
            </button>
          )}
          <button className="btn btn-danger" onClick={toggleModal}>
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      {/* Modal para eliminar */}
      <Modal isOpen={modalEliminar} toggle={toggleModal}>
        <ModalBody>
          ¿Estás seguro que deseas eliminar {form && form.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={peticionDelete}>
            Sí
          </button>
          <button className="btn btn-secondary" onClick={toggleModalEliminar}>
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CrudProducts;
