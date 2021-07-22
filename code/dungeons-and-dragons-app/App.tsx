import { StatusBar } from 'expo-status-bar';
import { BrowserRouter, Route } from "react-router-dom";
import React from 'react';
import Home from "./pages/Home";
import RouteFindingMap from "./pages/RouteFindingMap";
import Room from "./pages/Room";

export default function App() {
  return (
      <BrowserRouter>
        <Route path = "/home" component = {Home} />
          <Route path = "/" component = {Home} />
          <Route path = "/route" component = {RouteFindingMap} />
          <Route path = "/room" component = {Room} />
      </BrowserRouter>
  );
}
