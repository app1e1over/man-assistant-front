import React from 'react';
import "./style.css"

function MusicItem({name, remove, selected, click}) {
    return (
        <li className={selected?"mus-item sel":"mus-item"} onClick={click}>
            {name}
            <button onClick={remove}>🗑️</button>
        </li>
    );
}

export default MusicItem;