import React from 'react';

function Fixes({text, setText, start, end, fixs}) {
    if(fixs.length===0)
        return <></>
    let cur = text.substring(start, end);
    let capital = cur.toLowerCase()[0]!==cur[0];
    if(capital){
        fixs = fixs.map(f=>f.toUpperCase()[0]+f.substring(1));
    }
    if(cur.split("⠀")[0].match(".*[,.(!?]")){
        console.log(cur.split("⠀")[0]);
        fixs = fixs.map(f=>f+cur[cur.split("⠀")[0].length-1]);
    }
    return (
        <div style={{position: "absolute", pointerEvents:"all", top:"-20px", left:"-100px"}}>
            <select onChange={(e)=>{
                setText(text.substring(0, start)+e.target.value+" "+text.substring(end))     
            }}>
                <option value={text.substring(start, end)}>-</option>
                {fixs.map(v=>(<option>{v}</option>))}
            </select>
        </div>
    );
}

export default Fixes;