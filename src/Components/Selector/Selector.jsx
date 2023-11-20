import React, { useEffect, useState } from 'react';
import './Selector.css'
import Sets from './Selectors/Sets/Sets';
import Colors from './Selectors/Colors/Colors';
import Types from './Selectors/Types/Types.jsx';
import Value from './Selectors/Value/Value';

const Selector = () => {

    const [sets, setSets] = useState([])

    return (
        <div className='Selector'>
            <h2>Products Filter</h2>
            <Value/>
            <Sets setSets={setSets} sets={sets}/>
            <Colors/>
            <Types/>
        </div>
    );
}

export default Selector;


