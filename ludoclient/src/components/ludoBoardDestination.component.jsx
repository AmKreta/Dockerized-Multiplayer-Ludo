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
    "&>div:nth-child(1)": { backgroundColor: "var(--red)" },
    "&>div:nth-child(2)": { backgroundColor: "var(--green)" },
    "&>div:nth-child(4)": { backgroundColor: "var(--yellow)" },
    "&>div:nth-child(3)": { backgroundColor: "var(--blue)" },
  },
}));

export default LudoBoardDestination;
