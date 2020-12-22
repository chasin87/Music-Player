import React, { useState } from "react";
//Import styles
import "./styles/app.scss";
//Adding Components
import Player from "./components/Player";
import Song from "./components/Song";

//import Utility
import data from ".util";

function App() {
  //State
  const [songs, setSongs] = useState(data());
  return (
    <div className="App">
      <Song />
      <Player />
    </div>
  );
}

export default App;
