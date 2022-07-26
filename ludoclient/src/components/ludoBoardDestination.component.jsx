import React from "react";
import { styled } from "@mui/material/styles";

const LudoBoardDestination = () => {
  return (
    <Container>
      <div className="triangleContainer">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Container>
  );
};

const Container = styled("div")((props) => ({
  gridArea: "destination",
  overflow: "hidden",
  "&>.triangleContainer": {
    height: "200%",
    width: "200%",
    display: "flex",
    flexWrap: "wrap",
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%) rotate(-45deg)",
    "&>div": {
      height: "50%",
      width: "50%",
    },
    "&>div:nth-child(1)": { backgroundColor: "red" },
    "&>div:nth-child(2)": { backgroundColor: "green" },
    "&>div:nth-child(4)": { backgroundColor: "yellow" },
    "&>div:nth-child(3)": { backgroundColor: "blue" },
  },
}));

export default LudoBoardDestination;
