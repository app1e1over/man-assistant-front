import React from 'react';
import './style.css'

function Chapters({list}) {

    let disp = list.toReversed().map(el=>(<a href={"#"+el.id} key={el.id}>{el.name}</a>))
    console.log(list);
    return (
        <div className='chapters'>
            {disp}
        </div>
    );
}

export default Chapters;