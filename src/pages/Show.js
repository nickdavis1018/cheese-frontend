import { useState } from "react";

function Show(props) {
  const id = props.match.params.id;
  const cheeses = props.cheese;
  const cheese = cheeses.find((singleCheese) => {
    return singleCheese._id === id;
  });

  const [editForm, setEditForm] = useState(cheese);

  const handleChange = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    props.updateCheese(editForm, cheese._id)
    props.history.push("/")
  }

  const removeCheese = () => {
    props.deleteCheese(cheese._id)
    props.history.push("/")

  }

  return (
    <div className="cheese">
      <h1>{cheese.name}</h1>
      <h2>{cheese.countryOfOrigin}</h2>
      <img src={cheese.image} alt={cheese.name} /><br/>
      <button onClick={removeCheese} id="delete">
        Delete {cheese.name}
      </button>
<div className="newCheeseForm">
      <form onSubmit={handleSubmit}>
        <input
        type="text"
        value={editForm.name}
        name="name"
        placeholder="name"
        onChange={handleChange}
        />
        <input
        type="text"
        value={editForm.image}
        name="image"
        placeholder="Image URL (add .png)"
        onChange={handleChange}
        />
        <input 
        type="text"
        value={editForm.countryOfOrigin}
        name="countryOfOrigin"
        placeholder="Country of Origin"
        onChange={handleChange}
        />
        <input className="button" type="submit" value="Update Cheese"/>
      </form></div>
    </div>
  );
}

export default Show;