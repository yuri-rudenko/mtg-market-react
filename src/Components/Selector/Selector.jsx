import React, { useEffect, useState } from 'react';
import './Selector.css'
import Sets from './Selectors/Sets/Sets';
import Colors from './Selectors/Colors/Colors';
import Types from './Selectors/Types/Types.jsx';
import Value from './Selectors/Value/Value';
import { Button, Input } from 'antd';
import findCards from '../../Functions/findCards';

const Selector = (props) => {

    const setCards = props.setCards
    const setLoading = props.setLoading

    const [url, addUrl] = useState('https://api.scryfall.com/cards/search?order=usd')

    const [urlArr, setUrlArr] = useState({
        name:'',
        value:'',
        sets:'',
        colors:'',
        types:'',
        subtypes:''
    })

    useEffect(() => {
        console.log(urlArr)
    }, [urlArr])

    return (
        <div className='Selector'>
            <h2>Products Filter</h2>
            <Button style={{backgroundColor:"Brown"}} onClick={() => findCards(url, urlArr, setCards, setLoading)}>Search</Button>
            <Input setUrlSets={setUrlArr}/>
            <Value setUrlSets={setUrlArr}/>
            <Sets setUrlSets={setUrlArr}/>
            <Colors setUrlSets={setUrlArr}/>
            <Types setUrlSets={setUrlArr}/>
        </div>
    );
}

export default Selector;


