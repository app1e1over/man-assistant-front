// Import necessary libraries
import React, { useState } from 'react';
import YouTube from 'react-youtube';

// DraggableVideo component
const MusicPlayer = ({ videos, current, setCurrent }) => {
  // Options for the YouTube component
  const [player, setPlayer] = useState(null);
    const [paused, setPaused] = useState(true);
  const onReady = (event) => {
    setPlayer(event.target);
  };
  const handlePause = ()=>{
    if(paused){
        player.playVideo();
    }else{
        player.pauseVideo();
    }
    setPaused(!paused)
  }
  const opts = {
    height: '30',
    width: '30',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
if(videos.length!==0)
  return (
    <div style={{position: "absolute", width:"10vw", top:"75%", left:"10%"}}>
        <h2>{videos[current].name}</h2>
        <button onClick={()=>(current<=0)? setCurrent(videos.length-1) : setCurrent(current-1)}>{"<"}</button>
        <button onClick={handlePause}>{paused ? "▷" : "||"}</button>
        <button onClick={()=>(current>=videos.length-1)? setCurrent(0) : setCurrent(current+1)}>{">"}</button>
        <YouTube videoId={videos[current].id} opts={opts} onReady={onReady} style={{display:"none"}}/>
    </div>
  );
  return <></>
};

export default MusicPlayer;