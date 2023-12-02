import React from 'react';
import Sentence from '../Sentence/Sentence';
import { nanoid } from 'nanoid';
import "./style.css"

function Paragraph({text, pushChapter}) {
    let id = "";

    if(text.toLowerCase().includes("розділ")){        
        id = text.toLowerCase().split("розділ")[1];
        pushChapter({id, name:id.trim()})

    }

    let disp = text.replace('.', '.\0').replace('!', '!\0').replace('?', '?\0').split('\0').map((s, i, arr)=>(<Sentence key={nanoid()} text={s} ></Sentence>))
    if(id!==""){
        return (
            <p id = {id} className='par'>
                {disp}
            </p>
        ); 
    }
    return (
        <p onClick={(e)=>{
            console.log(e.target.height/17)
        }} className='par'>
            {disp}
        </p>
    );
}

export default Paragraph;