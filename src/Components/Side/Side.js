import React, { useState } from "react";
import Music from "../Music/Music";
import "./Side.css";

function Side({ setModal }) {
  const [folded, setFolded] = useState(false);
  return (
    <>


      <div className={"side-panel " + folded}>
        <Music setModal={setModal}></Music>
      </div>
      <button id="unfold" className={""+folded} onClick={() => setFolded(!folded)}>
        {">"}
      </button>
    </>
  );
}

export default Side;
