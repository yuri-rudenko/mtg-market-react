import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Cards.css'

const Cards = (props) => {

    function getImageSrc(card) {
        if(card.image_uris !== undefined) return card.image_uris.normal
        if(card.card_faces !== undefined) return card.card_faces[0].image_uris.normal
    }
    
    function getPrice(card, dollar) {
        if(card.prices.usd !== null) return `${Math.floor(card.prices.usd * dollar * 100)/100} ₴`
        if(card.prices.usd_foil !== null) return `${Math.floor(card.prices.usd_foil * dollar * 100)/100} ₴`
        else return `-`
    }
      
    let course = 36

    const loading = props.loading

    useEffect(() => {

        async function getCourse() {
            try {
                course = (await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/dollar_info?json')).data[0].rate
                console.log(course)
            }
            
            catch(error) {
              console.error('Error fetching data:', error)
            }
        }

        getCourse()
    })
    
    const cards = props.data

    console.log(cards)
    
    return (
      <div className="Cards">
        {loading ? ( 
          <h1>Loading</h1>
        ) : (
          cards.map(card => (
            <div className="card" key={card.id}>
              <img src={getImageSrc(card)} alt=""></img>
              <div className='text'>
                  <p className='cardName'>{card.name}</p>
                  <p className="price">{getPrice(card, course)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    );
}

export default Cards;