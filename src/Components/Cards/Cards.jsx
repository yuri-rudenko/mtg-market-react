import React, { useEffect, useState } from 'react';
import './Cards.css'
import { useNavigate, useParams } from 'react-router-dom';
import Sorter from './Sorter/Sorter';
import { Pagination } from 'antd';
import Paginator from './Paginator/Paginator';
import GearImage from './images/Gear.gif';

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

  const [selectedPage, setSelectedPage] = useState(0)
  const [selectedShow, setSelectedShow] = useState(24)
  
  return (
    <div className="Cards">
      <div className="top">
        <Sorter setUrlArr={props.setUrlArr}/>
        <Paginator selectedPage={selectedPage} setSelectedPage={setSelectedPage} selectedShow={selectedShow} setSelectedShow={setSelectedShow} size='small' setCards={props.setCards} setLoading={props.setLoading} setUrlArr={props.setUrlArr} data={props.data}/>
      </div>
      {loading ? ( 
        <img src={GearImage} alt='loading'></img>
      ) : (
        <div className="cards-container">
          {cards.map(card => (
            <div className="card" key={card.id}>
                <img src={getImageSrc(card)} alt="" onClick={() => navigate(`/${card.name}`)}></img>
                <div className='text'>
                  <p onClick={() => console.log(card.id)} className='cardName'>{card.name}</p>
                  <p className="price">{getPrice(card, course)}</p>
                </div>
                <button>ADD TO THE CART</button>
              </div>
            ))}
        </div>
      )}

      <div className="bottom-paginator">
        <Paginator selectedPage={selectedPage} setSelectedPage={setSelectedPage} selectedShow={selectedShow} setSelectedShow={setSelectedShow} size='big' setCards={props.setCards} setLoading={props.setLoading} setUrlArr={props.setUrlArr} data={props.data}/>
      </div>

    </div>
  );
}

export default Cards;