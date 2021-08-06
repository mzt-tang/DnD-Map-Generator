import { StatusBar } from 'expo-status-bar';
import { BrowserRouter, Route } from "react-router-dom";
import React from 'react';
import Home from "./pages/Home";
import RouteFindingMap from "./pages/RouteFindingMap";
import Room from "./pages/Room";
import PlayerView from "./pages/PlayerView"
import DmView from "./pages/DmView";

export default function App() {
  return (
      <BrowserRouter>
        <Route path = "/home" component = {Home} />
          <Route path = "/" exact={true} component = {Home} />
          <Route path = "/player" component={PlayerView}/>
          <Route path = "/dm" component={DmView}/>
      </BrowserRouter>
  );
}
