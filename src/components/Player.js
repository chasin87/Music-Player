import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
  faVolumeOff,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setCurrentSong,
  setSongs,
  activeLibraryHandler,
}) => {
  //Event Handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const dragHandlerVolume = (e) => {
    audioRef.current.volume = e.target.value;
    setSongInfo({ ...songInfo, volume: e.target.value });
  };

  const volumeHandler = (number) => {
    audioRef.current.volume = number;
    setSongInfo({ ...songInfo, volume: number });
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }

    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();
        return;
      }

      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };

  //add the styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  const trackAnimVolume = {
    transform: `translateX(${songInfo.volume * 100}%)`,
  };

  const trackColors = {
    background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div style={trackColors} className="track">
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>

        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <div className="volumeContr">
        <FontAwesomeIcon
          onClick={() => volumeHandler(0)}
          size="1x"
          icon={faVolumeOff}
        />
        <div className="track_volume">
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={songInfo.volume}
            onChange={dragHandlerVolume}
          />

          <div style={trackAnimVolume} className="animate-track_volume"></div>
        </div>
        <FontAwesomeIcon
          onClick={() => volumeHandler(1)}
          size="1x"
          icon={faVolumeUp}
        />
      </div>
    </div>
  );
};

export default Player;
