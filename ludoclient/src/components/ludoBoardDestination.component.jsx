import React from "react";
import { styled } from "@mui/material/styles";
import Dice from "./dice.component";

const LudoBoardDestination = () => {
  return (
    <Container>
      <div className="triangleContainer">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div className="diceContainer">
          <Dice />
        </div>
      </div>
    </Container>
  );
};

const Container = styled("div")((props) => ({
  gridArea: "destination",
  overflow: "hidden",
  border: "var(--ludoBorder)",
  "&>.triangleContainer": {
    height: "150%",
    width: "150%",
    display: "flex",
    flexWrap: "wrap",
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%) rotate(-45deg)",
    "&>div": {
      height: "50%",
      width: "50%",
      border: "var(--ludoBorder)",
    },
    "&>div:nth-of-type(1)": { backgroundColor: "var(--red)" },
    "&>div:nth-of-type(2)": { backgroundColor: "var(--green)" },
    "&>div:nth-of-type(4)": { backgroundColor: "var(--yellow)" },
    "&>div:nth-of-type(3)": { backgroundColor: "var(--blue)" },
    "&>.diceContainer": {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-25%,-25%)",
      border: "none",
    },
  },
}));

export default LudoBoardDestination;
