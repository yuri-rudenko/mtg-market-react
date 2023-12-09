import { Carousel, Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Cards/Card/Card';
import './Main.css';
import { shuffleArray } from '../../Functions/shuffleArray';
import AutoCarousel from './AutoCarousel';

const Main = (props) => {

    const { course } = props

    const [recommendedCards, setRecommendedCards] = useState([])
    const [width, setWidth] = useState(window.innerWidth)
    const [show, setShow] = useState(4)

    useEffect(() => {

        const random = Math.floor(Math.random() * 10) + 2

        axios.get(`https://api.scryfall.com/cards/search?page=${random}&order=edhrec&dir=asc&q=-is%3Afunny+-is:digital+-t:land`)

            .then(response => setRecommendedCards(shuffleArray(response.data.data)))
            .catch(() => setRecommendedCards([]))

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
            </div>

            <p className='recommended-cards header'>Recommended cards</p>
            <Divider style={{background:'darkgrey'}}/>
            <AutoCarousel course={course} show={show} cards={recommendedCards}/>
        </div>
    )
}

export default Main;
