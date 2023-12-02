import React, { useState } from "react";
import "./style.css";

export default function Word({defText, id}){
    const [text, setText] = useState(defText);
    const [editing, setEditing] = useState(false);
    if(editing)
    return (<input className="word" value={text} onInput={(e)=>{setText(e.target.value)}}></input>)
    else
    return (<span className="word" onClick={()=>{setEditing(true);}}>{text}</span>)
}
