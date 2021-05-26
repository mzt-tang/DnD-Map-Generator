import { StatusBar } from 'expo-status-bar';
import { BrowserRouter, Route } from "react-router-dom";
import React from 'react';
import Home from "./pages/Home";
import Map from "./pages/Map";

export default function App() {
  return (
      <BrowserRouter>
        <Route path = "/home" component = {Home} />
          <Route path = "/" component = {Home} />
          <Route path = "/map" component = {Map}/>
      </BrowserRouter>
  );
}
// hello
// hello
// hello
