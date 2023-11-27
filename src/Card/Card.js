import { BsFillBagFill } from "react-icons/bs";
import '../Products/Products.css'

const Card = ({
  product_id,
  product_name,
  price,
  quantity_available,
  onAddProduct,
}) => {
  return (
    <>
      <section className="card">
        <div className="item" key={product_id}>
          <figure>
            <img
              src="https://th.bing.com/th/id/OIP.eaq_26oIkgNcEnPgmI1GbgHaE7?pid=ImgDet&w=130&h=86.775&c=7"
              alt={product_name}
            />
          </figure>
          <div className="info-product">
            <h2>{product_name}</h2>
            <p className="price">${price}</p>
            <button
              onClick={() =>
                onAddProduct({
                  product_id,
                  product_name,
                  price,
                  quantity_available,
                })
              }
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Card;
