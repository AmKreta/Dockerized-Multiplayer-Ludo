import React from "react";
import LudoBoard from "../components/ludoBoard.component";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pawn from "../components/pawn.component";
import useSocket from "../socket/useSocket";
import {
  movePawn,
  setActiveColor,
  setMoveablePawns,
} from "../store/game.reducer";

const Game = () => {
  const pawnsInfo = useSelector((state) => state.game.pawns);
  const socket = useSocket();
  const dispatch = useDispatch();

  useEffect(
    function () {
      socket?.on(
        "movePawn",
        ({ pawnId, movedPawnColor, pathTravelledArray }) => {
          let i = 0;
          const interval = setInterval(function () {
            let stepIndex = pathTravelledArray[i++];
            dispatch(movePawn({ pawnId, stepIndex, movedPawnColor }));
            if (i === pathTravelledArray.length) clearInterval(interval);
          }, 500);
        }
      );
      socket?.on("setActiveColor", (activeColor) => {
        dispatch(setActiveColor(activeColor));
      });
      socket?.on("setMoveablePawns", (pawnIds) => {
        dispatch(setMoveablePawns(pawnIds));
      });
      return () => {
        socket?.off("movePawn");
        socket?.off("setActiveColor");
      };
    },
    [socket]
  );

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
