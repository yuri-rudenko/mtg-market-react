import React, { useEffect } from 'react';
import './Header.css'
import { Dropdown, Input, Space } from 'antd';
import axios from 'axios';
import { defaultCards } from '../../Functions/defaultCards';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';

const Header = (props) => {

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

    const items = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              1st menu item
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              2nd menu item (disabled)
            </a>
          ),
          disabled: true,
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              3rd menu item (disabled)
            </a>
          ),
          disabled: true,
        },
        {
          key: '4',
          danger: true,
          label: 'a danger item',
        },
      ];
    

    const { Search } = Input;

    function findCard(card) {

    }

    return (
        <div className='Header'>
            <img onClick={setDefault} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Magicthegathering-logo.svg/1280px-Magicthegathering-logo.svg.png" alt="Magic" className='logo'/>
            <Search className='search' placeholder="input search text" allowClear enterButton size='large' styles={{color: "red"}} onSearch={onSearch}/>
            <Dropdown menu={{ items }}><ShoppingCartOutlined className='shopping-cart'/></Dropdown>
        </div>
    );
}

export default Header;
