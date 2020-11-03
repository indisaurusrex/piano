import React, { useEffect } from "react";
import "./App.css";
import AudioPlayer from "./AudioPlayer";

function App() {
  const audioPlayer = AudioPlayer();

  useEffect(() => {
    audioPlayer.setInstrument("acoustic_grand_piano");
  }, []);

  const handleClick = () => {
    audioPlayer.playNote("C4");
  };

  return (
    <div className="app-container">
      <button onClick={handleClick}>Play</button>
    </div>
  );
}

export default App;
