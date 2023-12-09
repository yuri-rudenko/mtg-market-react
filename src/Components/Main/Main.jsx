import { Carousel, Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Cards/Card/Card';
import './Main.css';
import { shuffleArray } from '../../Functions/shuffleArray';
import AutoCarousel from './AutoCarousel';
import { checkBadSets } from '../../Functions/checkBadSets';

const Main = (props) => {

    const { course } = props

    const [recommendedCards, setRecommendedCards] = useState([])
    const [recommendedBudget, setRecommendedBudget] = useState([])
    const [recommendedCommanders, setRecommendedCommanders] = useState([])
    const [recommendedLands, setRecommendedLands] = useState([])

    const [sets, setSets] = useState([])
    const [width, setWidth] = useState(window.innerWidth)
    const [show, setShow] = useState(4)

    useEffect(() => {
        console.log(sets)
    }, [sets])

    useEffect(() => {

        const random = Math.floor(Math.random() * 20) + 2

        const random4 = Math.floor(Math.random() * 5) +1

        axios.get(`https://api.scryfall.com/cards/search?page=${random}&order=edhrec&dir=asc&q=-is%3Afunny+-is:digital+-t:land`) // Cards

            .then(response => setRecommendedCards(shuffleArray(response.data.data)))
            .catch(() => setRecommendedCards([]))

        axios.get(`https://api.scryfall.com/cards/search?page=${random}&order=edhrec&dir=asc&q=-is%3Afunny+-is:digital+-t:land+usd<=1`) //Budget

            .then(response => setRecommendedBudget(shuffleArray(response.data.data)))
            .catch(() => setRecommendedBudget([]))

        axios.get(`https://api.scryfall.com/cards/search?page=${random4}&order=edhrec&dir=asc&q=-is%3Afunny+-is:digital+t:land`) //Lands

            .then(response => setRecommendedLands(shuffleArray(response.data.data)))
            .catch(() => setRecommendedLands([]))
        
        axios.get(`https://api.scryfall.com/cards/search?page=${random4}&order=edhrec&dir=asc&q=-is%3Afunny+-is:digital+t:creature+t:legendary`) //Commanders

            .then(response => setRecommendedCommanders(shuffleArray(response.data.data)))
            .catch(() => setRecommendedCommanders([]))

        axios.get('https://api.scryfall.com/sets')
            .then(response => {
                const newSets = response.data.data.filter(set => checkBadSets(set)).map(set => ({
                    name: set.name,
                    card_count: set.card_count,
                    image: set.icon_svg_uri,
                    id: set.id,
                    code: set.code,
                }));

                width >= 880 ? setSets(newSets.slice(0, 32)) : setSets(newSets.slice(0, 16))
            })
    },  [])

    const handleResize = () => {
        setWidth(window.innerWidth)
    }

    useEffect(() => {

        setWidth(window.innerWidth)
    
        window.addEventListener('resize', handleResize)
    
        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [])
    
    useEffect(() => {
        if(width >= 1700) {
            setShow(7)
        }
        else if (width >= 1450) {
          setShow(6)
        } 
        else if (width >= 1210) {
          setShow(5)
        } 
        else if (width >= 980) {
          setShow(4)
        }
        else if (width >= 734) {
            setShow(3)
          } 
        else {
          setShow(4)
        }
        console.log(width)
    }, [width])

    return (
        <div className='Main'>

            <div className="latest-sets">
                <p className="latest-sets header">Latest Sets</p>
                <div className="latest-sets-container">
                    {sets.length > 0 && 
                        sets.map(set => {
                            return (
                                <div key={set.name} className="set-container">
                                    <img src={set.image} alt={set.name}></img>
                                    <p>{set.name}</p>
                                </div>
                            )

                        })
                    }
                </div>
            </div>

            <p className='recommended-cards header'>Recommended cards</p>
            <Divider style={{background:'darkgrey'}}/>
            <AutoCarousel course={course} show={show} cards={recommendedCards}/>

            <p className='recommended-cards header'>Recommended budget cards</p>
            <Divider style={{background:'darkgrey'}}/>
            <AutoCarousel course={course} show={show} cards={recommendedBudget}/>

            <p className='recommended-cards header'>Recommended lands</p>
            <Divider style={{background:'darkgrey'}}/>
            <AutoCarousel course={course} show={show} cards={recommendedLands}/>

            <p className='recommended-cards header'>Recommended commanders</p>
            <Divider style={{background:'darkgrey'}}/>
            <AutoCarousel course={course} show={show} cards={recommendedCommanders}/>
        </div>
    )
}

export default Main;
