import React, { useEffect, useState } from 'react';
import './Selector.css'
import Sets from './Selectors/Sets/Sets';
import Colors from './Selectors/Colors/Colors';
import Types from './Selectors/Types/Types.jsx';
import Value from './Selectors/Value/Value';
import { Button } from 'antd';
import findCards from '../../Functions/findCards';
import { useNavigate, useParams } from 'react-router-dom';
import Name from './Selectors/Name/Name';
import createLink from '../../Functions/createLink';
import Formats from './Selectors/Formats/Formats.jsx';
import Manacost from './Selectors/Manacost/Manacost';
import Rarity from './Selectors/Rarity/Rarity';
import Unique from './Selectors/Unique/Unique';

const Selector = (props) => {

    const navigate = useNavigate()

    const setCards = props.setCards
    const setLoading = props.setLoading
    const setSelectedPage = props.setSelectedPage

    const [url, addUrl] = useState('https://api.scryfall.com/cards/search?order=usd')

    const [urlArr, setUrlArr] = [props.urlArr, props.setUrlArr] 

    const params = useParams()['*']

    useEffect(() => {

        console.log(999, params)
        findCards(params, setCards, setLoading, setSelectedPage)

    }, [url, params, setCards, setLoading, setSelectedPage])

    useEffect(() => {

        console.log(urlArr)

    }, [urlArr])

    useEffect(() => {

        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                createLink(url, addUrl, urlArr, navigate)
            }
        }
    
        document.addEventListener('keyup', handleKeyPress)
    
        return () => {
            document.removeEventListener('keyup', handleKeyPress)
        }
    }, [url, addUrl, urlArr, navigate])

    const handleClear = () => {
        navigate('/shop')
    }
    

    return (
        <div className='Selector'>
            <h2>Products Filter</h2>
            <div className="selectors">
                <Unique setUrlArr={setUrlArr} params={params} />
                <div className="small-buttons">
                    <Button size='large' style={{backgroundColor:"Green", color:"white", border:"2px solid black"}} onClick={() => {createLink(url, addUrl, urlArr, navigate)}}>Search</Button>
                    <Button size='large' style={{backgroundColor:"Darkred", color:"white", border:"2px solid black"}} onClick={() => {handleClear()}}>Clear</Button>
                </div>
                <Name setUrlArr={setUrlArr} params={params}/>
                <Value setUrlArr={setUrlArr} course={props.course} params={params}/>
                <Sets setUrlArr={setUrlArr} params={params}/>
                <Rarity setUrlArr={setUrlArr} params={params}/>
                <Colors setUrlArr={setUrlArr} params={params}/>
                <Types setUrlArr={setUrlArr} params={params}/>
                <Formats setUrlArr={setUrlArr} params={params}/>
                <Manacost setUrlArr={setUrlArr} params={params}/>
            </div>
        </div>
    );
}

export default Selector;