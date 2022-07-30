import React from "react";
import LudoBoard from "../components/ludoBoard.component";
import { styled } from "@mui/material/styles";

const Game = () => {
  return (
    <Container>
      {" "}
      <LudoBoard />
    </Container>
  );
};

const Container = styled("div")((props) => ({
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default Game;
