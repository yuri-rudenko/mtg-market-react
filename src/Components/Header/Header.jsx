import React, { useEffect } from 'react';
import './Header.css'
import { Button, Dropdown, Input, Space } from 'antd';
import axios from 'axios';
import { defaultCards } from '../../Functions/defaultCards';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';


const Header = (props) => {

    const cards = useSelector(state => state.cards)
    const amount = useSelector(state => state.amount)

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
        label: <div className='cart-card'>
                <img src={card.image_uris.small} alt="CardImage"/>
                <div className="cart-card-text">
                    <p className='name'>{card.name}</p>
                    <p className='amount'>{card.amount} × {Math.floor(card.prices.usd *course * 1000)/1000}₴</p>
                </div>
            </div>,
    }));

    items.unshift({
        key: 1,
        label: <div className='top-card cardEl'>
            <p className='left'>{amount} ITEMS</p>
            <p className='right'>GO TO CART</p>
        </div>,
    })
    

    const { Search } = Input;

    function findCard(card) {

    }

    return (
        <div className='Header'>
            <img onClick={setDefault} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Magicthegathering-logo.svg/1280px-Magicthegathering-logo.svg.png" alt="Magic" className='logo'/>
            <Search className='search' placeholder="input search text" allowClear enterButton size='large' styles={{color: "red"}} onSearch={onSearch}/>
            <Dropdown className='dropDown' menu={{ items }}><ShoppingCartOutlined className='shopping-cart'/></Dropdown>
        </div>
    );
}

export default Header;
