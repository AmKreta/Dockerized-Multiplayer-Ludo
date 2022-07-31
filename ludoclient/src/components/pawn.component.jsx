import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useSelector } from "react-redux";

const Pawn = ({ color, id, stepIndex }) => {
  const stepsPositionMap = useSelector(
    (state) => state.game.positionMap.steps[stepIndex]
  );
  const homePositionCoordinates = useSelector(
    (state) => state.game.positionMap.home?.[id]
  ) || { x: 0, y: 0 };

  return (
    <PawnContainer
      position={stepIndex === -1 ? homePositionCoordinates : stepsPositionMap}
      color={color}
      layout
    >
      <LocationOnIcon id={id} className="icon" />
    </PawnContainer>
  );
};

const PawnContainer = styled(motion.div)((props) => ({
  position: "absolute",
  color: props.color,
  top: props.position?.y,
  left: props.position?.x,
  "&>.icon": {
    height: "40px",
    width: "40px",
    color: props.color,
    transform: "translate(-50%,-50%)",
    filter: `drop-shadow(0px 0 3px ${
      props.color === "yellow" ? "#000" : "#fff"
    });`,
  },
}));

export default Pawn;
