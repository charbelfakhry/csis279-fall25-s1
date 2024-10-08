import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Message from "./components/Message";
import ListGroup from "./components/ListGroup";
import Users from "./components/Users";
import CreateUser from "./components/CreateUser";

function App() {
  return (
    <div className="container">
      <h2>user managment!!yay</h2>

      <div className="mt-5">
        <h2>create usher here</h2>
        <CreateUser />
      </div>

      <div className="mt-5">
        <h2>existing users</h2>
        <Users />
      </div>

    </div>
  );
}

export default App;
