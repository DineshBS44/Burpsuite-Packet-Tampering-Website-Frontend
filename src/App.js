import logo from "./logo.svg";
import "./App.css";
import React from "react";
import axios from "axios";
import "fomantic-ui/dist/semantic.css";
import { Container, Card, Icon, Image } from "semantic-ui-react";
import ShoeCard from "./components/ShoeCard";
import { CardDeck } from "reactstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DisplayShoes from "./components/DisplayShoes";
import Checkout from "./components/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DisplayShoes />} exact />
        <Route path="/checkout/:id" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
