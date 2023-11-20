import React, { useEffect, useState } from 'react';
import './Selector.css'
import Sets from './Selectors/Sets/Sets';
import Colors from './Selectors/Colors/Colors';

const Selector = () => {

    const [sets, setSets] = useState([])

    return (
        <div className='Selector'>
            <h1>Selector</h1>
            <Sets setSets={setSets} sets={sets}/>
            <Colors/>
        </div>
    );
}

export default Selector;


