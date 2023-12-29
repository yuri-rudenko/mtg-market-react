import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card, { getImageSrc, getPrice } from '../Cards/Card/Card';
import './Item.css'
import { Divider } from 'antd';
import combinations from '../Selector/Selectors/Colors/combinations';
import { useDispatch, useSelector } from 'react-redux';
import { CheckOutlined, HeartOutlined, HeartTwoTone, ShoppingCartOutlined } from '@ant-design/icons';
import CardTable from './CardTable';
import { shuffleArray } from '../../Functions/shuffleArray';
import { Carousel } from 'react-responsive-carousel';

export const findMatchingCombination = (combinations, selectedColors) => {
    if(!selectedColors) return 'Colorless'

    const selectedCode = selectedColors.sort().join('').toLowerCase()
  
    const matchingCombination = combinations.find(combination => {
      const combinationCode = combination.code.split('').sort().join('').toLowerCase()
      return combinationCode === selectedCode
    });
  
    return matchingCombination ? matchingCombination.name : '5 Color'
}

const Item = (props) => {

    const course = props.course

    const navigate = useNavigate()

    const {id} = useParams()
    const [card, setCard] = useState({})
    const [recommendedCards, setRecommendedCards] = useState([])

    const dispatch = useDispatch()
    const cards = useSelector(state => state.cards)
    const favourites = useSelector(state => state.favourites)

    const [amount, setAmount] = useState(1)

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

    const addToFavs = (card) => {
        dispatch({type: "ADD_FAV", payload: {card: card}})
        console.log(card)
        console.log(favourites)
    }

    const removeFromFavs = (card) => {
        dispatch({type: "REMOVE_FAV", payload: {card: card}})
        console.log(card)
        console.log(favourites)
    }

    useEffect(() => {
        axios.get(`https://api.scryfall.com/cards/${id}`)
            .then(result => {
                setCard(result.data)
            })
            .catch(error => {
                setCard(null)
            })
        
        if(card.type_line) {

            const randomNumber = Math.floor(Math.random() * 5) + 1

            axios.get(`https://api.scryfall.com/cards/search?page=${randomNumber}&order=edhrec&q=-t:land+-t:artifact-is%3Afunny+-is:digital`)
                .then(result => {

                    const shuffeled = shuffleArray(result.data.data)

                    const selectedObjects = []
                    const selectedNames = new Set()

                    for (const card of shuffeled) {
                        if (selectedNames.size === 8) {
                            break;
                        }
                    
                        if (!selectedNames.has(card.name)) {
                            selectedNames.add(card.name)
                            selectedObjects.push(card)
                        }
                    }

                    setRecommendedCards(selectedObjects)
                })

            .catch(error => {
                console.log(error)
                setRecommendedCards([])
            })
        }

    }, [card.type_line, id])

    useEffect(() => {
        console.log(recommendedCards, 'REC')
    }, [recommendedCards, setRecommendedCards])


    return (
        Object.keys(card).length > 0 && (
            <div className="Item-wrapper">
            <div className='Item'>
                {cards.find(card => card.id === id) && (
                    <div className="added-to-cart">
                        <CheckOutlined style={{color: '#00C851', fontSize:26}} />
                        <p className='added-to-cart-name'>{card.name} x{cards.find(findCard => findCard.id === card.id).amount}</p>
                        <p> has been added to your card</p>
                    </div>
                )}
                <div className="top-item">
                    <div className="left">
                        <img className='big-card' src={getImageSrc(card)} alt="CardImage" />
                    </div>
                    <div className="right">
                        <div className="big-text">
                            <p>{card.name}</p>
                            <p className="price">{getPrice(card, course)} ₴</p>
                        </div>
                        <Divider style={{background:"grey"}}/>
                        <div className="categories">
                            <p>Categories: </p>
                            <p onClick={() => navigate(`/shop/mv=${card.cmc}`)}>Cmc: {card.cmc},</p>
                            {card.type_line.split(' — ')[0].split(' ').map(type => {
                                return <p onClick={() => navigate(`/shop/t:${type}+`)} key={type}>{type},</p>
                            })}
                            {card.type_line.split(' — ')[1] && card.type_line.split(' — ')[1].split(' ').map(type => {
                                return <p onClick={() => navigate(`/shop/t:${type}+`)} key={type}>{type},</p>
                            })}
                            <p onClick={() => navigate(`/shop/(c=${combinations.find(comb => comb.name===findMatchingCombination(combinations, card.colors))['code']})+`)}>{findMatchingCombination(combinations, card.colors)},</p>
                            <p>{card.released_at.slice(0,4)},</p>
                            <p onClick={() => navigate(`/shop/(e:${card.set})`)}>{card.set.toUpperCase()},</p>
                            <p onClick={() => navigate(`/shop/(r:${card.rarity})`)}>{card.rarity.charAt(0).toUpperCase() + card.rarity.slice(1)}</p>
                        </div>
                        <p className='avalibility'>Avalibility: 99</p>    
                        <Divider style={{background:"grey"}}/>
                        
                        <div className="add-to-cart-item">
                            <div className="amount-changer-item">
                                <div onClick={decreaseAmount}>-</div>
                                <input
                                    value={amount}
                                    type="number"
                                    onChange={handleAmountChange}
                                />
                                <div onClick={increaseAmount}>+</div>
                            </div>
                            <button onClick={() => addCard(card, amount)} className='add-item'>
                                <div className='add-cart-logo-item'>
                                    <ShoppingCartOutlined/>
                                </div>
                                <p>ADD TO THE CART</p>
                            </button>
                        </div>
                        <Divider style={{background:"grey"}}/>
                        {!favourites.find(fav => fav.id === card.id) && 
                            <div className="add-to-fav" onClick={() => addToFavs(card)}>
                                <HeartOutlined style={{fontSize:30}}/>
                                <p>Add to favourites</p>
                            </div> 
                        }
                        {favourites.find(fav => fav.id === card.id) && 
                            <div className="add-to-fav" onClick={() => removeFromFavs(card)}>
                                <HeartTwoTone style={{fontSize:30}} twoToneColor='red'/>
                                <p>Remove from favourites</p>
                            </div> 
                        }
                    </div>
                </div>
                <p className='extra-info'>Extra information</p>
                <Divider style={{background:"grey"}}/>
                <CardTable card={card}/>
                <p className='recommended-cards'>Recommended cards</p>
                <Divider style={{background:"grey"}}/>
                <div className="recommendation-wrapper">
                    <div className="recommendation">
                        {recommendedCards.map(card => <Card key={card.id + 3} card={card} course={course}></Card>)}
                    </div>
                </div>

            </div>
            </div>
        )
    );
}

export default Item;
