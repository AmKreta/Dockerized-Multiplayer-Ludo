import React from "react";
import { Routes, Route } from "react-router-dom";
import Game from "../pages/game.component";
import Home from "../pages/home.component";
import Auth from "../pages/auth.component";
import WaitingRoom from "../pages/waitingRoom.component";

export const ROUTES_OBJ = {
  HOME: {
    path: "/",
    element: <Home />,
  },
  WAITING_ROOM: {
    path: "/waitingForPlayers/:roomId",
    element: <WaitingRoom />,
    getPath: (roomId) => `/waitingForPlayers/${roomId}`,
  },
  GAME: {
    path: "/game/:roomId",
    element: <Game />,
    getPath: (roomId) => `/game/${roomId}`,
  },
  AUTH: {
    path: "/auth",
    element: <Auth />,
  },
};

const Router = () => {
  return (
    <Routes>
      {Object.keys(ROUTES_OBJ).map((item) => (
        <Route
          key={item}
          path={ROUTES_OBJ[item].path}
          element={ROUTES_OBJ[item].element}
        />
      ))}
    </Routes>
  );
};

export default Router;
