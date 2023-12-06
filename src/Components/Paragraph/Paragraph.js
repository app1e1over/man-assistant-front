import React from 'react';
import Sentence from '../Sentence/Sentence';
import { nanoid } from 'nanoid';
import "./style.css"



String.prototype.hashCode = function() {
    var hash = 0,
      i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

function Paragraph({text, pushChapter}) {
    let id = "";

    if(text.toLowerCase().includes("розділ")){        
        let name = text.toLowerCase().split("розділ")[1].trim();
        id=name.split(" ")[0].hashCode()
        pushChapter({id, name})

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
        <p className='par'>
                {disp}
        </p>
    );
}

export default Paragraph;