import React from "react";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const playLocally = () => {
    navigate("/game/local");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <ButtonGroup variant="outlined" style={{ margin: "auto" }}>
        <Button onClick={playLocally}>Play locally</Button>
        <Button>Create a room</Button>
        <Button>Create A Group</Button>
      </ButtonGroup>
    </div>
  );
};

export default Home;
