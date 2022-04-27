import "../App.css";
import React from "react";
import axios from "axios";
import "fomantic-ui/dist/semantic.css";
import { Header, Container, Card, Icon, Image } from "semantic-ui-react";
import ShoeCard from "./ShoeCard";
import { CardDeck } from "reactstrap";
const crypto = require("crypto-browserify");

class DisplayShoes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoes: [],
      secretKey: null,
    };
    this.executeFunction = this.executeFunction.bind(this);
    this.exchangeKeys = this.exchangeKeys.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:5000/data").then((data) => {
      console.log(data);
      this.setState({
        shoes: data.data.shoes,
      });
    });
    this.setState({ secretKey: localStorage.getItem("secretKey") });
  }

  async executeFunction() {
    console.log("Hello");
    alert("Hello");
    axios.get("http://localhost:5000/data").then((data) => {
      console.log(data);
      this.setState({
        content: data.data.data,
      });
    });
  }

  exchangeKeys() {
    const bob = crypto.createECDH("secp256k1");
    bob.generateKeys();
    const bobPublicKey = bob.getPublicKey().toString("base64");
    console.log("Bob public key client side: ", bobPublicKey);
    axios
      .post("http://localhost:5000/exchangeKeys", {
        publicKey: bobPublicKey,
      })
      .then((data) => {
        console.log(data);
        const alicePublicKey = data.data.publicKey;
        console.log("Alice public key client side, ", alicePublicKey);
        const bobSharedKey = bob
          .computeSecret(alicePublicKey, "base64", null)
          .toString("hex");
        console.log("Bob shared key client side: " + bobSharedKey);
        this.setState({
          secretKey: bobSharedKey,
        });
        localStorage.setItem("secretKey", bobSharedKey);
      });
  }

  render() {
    let button;
    if (this.state.secretKey == null || this.state.secretKey != null) {
      button = <button onClick={this.exchangeKeys}>Exchange Keys</button>;
    }
    return (
      <div className="App">
        <br />
        <Header as="h2" icon textAlign="center">
          <Icon name="warehouse" circular />
          <Header.Content>Shoes</Header.Content>
          {button}
        </Header>
        <br />
        <Container>
          <CardDeck
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {this.state.shoes.map((shoe, index) => {
              return (
                <ShoeCard
                  key={index}
                  name={shoe.name}
                  price={shoe.price}
                  image={shoe.image}
                  description={shoe.description}
                  id={shoe.id}
                  style={{ flex: 3 }}
                />
              );
            })}
          </CardDeck>
        </Container>
      </div>
    );
  }
}

export default DisplayShoes;
