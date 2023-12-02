import React from 'react';
import { useNavigate } from 'react-router-dom';

function getImageSrc(card) {
    if(card.image_uris !== undefined) return card.image_uris.normal
    if(card.card_faces !== undefined) return card.card_faces[0].image_uris.normal
  }
  
  function getPrice(card, dollar) {
    if(card.prices.usd !== null) return `${Math.floor(card.prices.usd * dollar * 100)/100} ₴`
    if(card.prices.usd_foil !== null) return `${Math.floor(card.prices.usd_foil * dollar * 100)/100} ₴`
    if(card.prices.usd_etched !== null) return `${Math.floor(card.prices.usd_etched * dollar * 100)/100} ₴`
    else return `-`
  }

const Card = (props) => {

    const navigate = useNavigate()

    const card = props.card
    const course = props.course

    return (
        <div className="card" key={card.id}>
            <img src={getImageSrc(card)} alt="" onClick={() => navigate(`/${card.id}`)}></img>
            <div className='text'>
              <p onClick={() => console.log(card.id)} className='cardName'>{card.name}</p>
              <p className="price">{getPrice(card, course)}</p>
            </div>
            <div className="inputs">
              <div className="amount">
                <div>-</div>
                  <input type="text"/>
                <div>+</div>
              </div>
              <button className='add'>ADD TO THE CART</button>
            </div>
        </div>
    );
}

export default Card;
