import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { authBg } from "../services/services";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {};

  const signup = () => {};

  return (
    <Container>
      <Form
        sx={{
          direction: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        spacing={4}
      >
        <Typography variant="h3">Ludo</Typography>
        <TextField
          label="Enter username"
          placeholder="username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Enter password"
          placeholder="password"
          fullWidth
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <ButtonContainer variant="contained">
          <Button onClick={login}>Login</Button>
          <Button onCLick={signup}>Signup</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

const Container = styled("div")((props) => ({
  height: "100%",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  "&::before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,.3)",
    backgroundImage: `url("${authBg}")`,
    backgroundPosition: "center -50px",
    backgroundBlendMode: "color",
    opacity: 0.3,
  },
}));

const Form = styled(Stack)((props) => ({
  width: "min(90%,400px)",
  margin: "auto",
  backgroundColor: "rgba(255,255,255,.93)",
  padding: props.theme.spacing(2),
  zIndex: 2,
  borderRadius: props.theme.spacing(1),
  boxShadow: "0 0 5px #555",
  border: "1px solid #333",
}));

const ButtonContainer = styled(ButtonGroup)((props) => ({
  width: "100%",
  "&>button": {
    width: "50%",
    "&:last-child": {
      backgroundColor: "#333",
    },
  },
}));

export default Auth;
