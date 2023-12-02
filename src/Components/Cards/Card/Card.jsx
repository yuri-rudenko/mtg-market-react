import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [amount, setAmount] = useState(1)

    const card = props.card
    const course = props.course

    const increaseAmount = () => {
        setAmount(amount + 1)
    }

    const decreaseAmount = () => {
        if (amount > 1) {
            setAmount(amount - 1)
        }
    }

    const handleAmountChange = (e) => {
        const newAmount = parseInt(e.target.value, 10)
        if (!isNaN(newAmount) && newAmount >= 1) {
            setAmount(newAmount)
        }
    }

    const addCard = (card, amount) => {
        dispatch({ type: "ADD_CARD", payload: {card: {...card, amount: amount}}})
    };

    return (
        <div className="card" key={card.id}>
            <img src={getImageSrc(card)} alt="" onClick={() => navigate(`/${card.id}`)} />
            <div className='text'>
                <p onClick={() => console.log(card.id)} className='cardName'>{card.name}</p>
                <p className="price">{getPrice(card, course)}</p>
            </div>
            <div className="inputs">
                <div className="amount">
                    <div onClick={decreaseAmount}>-</div>
                    <input
                        value={amount}
                        type="text"
                        onChange={handleAmountChange}
                    />
                    <div onClick={increaseAmount}>+</div>
                </div>
                <button className='add' onClick={() => addCard(card, amount)}>
                    ADD TO THE CART
                </button>
            </div>
        </div>
    );
};

export default Card;
