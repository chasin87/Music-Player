import React, { useState, useRef } from "react";
//Import styles
import "./styles/app.scss";
//Adding Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";

//import Utility
import data from "./data";

//import Components for theme change
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Themes";

function App() {
  const audioRef = useRef(null);

  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
    volume: 1,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  const [theme, setTheme] = useState("light");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //calculate percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
  };

  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <div className={`App ${libraryStatus ? "library-active" : ""}`}>
          <Nav
            libraryStatus={libraryStatus}
            setLibraryStatus={setLibraryStatus}
            themeToggler={themeToggler}
            theme={theme}
          />

          <Song currentSong={currentSong} isPlaying={isPlaying} />
          <Player
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            currentSong={currentSong}
            audioRef={audioRef}
            songInfo={songInfo}
            setSongInfo={setSongInfo}
            songs={songs}
            setCurrentSong={setCurrentSong}
            setSongs={setSongs}
            activeLibraryHandler={activeLibraryHandler}
          />
          <Library
            audioRef={audioRef}
            songs={songs}
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
            setSongs={setSongs}
            setIsPlaying={setIsPlaying}
            libraryStatus={libraryStatus}
          />
          <audio
            onTimeUpdate={timeUpdateHandler}
            onLoadedMetadata={timeUpdateHandler}
            ref={audioRef}
            src={currentSong.audio}
            onEnded={songEndHandler}
            volume={songInfo.volume}
          ></audio>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
