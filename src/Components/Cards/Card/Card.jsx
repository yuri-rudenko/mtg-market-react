import { HeartOutlined, HeartTwoTone, ShoppingCartOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Card.css'
import heart from '../images/heart.svg'

export function getImageSrc(card) {
    if(card.image_uris !== undefined) return card.image_uris.normal
    if(card.card_faces !== undefined) return card.card_faces[0].image_uris.normal
}
  
export function getPrice(card, dollar) {
    if(card.prices.usd !== null) return Math.floor(card.prices.usd * dollar * 100)/100
    if(card.prices.usd_foil !== null) return Math.floor(card.prices.usd_foil * dollar * 100)/100
    if(card.prices.usd_etched !== null) return Math.floor(card.prices.usd_etched * dollar * 100)/100
    else return 0
}



const Card = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const favourites = useSelector(state => state.favourites)

    const [amount, setAmount] = useState(1)
    const [loading, setLoading] = useState(true)

    const card = props.card
    const course = props.course

    const increaseAmount = () => {
        if(amount < 99) {
            setAmount(amount + 1)
        } 
    }

    const decreaseAmount = () => {
        if (amount > 1) {
            setAmount(amount - 1)
        }
    }

    const handleAmountChange = (e) => {
        let newAmount = parseInt(e.target.value, 10)
        if(newAmount > 99) newAmount = 99
        if (!isNaN(newAmount) && newAmount >= 1) {
            setAmount(newAmount)
        }
        else {
            setAmount(1)
        }
    }

    const addCard = (card, amount) => {
        dispatch({ type: "ADD_CARD", payload: {card: {...card, amount: amount}}})
    }

    const loadImage = (src, callback) => {
        const image = new Image();
        image.onload = callback;
        image.src = src;
    }

    const handleImageLoad = () => {
        setLoading(false);
    }

    const addToFavs = (card) => {
        dispatch({type: "ADD_FAV", payload: {card: card}})
        console.log(card)
    }

    const removeFromFavs = (card) => {
        dispatch({type: "REMOVE_FAV", payload: {card: card}})
        console.log(card)
    }

    loadImage(getImageSrc(card), handleImageLoad);

    return (
        <div className="card">
            <div className='image-container'>
                {loading && <div className='card-loading'  onClick={() => navigate(`/item/${card.id}`)}>
                    <div className="elipsis">
                    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                </div>}
                <img
                  src={getImageSrc(card)}
                  alt=""
                  onClick={() => navigate(`/item/${card.id}`)}
                  style={{ visibility: loading ? "hidden" : "visible" }}
                  loading='lazy'
                  className={card.card_faces ? "front-of-backside" : ""}
                />
                {card.card_faces && <img
                  src={getImageSrc(card.card_faces[1])}
                  alt=""
                  onClick={() => navigate(`/item/${card.id}`)}
                  style={{ visibility: loading ? "hidden" : "visible" }}
                  loading='lazy'
                  className='backside-card'
                />
                }
            </div>
            <div className='text'>
                <p className='cardName'>{card.name}</p>
                <p className="price">{getPrice(card, course) !== 0 ? `${getPrice(card, course)} ₴` : '-'}</p>
            </div>
            <div className="inputs">
                <div className="amount">
                    <div onClick={decreaseAmount}>-</div>
                    <input
                        value={amount}
                        type="number"
                        onChange={handleAmountChange}
                    />
                    <div onClick={increaseAmount}>+</div>
                </div>
                {!favourites.find(fav => fav.id === card.id) && 
                    <div className="add-to-favs" onClick={() => addToFavs(card)}>
                        <HeartOutlined style={{fontSize:24}}/>
                        <p>Add to favourites</p>
                    </div>
                }
                {favourites.find(fav => fav.id === card.id) && 
                    <div className="add-to-favs" onClick={() => removeFromFavs(card)}>
                        <HeartTwoTone style={{fontSize:24}} twoToneColor='red'/>
                        <p>Remove from favourites</p>
                    </div> 
                }
                <button className='add' onClick={() => addCard(card, amount)}>
                    <div className='add-cart-logo'>
                        <ShoppingCartOutlined/>
                    </div>
                    <p className=''>ADD TO THE CART</p>
                </button>
            </div>
        </div>
    );
};

export default Card;
