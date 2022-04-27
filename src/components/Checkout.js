import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "fomantic-ui/dist/semantic.css";
import { Container, Card, Icon, Image, Header } from "semantic-ui-react";
import ShoeCard from "./ShoeCard";
import aes256 from "aes256";

export default function Checkout() {
  let { id } = useParams();
  id = parseInt(id);
  const [shoe, setShoe] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!shoe) {
      getShoe();
    }
  }, []);
  const getShoe = async () => {
    const res = await axios.get(`http://localhost:5000/getShoe/?id=${id}`);
    var shoe;
    const key = localStorage.getItem("secretKey");
    if (key) {
      console.log("Key: ", key);
      console.log(res);
      setSecretKey(key);
      try {
        shoe = JSON.parse(aes256.decrypt(key, res.data.shoe));
        console.log("shoe", shoe);
      } catch (e) {
        console.log(e);
      }
    }
    if (shoe && shoe.name && shoe.price && shoe.description && shoe.image) {
      setShoe(shoe);
      setPrice(shoe.price);
      setName(shoe.name);
      setDescription(shoe.description);
      setImage(shoe.image);
      setErrorMsg("");
    } else {
      setShoe("Invalid shoe");
      setPrice("Invalid price");
      setName("Invalid name");
      setDescription("Invalid description");
      setImage(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_V6OX4MERP_89NpOUEgb_4lGl171D8cZOyQ&usqp=CAU"
      );
      setErrorMsg(
        "The values have been tampered or the key exchange did not take place"
      );
    }
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
      <br />
      <h3>{errorMsg}</h3>
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
            height: "250px",
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
