import React from "react";
import LudoBoard from "../components/ludoBoard.component";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Pawn from "../components/pawn.component";

const Game = () => {
  const params = useParams();
  const roomId = params["roomId"];
  const pawnsInfo = useSelector((state) => state.game.pawns);

  useEffect(function () {}, [roomId]);

  return (
    <Container>
      <LudoBoard />
      {Object.keys(pawnsInfo).map((pawnColor) =>
        Object.keys(pawnsInfo[pawnColor]).map((pawnId) => (
          <Pawn
            color={pawnColor}
            id={pawnId}
            key={pawnId}
            stepIndex={pawnsInfo[pawnColor][pawnId]}
          />
        ))
      )}
      <Tester>tester</Tester>
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

const Tester = styled("div")((props) => ({
  position: "absolute",
  top: 0,
  left: 0,
}));

export default Game;
