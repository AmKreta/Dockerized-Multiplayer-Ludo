import React from "react";
import LudoBoard from "../components/ludoBoard.component";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Game = () => {
  const params = useParams();
  const roomId = params["roomId"];

  useEffect(
    function () {
      if (roomId === "local") {
        console.log("it's a local game");
      } else {
      }
    },
    [roomId]
  );

  return (
    <Container>
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
