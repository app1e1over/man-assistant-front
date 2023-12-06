import React from 'react';
import './style.css'

function Chapters({list}) {
    const handleClick = (e)=>{
        e.preventDefault();
        const targ = document.getElementById(e.target.href.split("#")[1])
        targ.scrollIntoView()
    }
    let disp = list.toReversed().map(el=>(<a onClick={handleClick} href={"#"+el.id} key={el.id}>{el.name}</a>))
    return (
        <div className='chapters'>
            {disp}
        </div>
    );
}

export default Chapters;