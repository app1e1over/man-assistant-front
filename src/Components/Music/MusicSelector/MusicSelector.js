import React from "react";
import MusicItem from "../MusicItem/MusicItem";
import "./style.css";
function MusicSelector({ videos, setVideos, category, curId, setCurid }) {
  const disp = videos.map((v, i) => (
    <MusicItem
      key={v.id}
      name={v.name}
      selected = {i===curId}
      click = {()=>{setCurid(i)}}
      remove={() => setVideos(videos.filter((c) => c.id !== v.id))}
    />
  ));
  return (
    <div>
      <ul className="mus-sel">{disp}</ul>
      <button>Додати пісню</button>
    </div>
  );
}

export default MusicSelector;
