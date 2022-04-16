import "../App.css";
import React from "react";
import axios from "axios";
import "fomantic-ui/dist/semantic.css";
import { Header, Container, Card, Icon, Image } from "semantic-ui-react";
import ShoeCard from "./ShoeCard";
import { CardDeck } from "reactstrap";

class DisplayShoes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoes: [],
    };
    this.executeFunction = this.executeFunction.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:5000/data").then((data) => {
      console.log(data);
      this.setState({
        shoes: data.data.shoes,
      });
    });
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
  render() {
    return (
      <div className="App">
        <br />
        <Header as="h2" icon textAlign="center">
          <Icon name="warehouse" circular />
          <Header.Content>Shoes</Header.Content>
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
