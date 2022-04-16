import React from "react";
import "fomantic-ui/dist/semantic.css";
import { Card, Icon, Image } from "semantic-ui-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ShoeCard(props) {
  let navigate = useNavigate();
  function handleClick() {
    console.log(`Button ${props.id} is clicked`);
    axios.get("http://localhost:5000/getPrice/?id=" + props.id).then((data) => {
      console.log(data);
    });
    navigate("/checkout/" + props.id);
  }
  return (
    <Card>
      <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW4Wam9IQiZjp_FYkZrrd99kUqESCo0RZDzg&usqp=CAU"
        wrapped
        ui={false}
        style={{ width: "auto", height: "auto" }}
      />
      <Card.Content>
        <Card.Header>{props.name}</Card.Header>
        <Card.Meta>
          <span className="date">{props.price}</span>
        </Card.Meta>
        <Card.Description>{props.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="user" />
          22 Friends
        </a>
      </Card.Content>
      <button class="ui primary button" onClick={handleClick}>
        Buy
      </button>
    </Card>
  );
}
