import React from 'react';
import "./style.css"


function Sentence({text, color, setFixes}) {

    let displayed = "";
    const dispFix = (e)=>{
        let ed = Number(e.target.getAttribute("ed"))
        let st = Number(e.target.getAttribute("st"))
        setFixes(e.target.getAttribute("note"),st, ed  );
    }

    if(text.includes('⠀')){
        let end = 0;
        displayed = text.split(' ').map(element=>{
            element+=" ";
            end+=element.length;
            if(element.includes('⠀')){
                return (<span ed ={end} st = {end-element.length} onMouseEnter={dispFix} className='notable error' note={element.split('⠀')[1]}>{element.split('⠀')[0]} </span>)
            }
            else if(element!=='')
                return (<span>{element}</span>)
            return (<></>);
        })
    }else{
        displayed= text;
    }
    return (
        <span style={{color:color}} className='notable'>
            {displayed}
        </span>
    );
}

export default Sentence;