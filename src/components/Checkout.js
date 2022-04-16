import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "fomantic-ui/dist/semantic.css";
import { Container, Card, Icon, Image, Header } from "semantic-ui-react";
import ShoeCard from "./ShoeCard";

export default function Checkout() {
  let { id } = useParams();
  id = parseInt(id);
  const [shoe, setShoe] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
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
    setImage(res.data.shoe.image);
  };
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <br />
      <Header as="h2" icon textAlign="center">
        <Icon name="cart arrow down" circular />
        <Header.Content>Checkout</Header.Content>
      </Header>
      <h2>Thanks for choosing to order with us</h2>
      <br />
      <h3>Your Order details are </h3>
      <br />
      <h3>Checkout id: {id}</h3>
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <Image
          src={image}
          wrapped
          ui={false}
          style={{
            width: "250px",
            height: "180px",
            marginTop: "30px",
            objectFit: "cover",
            margin: "auto",
            display: "block",
            verticalAlign: "middle",
            horizontalAlign: "middle",
            backgroundColor: "white",
          }}
        />
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Meta>
            <span className="date">{description}</span>
          </Card.Meta>
          <Card.Description>Price: {price}</Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
}
