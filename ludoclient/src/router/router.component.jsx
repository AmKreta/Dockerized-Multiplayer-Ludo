import React from "react";
import { Routes, Route } from "react-router-dom";
import Game from "../pages/game.component";
import Home from "../pages/home.component";
import Auth from "../pages/auth.component";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game/:roomId" element={<Game />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};

export default Router;
