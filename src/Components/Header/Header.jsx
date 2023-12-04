import React, { useEffect } from 'react';
import './Header.css'
import { Button, Divider, Dropdown, Input, Space, theme } from 'antd';
import axios from 'axios';
import { defaultCards } from '../../Functions/defaultCards';
import { useNavigate } from 'react-router-dom';
import { CloseCircleTwoTone, ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getPrice } from '../Cards/Card/Card';

const { useToken } = theme

function getImageSrcSmall(card) {
    if(card.image_uris !== undefined) return card.image_uris.small
    if(card.card_faces !== undefined) return card.card_faces[0].image_uris.small
}

const Header = (props) => {

    const cards = useSelector(state => state.cards)
    const amount = useSelector(state => state.amount)

    const dispatch = useDispatch()

    const setCards = props.onSearch
    const setLoading = props.setLoading
    const course = props.course

    const navigate = useNavigate()

    function onSearch(value) {
        let newVal = value.replace(/[\s]+$/, '').replace(/ {2,}/g, '+')
        searchCard(newVal)
    }

    async function setDefault() {
        navigate('/shop')
        const cardsData = await defaultCards();
        setCards(cardsData);
    }

    function searchCard(name) {

        async function getData() {
            try {
                setLoading(true)
                let result = await axios.get(`https://api.scryfall.com/cards/search?order=usd&q=${name}`)
                setCards(result.data.data)
            }
            catch(error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }
        getData()
    }
    

    
    const items = cards.map((card, index) => ({
        key: (index + 1) + card.id,
        label:
            <div className="cart-card-wrapper">
                <div className="delete-item" onClick={(e) => { 
                    e.stopPropagation();
                    dispatch({ type: "REMOVE_CARD", payload: { card: card } });
                }}>
                  <CloseCircleTwoTone className='delete-button' twoToneColor={'red'}/>
                </div>
                <div className='cart-card'>
                        <img src={getImageSrcSmall(card)} alt="CardImage"/>
                        <div className="cart-card-text">
                            <p className='name'>{card.name}</p>
                            <p className='amount'>{card.amount} × {Math.floor(card.prices.usd *course * 1000)/1000}₴</p>
                        </div>
                </div>
            </div>
    }));
    

    const { Search } = Input;

    const { token } = useToken();

    const contentStyle = {
      backgroundColor: token.colorBgElevated,
      borderRadius: token.borderRadiusLG,
      boxShadow: token.boxShadowSecondary,
    }

    return (
        <div className='Header'>
            <img onClick={setDefault} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Magicthegathering-logo.svg/1280px-Magicthegathering-logo.svg.png" alt="Magic" className='logo'/>
            <Search className='search' placeholder="input search text" allowClear enterButton size='large' styles={{color: "red"}} onSearch={onSearch}/>
            <Dropdown 

                className='dropDown' 
                menu={{ items }}
                dropdownRender={(menu) => (
                    <div style={contentStyle}>

                    <div className={`top-card ${amount <= 0 ? 'padding-bottom-30' : ''}`}>
                      <p className='left'>{amount} ITEMS</p>
                      <p className='right'>GO TO CART</p>
                    </div>


                        {amount > 0 && amount !== undefined && (
                          <>
                            {React.cloneElement(menu)}
                            <Divider style={{ marginTop: 0, marginBottom: 10, backgroundColor: 'lightgray' }} />
                            <div className="total">
                              <p>Total</p>
                              <p>
                                {new Intl.NumberFormat('en-US', {
                                  style: 'currency',
                                  currency: 'UAH',
                                  minimumFractionDigits: 2,
                                }).format(
                                  Math.round(
                                    cards.reduce(
                                      (sum, card) => sum + getPrice(card, course) * card.amount,
                                      0
                                    ) * 100
                                  ) / 100
                                )}
                              </p>
                            </div>
                            <Divider style={{ marginTop: 0, marginBottom: 10, backgroundColor: 'lightgray' }} />
                            <div className="check-out-wrapper">
                                <button className='check-out'>CHECK OUT</button>
                            </div>
                          </>
                        )}

                    </div>
                )}
            
            ><ShoppingCartOutlined className='shopping-cart'/></Dropdown>
            <p className='show-amount'>{amount}</p>
        </div>
    );
}

export default Header;
