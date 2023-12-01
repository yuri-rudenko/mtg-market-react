import React, { useEffect, useState } from 'react';
import './Cards.css'
import { useNavigate, useParams } from 'react-router-dom';
import Sorter from './Sorter/Sorter';
import { Pagination } from 'antd';
import Paginator from './Paginator/Paginator';

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

const Cards = (props) => {

  const navigate = useNavigate()

  const loading = props.loading
  const course = props.course
  let cards = props.data.data
  if(!cards) cards = []

  console.log(props.data, 'CARDS')
  
  return (
    <div className="Cards">
      <div className="top">
        <Sorter setUrlArr={props.setUrlArr}/>
        <Paginator setCards={props.setCards} setLoading={props.setLoading} setUrlArr={props.setUrlArr} data={props.data}/>
      </div>
      {loading ? ( 
        <h1>Loading</h1>
      ) : (
        <div className="cards-container">
          {cards.map(card => (
            <div className="card" key={card.id}>
                <img src={getImageSrc(card)} alt="" onClick={() => navigate(`/${card.name}`)}></img>
                <div className='text'>
                  <p className='cardName'>{card.name}</p>
                  <p className="price">{getPrice(card, course)}</p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Cards;