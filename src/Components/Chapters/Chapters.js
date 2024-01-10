import React, {useState} from "react";
import "./style.css";

function Chapters({ list }) {
    
  const [folded, setFolded] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    const targ = document.getElementById(e.target.href.split("#")[1]);
    targ.scrollIntoView();
  };
  let disp = list.toReversed().map((el) => (
    <a onClick={handleClick} href={"#" + el.id} key={el.id}>
      {el.name}
    </a>
  ));
  return (
    <>
      <div className={"chapters "+folded}>{disp}</div>
      <button id="unfold-chap" className={""+folded} onClick={() => setFolded(!folded)}>
        {">"}
      </button>
    </>
  );
}

export default Chapters;
