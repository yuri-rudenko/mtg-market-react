import React from 'react';
import { useSelector } from 'react-redux';
import './Favourites.css'
import Card from '../Cards/Card/Card';
import { Divider } from 'antd';

const Favourites = (props) => {

    const course = props.course
    const favourites = useSelector(state => state.favourites)

    return (
        <div className='Favourites'>
            <h1 className='your-favs'>Your favourites</h1>
            <Divider style={{background:'darkgrey'}}/>
            <div className="fav-container">
                {
                favourites.length > 0 ?
                    favourites.map(card => <Card course={course} card={card}></Card>) :
                    <p>You don't have any favourites yet</p>
                }
            </div>
        </div>
    );
}

export default Favourites;
