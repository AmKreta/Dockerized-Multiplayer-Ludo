import React from "react";
import { styled } from "@mui/material/styles";

const LudoBoardHome = ({ color }) => {
  return (
    <Container color={color} data-color={color}>
      <div className="pawnContainerHome">
        <div className="pawnContainer"></div>
        <div className="pawnContainer"></div>
        <div className="pawnContainer"></div>
        <div className="pawnContainer"></div>
      </div>
    </Container>
  );
};

const Container = styled("div")((props) => ({
  gridArea: `${props.color}_home`,
  backgroundColor: props.color,
  padding: "16.66%",
  border: "var(--ludoBorder)",
  "&>.pawnContainerHome": {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    border: "var(--ludoBorder)",
    borderWidth: "2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    alignContent: "space-evenly",
    flexWrap: "wrap",
    "&>.pawnContainer": {
      height: "35%",
      width: "35%",
      backgroundColor: props.color,
      borderRadius: "50%",
      border: "var(--ludoBorder)",
      borderWidth: "2px",
    },
  },
}));

export default LudoBoardHome;
