import "./Category.css";
import Input1 from "../../Input1";

function Category({ handleChange }) {
  return (
    <div>
      <h2 className="sidebar-title">Category</h2>

      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>All
        </label>
        <Input1
          handleChange={handleChange}
          value="Televisor"
          title="Televisor"
          name="test"
        />
        <Input1
          handleChange={handleChange}
          value="flats"
          title="Flats"
          name="test"
        />
        <Input1
          handleChange={handleChange}
          value="sandals"
          title="Sandals"
          name="test"
        />
        <Input1
          handleChange={handleChange}
          value="heels"
          title="Heels"
          name="test"
        />
      </div>
    </div>
  );
}

export default Category;