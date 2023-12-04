import React, { useEffect } from 'react';
import './Header.css'
import { Button, Divider, Dropdown, Input, Space, theme } from 'antd';
import axios from 'axios';
import { defaultCards } from '../../Functions/defaultCards';
import { Link, useNavigate } from 'react-router-dom';
import { CloseCircleTwoTone, ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import Dropmenu from './Dropmenu';




const Header = (props) => {

    const amount = useSelector(state => state.amount)

    const setCards = props.onSearch
    const setLoading = props.setLoading

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
    
    
    const { Search } = Input;

    return (
        <div className='Header'>
            <img onClick={setDefault} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Magicthegathering-logo.svg/1280px-Magicthegathering-logo.svg.png" alt="Magic" className='logo'/>
            <Search className='search' placeholder="input search text" allowClear enterButton size='large' styles={{color: "red"}} onSearch={onSearch}/>
            <Dropmenu course={props.course}/>
            <p className='show-amount'>{amount}</p>
        </div>
    );
}

export default Header;
