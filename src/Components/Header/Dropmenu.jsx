import { CloseCircleTwoTone, ShoppingCartOutlined } from '@ant-design/icons';
import { Divider, Dropdown, theme } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { getPrice } from '../Cards/Card/Card';
import { useDispatch, useSelector } from 'react-redux';

const { useToken } = theme

function getImageSrcSmall(card) {
    if(card.image_uris !== undefined) return card.image_uris.small
    if(card.card_faces !== undefined) return card.card_faces[0].image_uris.small
}

const Dropmenu = (props) => {

    const dispatch = useDispatch()
    const course = props.course
    const cards = useSelector(state => state.cards)
    const amount = useSelector(state => state.amount)

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
                            <p className='amount'>{card.amount} × {Math.floor(card.prices.usd * course * 1000)/1000}₴</p>
                        </div>
                </div>
            </div>
    }));

    const { token } = useToken();

    const contentStyle = {
      backgroundColor: token.colorBgElevated,
      borderRadius: token.borderRadiusLG,
      boxShadow: token.boxShadowSecondary,
    }

    return (
        <Dropdown 

        className='dropDown' 
        menu={{ items }}
        dropdownRender={(menu) => (

          <div style={contentStyle}>

            <div className={`top-card ${amount <= 0 ? 'padding-bottom-30' : ''}`}>
              <p className='left'>{amount} ITEMS</p>
              <Link to={'/checkout'}>
                <p className='right'>GO TO CART</p>
              </Link>
              
            </div>


                {amount > 0 && amount !== undefined && (
                  <>
                  
                    <div className='cart-cards-container'> {React.cloneElement(menu)} </div>
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
                    <Link to={'/checkout'}>
                        <div className="check-out-wrapper">
                            <button className='check-out'>CHECK OUT</button>
                        </div>
                    </Link>
                  </>
                )}

            </div>
        )}
    
    ><ShoppingCartOutlined className='shopping-cart'/></Dropdown>
    );
}

export default Dropmenu;
