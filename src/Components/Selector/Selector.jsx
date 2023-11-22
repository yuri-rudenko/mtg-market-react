import React, { useEffect, useState } from 'react';
import './Selector.css'
import Sets from './Selectors/Sets/Sets';
import Colors from './Selectors/Colors/Colors';
import Types from './Selectors/Types/Types.jsx';
import Value from './Selectors/Value/Value';
import { Button} from 'antd';
import findCards from '../../Functions/findCards';
import { useNavigate, useParams } from 'react-router-dom';
import Name from './Selectors/Name/Name';
import createLink from '../../Functions/createLink';

const Selector = (props) => {

    const navigate = useNavigate()

    const setCards = props.setCards
    const setLoading = props.setLoading

    const [url, addUrl] = useState('https://api.scryfall.com/cards/search?order=usd')
    const [link, setLink] = useState('')

    const [urlArr, setUrlArr] = useState({
        name:'',
        value:'',
        sets:'',
        colors:'',
        types:'',
        subtypes:''
    })

    const params = useParams()['*']

    useEffect(() => {

        console.log(999, params)
        findCards(params, setCards, setLoading)

    }, [url])

    useEffect(() => {

        console.log(urlArr)

    }, [urlArr])

    return (
        <div className='Selector'>
            <h2>Products Filter</h2>
            <Button style={{backgroundColor:"Brown"}} onClick={() => {createLink(url, addUrl, urlArr, navigate)}}>Search</Button>
            <Name setUrlArr={setUrlArr}/>
            <Value setUrlArr={setUrlArr} course={props.course}/>
            <Sets setUrlArr={setUrlArr}/>
            <Colors setUrlArr={setUrlArr} params={params}/>
            <Types setUrlArr={setUrlArr}/>
        </div>
    );
}

export default Selector;