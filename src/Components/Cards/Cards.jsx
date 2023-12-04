import React, { useEffect, useState } from 'react';
import './Cards.css'
import { useNavigate, useParams } from 'react-router-dom';
import Sorter from './Sorter/Sorter';
import Paginator from './Paginator/Paginator';
import GearImage from './images/Gear.gif';
import Card from './Card/Card';

const Cards = (props) => {

  const loading = props.loading
  let cards = props.data.data
  if(!cards) cards = []

  console.log(props.data, 'CARDS')

  const [selectedPage, setSelectedPage] = useState(1)
  const [selectedShow, setSelectedShow] = useState(24)
  
  return (
    <div className="Cards">
      <div className="top">
        <Sorter setUrlArr={props.setUrlArr} setCards={props.setCards} setLoading={props.setLoading}/>
        <Paginator selectedPage={selectedPage} setSelectedPage={setSelectedPage} selectedShow={selectedShow} setSelectedShow={setSelectedShow} size='small' setCards={props.setCards} setLoading={props.setLoading} setUrlArr={props.setUrlArr} data={props.data}/>
      </div>
      {loading ? ( 
        <img src={GearImage} alt='loading'></img>
      ) : (
        <div className="cards-container">
          {cards.map(card => (
            <Card card={card} key={card.id+1} course={props.course}/>
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