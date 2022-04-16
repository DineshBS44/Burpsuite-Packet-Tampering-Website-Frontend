import React from "react";
import "fomantic-ui/dist/semantic.css";
import { Card, Icon, Image } from "semantic-ui-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ShoeCard(props) {
  let navigate = useNavigate();
  function handleClick() {
    console.log(`Button ${props.id} is clicked`);
    navigate("/checkout/" + props.id);
  }
  return (
    <Card style={{ marginBottom: "30px" }}>
      <Image
        src={props.image}
        wrapped
        ui={false}
        style={{
          width: "200px",
          height: "130px",
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "cover",
          margin: "auto",
          display: "block",
          verticalAlign: "middle",
          horizontalAlign: "middle",
          backgroundColor: "white",
        }}
      />
      <Card.Content>
        <Card.Header>{props.name}</Card.Header>
        <Card.Meta>
          <span className="date">{props.description}</span>
        </Card.Meta>
        <Card.Description>Price: {props.price}</Card.Description>
      </Card.Content>
      <button class="ui primary button" onClick={handleClick}>
        Buy
      </button>
    </Card>
  );
}
