import React, { useEffect, useRef } from "react";
import "./style.css";
import { nanoid } from "nanoid";
import Paragraph from "../Paragraph/Paragraph"

function TextArea({setText, text, pushChapter, nextPage}) {

  const refInp = useRef();
  let disp = text.split("\n").map((par) => {
    return <Paragraph key={nanoid()} text={par} pushChapter={pushChapter}></Paragraph>
  });
  let toInp = "";
  let arr = text.split('⠀');
  for(let i=0; i<arr.length; i+=2){

    toInp+=arr[i].replace("&nbsp;", " ");
  }

  useEffect(()=>{
    if(refInp.current.scrollHeight > refInp.current.clientHeight){
      nextPage(refInp.current.scrollHeight-refInp.current.clientHeight);
    }
    if(text.includes("!focus!")){
      refInp.current.focus();
      
      setText(text.replace("!focus!", ""));
    }
  },[nextPage, setText, text])
 

  return (
    <div className="page holder" onScroll={(e)=>{
      console.log(e.target);
    }}>
      <textarea 
        className="page input"
        onInput={(e) => {
          setText(e.target.value);
        }}
        value={toInp}
        ref={refInp}
      ></textarea>
      <div
       className="page">{disp}</div>

    </div>
  );
}

export default TextArea;
