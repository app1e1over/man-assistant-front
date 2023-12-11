import React, { useEffect } from "react";
import { useState } from "react";
import MusicSelector from "./MusicSelector/MusicSelector";
import MusicPlayer from "./MusicPlayer/MusicPlayer";

function Music({ setModal }) {
  const [videos, setVideos] = useState(undefined);
  const [current, setCurrent] = useState(0);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("songs"));
    setVideos(data || []);
  }, []);
  useEffect(() => {
    if (videos !== undefined) {
      const json = JSON.stringify(videos);
      localStorage.setItem("songs", json);
    }
  }, [videos]);
  const filtered = videos
    ? videos.filter(
        (v) => category === "" || v.category.includes("|" + category)
      )
    : [];
  const posVals = [];
  if (videos !== undefined)
    videos.forEach((v) => {
      const cats = v.category.split("|");
      cats.forEach((cat) => {
        if (!posVals.includes(cat)) {
          posVals.push(cat);
        }
      });
    });
  return (
    <div className="musics">
      <select
        value={category}
        onChange={(e) => {
          setCurrent(0);
          setCategory(e.target.value);
        }}
      >
        {posVals.map((v) => (
          <option key={v}>{v}</option>
        ))}
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
      <button
        onClick={() =>
          setModal({
            type: "music-add",
            onFinish: (e) =>{ setVideos([...videos, e]); setModal({type:"inactive"})},
            data: [posVals],
          })
        }
      >
        Додати пісню
      </button>
    </div>
  );
}

export default Music;
