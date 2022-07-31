import React, { useLayoutEffect } from "react";
import { styled } from "@mui/material/styles";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { mapHomeCoordinates } from "../store/game.reducer";
import getMidPoint from "../util/getMidPoint";

const LudoBoardHome = ({ color }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    const timeout = setTimeout(function () {
      const home = ref.current.children[0].children;
      const midPointsOfCircles = [];
      for (let i = 0; i < home.length; i++)
        midPointsOfCircles.push(getMidPoint(home[i].getBoundingClientRect()));
      dispatch(mapHomeCoordinates({ color, positions: midPointsOfCircles }));
      clearTimeout(timeout);
    }, 10);
  }, []);
  return (
    <Container color={color} data-color={color} ref={ref}>
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
  backgroundColor: `var(--${props.color})`,
  padding: "16.66%",
  border: "var(--ludoBorder)",
  "&>.pawnContainerHome": {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    border: "var(--ludoBorder)",
    borderWidth: "calc(var(--ludoBorderWidth) * 2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    alignContent: "space-evenly",
    flexWrap: "wrap",
    "&>.pawnContainer": {
      height: "33.5%",
      width: "33.5%",
      backgroundColor: `var(--${props.color})`,
      borderRadius: "50%",
      border: "var(--ludoBorder)",
      borderWidth: "calc(var(--ludoBorderWidth) * 2)",
    },
  },
}));

export default LudoBoardHome;
