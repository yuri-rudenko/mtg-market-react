import { Carousel } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import Card from '../Cards/Card/Card';

const AutoCarousel = (props) => {
    const course = props.course
    const cards = props.cards
    const show = props.show

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
            <Carousel autoplay autoplaySpeed={3000}>
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
