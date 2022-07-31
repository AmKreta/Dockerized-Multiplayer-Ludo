import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React, { useEffect } from "react";
import useSocket from "../socket/useSocket";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setInitialPawnsPosition } from "../store/game.reducer";
import { ROUTES_OBJ } from "../router/router.component";

const WaitingRoom = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomId } = useParams();

  useEffect(
    function () {
      socket?.on("gameStarted", function ({ pawnsInfo }) {
        dispatch(setInitialPawnsPosition(pawnsInfo));
        navigate(ROUTES_OBJ.GAME.getPath(roomId));
      });
      return () => socket?.off("gameStarted");
    },
    [socket]
  );

  const startGame = () => {
    socket.emit("startGame", roomId);
  };

  return (
    <div>
      <Typography>waiting room</Typography>
      <Typography>Invite players</Typography>
      <Button onClick={startGame}>Start Game</Button>
    </div>
  );
};

export default WaitingRoom;
