import React, { useEffect, useState } from 'react';
import './Cards.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Sorter from './Sorter/Sorter';
import Paginator from './Paginator/Paginator';
import GearImage from './images/Gear.gif';
import Card from './Card/Card';

const Cards = (props) => {

  const navigate = useNavigate()
  const loading = props.loading
  let cards = props.data.data
  if(!cards) cards = []

  console.log(props.data, 'CARDS')

  const [selectedPage, setSelectedPage] = [props.selectedPage, props.setSelectedPage]
  const [selectedShow, setSelectedShow] = useState(24)
  
  return (
    cards.length > 0 ? (
      <div className="Cards">
        <div className="top">
          <Sorter setUrlArr={props.setUrlArr} />
          <Paginator selectedPage={selectedPage} setSelectedPage={setSelectedPage} selectedShow={selectedShow} setSelectedShow={setSelectedShow} size='small' setUrlArr={props.setUrlArr} data={props.data} />
        </div>
        {loading ? (
          <img src={GearImage} alt='loading' />
        ) : (
          <div className="cards-container">
            {cards.map(card => (
              <Card card={card} key={card.id + 1} course={props.course} />
            ))}
          </div>
        )}
  
        <div className="bottom-paginator">
          <Paginator selectedPage={selectedPage} setSelectedPage={setSelectedPage} selectedShow={selectedShow} setSelectedShow={setSelectedShow} size='big' setUrlArr={props.setUrlArr} data={props.data} />
        </div>
      </div>
    ) : <div className='no-cards-found'>
      <h1>No cards were found from your request</h1>
      <p onClick={() => navigate('/shop')}>Go back to the shop</p>
    </div>
  );
}

export default Cards;