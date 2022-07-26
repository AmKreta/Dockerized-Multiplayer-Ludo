import React, { useMemo } from "react";
import { styled } from "@mui/material/styles";
import colouredSteps from "../util/colouredSteps";

const LudoSteps = ({ color, inverted }) => {
  const steps = useMemo(() => {
    let i, j;
    i = inverted ? 6 : 3;
    j = inverted ? 3 : 6;
    const steps = [];
    let colorStepIndex = 0;
    for (let x = 0; x < i; x++) {
      const temp = [];
      for (let y = 0; y < j; y++) {
        const isColoured = colouredSteps[color].has(colorStepIndex);
        colorStepIndex++;
        temp.push(
          <div
            className={`step ${isColoured ? "coloured" : null}`}
            key={`step-${color}-${x}-${y}`}
            data-key={`step-${x + y}-${x}-${y}`}
          />
        );
      }
      steps.push(temp);
    }
    return steps;
  }, []);
  return (
    <Container color={color} inverted={inverted}>
      {steps}
    </Container>
  );
};

const Container = styled("div")((props) => ({
  gridArea: `${props.color}_steps`,
  display: "grid",
  gridTemplateColumns: props.inverted ? "repeat(6,1fr)" : "repeat(3,1fr)",
  gridTemplateRows: props.inverted ? "repeat(3,1fr)" : "repeat(6,1fr)",
  "&>.step": {
    border: "var(--ludoBorder)",
    borderWidth: "1px",
    "&.coloured": {
      backgroundColor: props.color,
    },
  },
}));

export default LudoSteps;
