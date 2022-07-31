import React from "react";
import { styled } from "@mui/material/styles";
import LudoBoardHome from "../components/ludoBoardHome.component";
import LudoBoardDestination from "../components/ludoBoardDestination.component";
import LudoSteps from "../components/ludoSteps.component";

const LudoBoard = function () {
  return (
    <LudoBoardContainer>
      {["red", "green", "yellow", "blue"].map((item) => (
        <LudoBoardHome color={item} key={item} />
      ))}
      <LudoBoardDestination />
      {["red", "green", "yellow", "blue"].map((item, index) => (
        <LudoSteps
          color={item}
          key={item}
          inverted={["yellow", "red"].includes(item)}
          stepStartIndex={18 * index}
        />
      ))}
    </LudoBoardContainer>
  );
};

const LudoBoardContainer = styled("section")(({ theme }) => ({
  //border: "var(--ludoBorder)",
  height: "90vh",
  aspectRatio: "1 / 1",
  boxShadow: "0 0 5px #888",
  display: "grid",
  gridTemplateRows: "2fr 1fr 2fr",
  gridTemplateColumns: "2fr 1fr 2fr",
  gridTemplateAreas: `
    "red_home green_steps green_home"
    "red_steps destination yellow_steps"
    "blue_home blue_steps yellow_home "
    `,
  minHeight: 0,
  minWidth: 0,
  "&>div": {
    overflow: "hidden",
    minWidth: 0,
  },
}));

export default React.memo(LudoBoard);
