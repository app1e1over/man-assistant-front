import React from 'react';
import "./style.css"


function Sentence({text, color}) {

    let displayed = "";

    if(text.includes('⠀')){
        displayed = text.split(' ').map(element=>{
            if(element.includes('⠀'))
                return (<span className='notable error' note={element.split('⠀')[1].replace(',', '\n')}>{element.split('⠀')[0]} </span>)
            else if(element!=='')
                return (<span>element</span>)
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