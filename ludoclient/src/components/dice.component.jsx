import React, { useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import useSocket from "../socket/useSocket";
import { useParams } from "react-router-dom";

const Face1 = () => {
  return (
    <div className="face_1_2_container">
      <Dot />
    </div>
  );
};

const Face2 = () => {
  return (
    <div className="face_1_2_container">
      {[1, 2].map((item) => (
        <Dot key={item} />
      ))}
    </div>
  );
};

const Face3 = () => {
  return (
    <Face3Container>
      {[1, 2, 3].map((item) => (
        <Dot key={item} />
      ))}
    </Face3Container>
  );
};

const Face4 = () => {
  return (
    <div className="face_4_6_container">
      {[1, 2, 3, 4].map((item) => (
        <Dot key={item} />
      ))}
    </div>
  );
};

const Face5 = () => {
  return (
    <Face5Container>
      {[1, 2, 3, 4, 5].map((item) => (
        <Dot key={item} />
      ))}
    </Face5Container>
  );
};

const Face6 = () => {
  return (
    <div className="face_4_6_container">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Dot key={item} />
      ))}
    </div>
  );
};

const Dice = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [diceResult, setDiceResult] = useState(-1);
  const socket = useSocket();
  const { roomId } = useParams();

  useEffect(
    function () {
      socket?.on("rollADiceResult", (result) => {
        setIsRotating(false);
        setDiceResult(result);
      });
      return () => socket?.off("rollADiceResult");
    },
    [socket]
  );

  const rotate = () => {
    if (!isRotating) {
      setIsRotating(true);
      socket.emit("rollADice", roomId);
    }
  };

  return (
    <Container
      height="50px"
      width="50px"
      className={isRotating ? "rotationAnimation" : null}
      style={{ transformOrigin: `center center -25px` }}
      onClick={rotate}
    >
      <Face1 />
      <Face2 />
      <Face3 />
      <Face4 />
      <Face5 />
      <Face6 />
    </Container>
  );
};

const Face3Container = styled("div")((props) => ({
  position: "relative",
  "&>div": {
    position: "absolute",
    margin: props.theme.spacing(1),
    "&:nth-of-type(2)": {
      top: "50%",
      left: "50%",
      transform: "translate(calc(-50% - 8px),calc(-50% - 8px))",
    },
    "&:nth-of-type(3)": {
      bottom: 0,
      right: 0,
    },
  },
}));

const Face5Container = styled("div")((props) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2,1fr)",
  position: "relative",
  justifyItems: "center",
  alignItems: "center",
  "&>div:nth-of-type(5)": {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(calc(-50% - 4px),calc(-50% - 4px))",
  },
}));

const Container = styled("div")((props) => ({
  height: props.height,
  width: props.width,
  position: "relative",
  transformStyle: "preserve-3d",
  "&:hover": { cursor: "pointer" },
  "&>div": {
    height: "100%",
    width: "100%",
    border: "1px solid #ccc",
    backgroundColor: "white",
    position: "absolute",
    "&:nth-of-type(1)": { position: "relative" },
    "&:nth-of-type(2)": {
      bottom: "100%",
      transform: "rotateX(90deg)",
      transformOrigin: "bottom center",
    },
    "&:nth-of-type(3)": {
      top: 0,
      right: "100%",
      transform: "rotateY(-90deg)",
      transformOrigin: "center right",
    },
    "&:nth-of-type(4)": {
      top: 0,
      left: "100%",
      transform: "rotateY(90deg)",
      transformOrigin: "center left",
    },
    "&:nth-of-type(5)": {
      top: "100%",
      transform: "rotateX(-90deg)",
      transformOrigin: "top center",
    },
    "&:nth-of-type(6)": {
      top: 0,
      left: 0,
      transform: `translateZ(-${props.height})`,
    },
    "&.face_1_2_container": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    "&.face_4_6_container": {
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      justifyItems: "center",
      alignItems: "center",
    },
  },
}));

const Dot = styled("div")((props) => ({
  height: props.theme.spacing(1),
  width: props.theme.spacing(1),
  backgroundColor: "#000",
  borderRadius: "50%",
  margin: props.theme.spacing(0.5),
}));

export default Dice;
