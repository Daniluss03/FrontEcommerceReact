import React, { useState, useEffect } from "react";
import "../cardsTienda/cardsTienda.css"
import { data } from "../data";
import products from "../data";
import Products from "../Products/Products";
import Input from "../Input/Input";
import Card from "../Card/Card";

export const CardsTienda = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [active, setActive] = useState(false);

  const onAddProduct = (product) => {
    const existingProduct = allProducts.find((item) => item.product_id === product.product_id);
  
    if (existingProduct) {
      const updatedProducts = allProducts.map((item) =>
        item.product_id === product.product_id
          ? { ...item, quantity_available: item.quantity_available + 1 }
          : item
      );
  
      setAllProducts(updatedProducts);
      setTotal(total + product.price);
      setCountProducts(countProducts + 1);
    } else {
      setAllProducts([...allProducts, { ...product, quantity_available: 1 }]);
      setTotal(total + product.price);
      setCountProducts(countProducts + 1);
    }
  };

  const onDeleteProduct = (product) => {
    const results = allProducts.filter(
      (item) => item.product_id !== product.product_id
    );
    setTotal(total - product.price * product.quantity_available);
    setCountProducts(countProducts - product.quantity_available);
    setAllProducts(results);
  };

  const onCleanCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  };

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = products.filter(
    (product) => product.product_name.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );


  function filteredData(products, query) {
    let filteredProducts = products;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    }

    return filteredProducts.map((product) => (
      <Card
        key={product.product_id}
        product_id={product.product_id} // Asegúrate de usar el atributo correcto del producto
        product_name={product.product_name}
        price={product.price}
        quantity_available={product.quantity_available}
        onAddProduct={onAddProduct}
      />
    ));
  }
  const result = filteredData(products, query);


  return (
    <>
    <div>
      <header>
        <h1>Tienda</h1>
        <Input  query={query} handleInputChange={handleInputChange} />

        <div className="container-icon">
          <div
            className="container-cart-icon"
            onClick={() => setActive(!active)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="icon-cart"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <div className="count-products">
              <span id="contador-productos">{countProducts}</span>
            </div>
          </div>

          <div
            className={`container-cart-products ${active ? "" : "hidden-cart"}`}
          >
            {allProducts.length ? (
              <>
                <div className="row-product">
                  {allProducts.map((product) => (
                    <div className="cart-product" key={product.product_id}>
                      <div className="info-cart-product">
                        <span className="cantidad-producto-carrito">
                          {product.quantity_available}
                        </span>
                        <p className="titulo-producto-carrito">
                          {product.product_name}
                        </p>
                        <span className="precio-producto-carrito">
                          ${product.price}
                        </span>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="icon-close"
                        onClick={() => onDeleteProduct(product)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  ))}
                </div>

                <div className="cart-total">
                  <h3>Total:</h3>
                  <span className="total-pagar">${total}</span>
                </div>

                <button className="btn-clear-all" onClick={onCleanCart}>
                  Vaciar Carrito
                </button>
              </>
            ) : (
              <p className="cart-empty">El carrito está vacío</p>
            )}
          </div>
        </div>
      </header>

      
{/*
      <div className="container-items">
        {data.map((product) => (
          <div className="item" key={product.product_id}>
            <figure>
              <img src='https://th.bing.com/th/id/OIP.eaq_26oIkgNcEnPgmI1GbgHaE7?pid=ImgDet&w=130&h=86.775&c=7' alt={product.product_name} />
            </figure>
            <div className="info-product">
              <h2>{product.product_name}</h2>
              <p className="price">${product.price}</p>
              <button onClick={() => onAddProduct(product)}>
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
        */}
    </div>
    <Products result={result} />
    </>
  );
};
export default CardsTienda;