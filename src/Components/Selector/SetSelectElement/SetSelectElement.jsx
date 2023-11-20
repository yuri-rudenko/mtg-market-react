import React from 'react';
import './SetSelectElement.css'

const SetSelectElement = (props) => {
    return (
        <div className='SetSelectElement'>
            <img src={props.set.image}></img>
            <p>{props.set.name}</p>
        </div>
    );
}

export default SetSelectElement;
