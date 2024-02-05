import { Carousel } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import Card from '../Cards/Card/Card';

const AutoCarousel = (props) => {

    const course = props.course
    const cards = props.cards
    const show = props.show

    const autoScrollTime = Math.floor(Math.random() * 20000) + 50000

    const renderCarouselCards = (startIndex) => {
        
        return (
            <div className='carousel-cards' >
                {cards.slice(startIndex*show, startIndex*show + show).map((card, index) => (

                    <Card key={index} card={card} course={course} />

                ))}
            </div>
        )
    }

    return (
        <div>
            <Carousel speed={750} autoplay autoplaySpeed={autoScrollTime}>
                <div className='carousel-cards-wrapper'>
                    {renderCarouselCards(0)}
                </div>
                <div className='carousel-cards-wrapper'>
                    {renderCarouselCards(1)}
                </div>
                <div className='carousel-cards-wrapper'>
                    {renderCarouselCards(2)}
                </div>
                <div className='carousel-cards-wrapper'>
                    {renderCarouselCards(3)}
                </div>
            </Carousel>
        </div>
    );
}

export default AutoCarousel;
