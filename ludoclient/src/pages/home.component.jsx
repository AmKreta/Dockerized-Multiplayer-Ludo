import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";
import useSocket from "../socket/useSocket";
import { useDispatch } from "react-redux";
import { setGameRoomId } from "../store/game.reducer";
import { ROUTES_OBJ } from "../router/router.component";
import Dice from "../components/dice.component";

const Home = () => {
  const navigate = useNavigate();
  const socket = useSocket();
  const dispatch = useDispatch();

  useEffect(
    function () {
      socket?.on("roomCreated", (roomId) => {
        dispatch(setGameRoomId(roomId));
        navigate(ROUTES_OBJ.WAITING_ROOM.getPath(roomId));
      });
      return () => socket?.off("roomCreated");
    },
    [socket]
  );

  const createARoom = () => {
    socket.emit("createRoom");
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
        <Button onClick={createARoom}>Create a room</Button>
        <Button>Join A Room</Button>
        <Button>Create A Group</Button>
      </ButtonGroup>
    </div>
  );
};

export default Home;
