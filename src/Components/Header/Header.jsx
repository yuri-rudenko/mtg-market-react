import React from 'react';
import './Header.css'
import { Input, Space } from 'antd';

const Header = () => {

    const { Search } = Input;

    function findCard(card) {
        
    }

    return (
        <div className='Header'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Magicthegathering-logo.svg/1280px-Magicthegathering-logo.svg.png" alt="Magic" className='logo'/>
            <Search className='search' placeholder="input search text" allowClear enterButton size='large' styles={{color: "red"}}/>
        </div>
    );
}

export default Header;
