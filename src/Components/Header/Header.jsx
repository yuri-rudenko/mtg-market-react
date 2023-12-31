import React, { useEffect } from 'react';
import './Header.css'
import { Button, Divider, Dropdown, Input, Space, theme } from 'antd';
import axios from 'axios';
import { defaultCards } from '../../Functions/defaultCards';
import { Link, useNavigate } from 'react-router-dom';
import { CloseCircleTwoTone, ShopOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import Dropmenu from './Dropmenu';
import heart from './heart.svg'


const Header = (props) => {

    const amount = useSelector(state => state.amount)

    const setCards = props.onSearch
    const setLoading = props.setLoading

    const navigate = useNavigate()

    function onSearch(value) {
        let newVal = value.replace(/[\s]+$/, '').replace(/ {2,}/g, '+')
        console.log(newVal, 'NEWWAL')
        navigate(`/shop/${newVal}+p:1+`)
    }

    async function setDefault() {
        navigate('/')
        const cardsData = await defaultCards();
        setCards(cardsData);
    }

    const handleLogoHover = () => {
        const header = document.querySelector('.Header')
        header.classList.add('hovered')
    }
    
      const handleLogoLeave = () => {
        const header = document.querySelector('.Header')
        header.classList.remove('hovered')
    }
    
    
    const { Search } = Input;

    return (
        <div className='Header'>
            <img onClick={setDefault} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Magicthegathering-logo.svg/1280px-Magicthegathering-logo.svg.png" onMouseLeave={handleLogoLeave} onMouseEnter={handleLogoHover} alt="Magic" className='logo'/>
            <Search className='search' placeholder="input search text" allowClear enterButton size='large' styles={{color: "red"}} onSearch={onSearch}/>
            <ShopOutlined className='icon shop-outlined' onClick={() => navigate('/shop')}/>
            <img className='icon heart' src={heart} alt="heart" onClick={() => navigate('/favourites')}/>
            <Dropmenu course={props.course}/>
            <p className='show-amount'>{amount}</p>
        </div>
    );
}

export default Header;
