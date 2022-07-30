import React, { useMemo } from "react";
import { styled } from "@mui/material/styles";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useSelector } from "react-redux";

const LudoSteps = ({ color, inverted, stepStartIndex }) => {
  const { colouredSteps, starredSteps } = useSelector((state) => ({
    colouredSteps: state.game?.colouredSteps?.[color],
    starredSteps: state?.game?.starredSteps,
  }));

  const steps = useMemo(() => {
    let i, j;
    i = inverted ? 6 : 3;
    j = inverted ? 3 : 6;
    const steps = [];
    let stepIndex = stepStartIndex;
    for (let x = 0; x < i; x++) {
      const temp = [];
      for (let y = 0; y < j; y++) {
        const isColoured = colouredSteps.has(stepIndex);
        const isSafeZone = starredSteps[color];
        temp.push(
          <div
            className={`step ${isColoured ? "coloured" : null}`}
            key={`step-${color}-${x}-${y}`}
            data-key={`step-${x + y}-${x}-${y}`}
          >
            {stepIndex === isSafeZone ? (
              <Protected>
                <StarOutlineIcon />
              </Protected>
            ) : null}
          </div>
        );
        stepIndex++;
      }
      steps.push(temp);
    }
    return steps;
  }, [colouredSteps, starredSteps]);

  return (
    <Container color={color} inverted={inverted}>
      {steps}
    </Container>
  );
};

const Protected = styled("div")((props) => ({
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&>.MuiSvgIcon-root": {
    height: "80%",
    width: "80%",
    opacity: 0.5,
  },
}));

const Container = styled("div")((props) => ({
  gridArea: `${props.color}_steps`,
  display: "grid",
  gridTemplateColumns: props.inverted ? "repeat(6,1fr)" : "repeat(3,1fr)",
  gridTemplateRows: props.inverted ? "repeat(3,1fr)" : "repeat(6,1fr)",
  "&>.step": {
    border: "var(--ludoBorder)",
    "&.coloured": {
      backgroundColor: `var(--${props.color})`,
    },
  },
}));

export default LudoSteps;
