import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const CoursePlayer = ({ url }) => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = (state) => {
    setPlayed(state.played);
  };

  const handleSeekChange = (e) => {
    const seekTo = parseFloat(e.target.value);
    playerRef.current.seekTo(seekTo);
    setPlayed(seekTo);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handleMute = () => {
    setMuted(!muted);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    return date.toISOString().substring(14, 19);
  };

  return (
    <div className="video-player">
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
        onDuration={handleDuration}
        className="react-player"
        width="100%"
        height="100%"
      />
      <div className="controls">
        <button onClick={handlePlayPause} className="control-btn">
          {playing ? <FaPause /> : <FaPlay />}
        </button>

        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={played}
          onChange={handleSeekChange}
          className="progress-bar"
        />

        <span className="time">
          {formatTime(played * duration)} / {formatTime(duration)}
        </span>

        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-bar"
        />

        <button onClick={handleMute} className="control-btn">
          {muted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </div>
    </div>
  );
};

export default CoursePlayer;
