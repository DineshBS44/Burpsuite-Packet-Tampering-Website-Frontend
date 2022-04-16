import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
export default function Checkout() {
  let { id } = useParams();
  id = parseInt(id);
  const [shoe, setShoe] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (!shoe) {
      getShoe();
    }
  }, []);
  const getShoe = async () => {
    const res = await axios.get(`http://localhost:5000/getShoe/?id=${id}`);
    setShoe(res.data.shoe);
    setPrice(res.data.shoe.price);
    setName(res.data.shoe.name);
    setDescription(res.data.shoe.description);
  };
  return (
    <div className="App">
      <h1>Checkout Page</h1>
      <br />
      <h2>Thanks for choosing to order with us</h2>
      <br />
      <br />
      <h3>Your Order details are </h3>
      <br />
      <h3>Checkout id: {id}</h3>
      <h3>Name: {name}</h3>
      <h3>Price: {price}</h3>
      <h3>Description: {description}</h3>
    </div>
  );
}
