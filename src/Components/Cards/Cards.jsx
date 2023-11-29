import React, { useEffect, useState } from 'react';
import './Cards.css'
import { useNavigate, useParams } from 'react-router-dom';
import { Dropdown, Space } from 'antd';
import items from './items';
import { parseLink } from '../Selector/SelectorFunctions/parseLink';

function formUrlOrder(curOrder, setUrlArr) {

  setUrlArr(prev => ({ ...prev, order: `o:${curOrder.value}+` }));

}

const Cards = (props) => {

  const params = useParams()['*']
  const setUrlArr = props.setUrlArr

  const navigate = useNavigate()

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

    const loading = props.loading
    const course = props.course
    const cards = props.data

    console.log(cards)

    const [selected, setSelected] = useState(items[1])

    const onClick = ({ key }) => {

      const selectedItem = items.find((item) => item.key === key);

      setSelected(selectedItem);
      formUrlOrder(selectedItem, setUrlArr)

    };

    useEffect(() => {

      const all = (parseLink(params, 'o', ':').map(el => el.code))[0]

      if(all) {
        const cur = items.find((item) => item.value === all)
      
        setSelected(cur)
        formUrlOrder(cur, setUrlArr)
      }
  
  }, [params, setUrlArr])
  
    return (
      <div className="Cards">
        <div className="top">
          <Dropdown
            menu={{ items, onClick }}
            trigger={['click']}
            value={selected.label}
          >
            <div className='sortingContainer' onClick={(e) => e.preventDefault()}>
              <Space>
                <p>Sort by: </p>
                <button className='sorting'>{selected.label}</button>
              </Space>
            </div>
          </Dropdown>
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