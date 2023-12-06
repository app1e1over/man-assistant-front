import React from "react";
import { useState } from "react";
import MusicSelector from "./MusicSelector/MusicSelector";
import MusicPlayer from "./MusicPlayer/MusicPlayer";
import { useEffect } from "react";

function Music(props) {
  const [videos, setVideos] = useState([
    { name: "Oleg", id: 1, category: "|cat1" },
    { name: "Stepan", id: 2, category: "|cat1|cat2" },
  ]);
  const [current, setCurrent] = useState(0);
  const [category, setCategory] = useState("");

  const filtered = videos.filter(
    (v) => category === "" || v.category.includes("|" + category)
  );
  const posVals = []
  videos.forEach(v=>{
        const cats = v.category.split("|");
        cats.forEach(cat => {
            if(!posVals.includes(cat)){
                posVals.push(cat);
            }
        });

  })
  return (

    <div className="musics">
        <select value={category} onChange={(e)=>{setCurrent(0);setCategory(e.target.value);}}>
            {posVals.map(v=>(<option key={v}>{v}</option>))}
        </select>
      <MusicSelector
        videos={filtered}
        setVideos={setVideos}
        category={""}
        curId={current}
        setCurid={setCurrent}
      />
      <MusicPlayer
        videos={filtered}
        current={current}
        setCurrent={setCurrent}
      />
    </div>
  );
}

export default Music;
