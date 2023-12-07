import React, { useState } from 'react';
import { Input, Button, Divider } from 'antd';
import './Checkout.css';
import { useSelector } from 'react-redux';
import { getPrice } from '../Cards/Card/Card';

const Checkout = (props) => {

    const [telephone, setTelephone] = useState('');
  
    const handleTelephoneChange = (e) => {
        const value = e.target.value
            
        const sanitizedValue = value.replace(/[^0-9+\s]/g, '')
        setTelephone(sanitizedValue)
    }
  
    const handleSubmit = (e) => {

        e.preventDefault()

        if (
            document.getElementById('first-name').checkValidity() &&
            document.getElementById('last-name').checkValidity() &&
            document.getElementById('country').checkValidity() &&
            document.getElementById('city').checkValidity() &&
            document.getElementById('address').checkValidity() &&
            document.getElementById('telephone').checkValidity() &&
            document.getElementById('email').checkValidity()
        ) {

            console.log('Form submitted successfully')
        } 

        else {

            console.log('Invalid form submission')

        }
    }

    /////////////

    const cards = useSelector(state => state.cards)
    const amount = useSelector(state => state.amount)
    const course = props.course
  
    return (
      <div className='Checkout'>
        <div className="form">
          <h2>Checkout</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="first-name">First Name:</label>
              <Input type="text" id="first-name" className="first-name" required />
            </div>
  
            <div className="form-group">
              <label htmlFor="last-name">Last Name:</label>
              <Input type="text" id="last-name" className="last-name" required />
            </div>
  
            <div className="form-group">
              <label htmlFor="country">Country:</label>
              <Input type="text" id="country" className="country" required />
            </div>
  
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <Input type="text" id="city" className="city" required />
            </div>
  
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <Input type="text" id="address" className="address" required />
            </div>
  
            <div className="form-group">
              <label htmlFor="telephone">Telephone:</label>
              <Input
                type="tel"
                id="telephone"
                className="telephone"
                value={telephone}
                onChange={handleTelephoneChange}
                required
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Input type="email" id="email" className="email" required />
            </div>
  
            <button className='submit'>Submit</button>
          </form>
        </div>
        <div className="chechout-cart">
            <p className="your-order">YOUR ORDER</p>
            <div className="cards">
                <p className='items'>Items</p>
                <Divider style={{background:'darkgrey'}}/>
                {cards.map(card => {
                    return (
                        <div className='card'>
                            <div className="card-left">
                                <div>{card.name} x{card.amount}</div>
                            </div>
                            <div className="card-right">
                                {Math.round(getPrice(card, course) * card.amount * 100)/100} ₴
                            </div>
                        </div>
                    )
                })}
                <Divider style={{background:'darkgrey'}}/>
                <div className="sum">
                    <p>Sum</p>
                    <p className='money'>{Math.round(cards.reduce((sum, card) => sum + getPrice(card, course) * card.amount, 0) * 100) / 100} ₴</p>
                </div>
                <Divider style={{background:'darkgrey'}}/>
            </div>
        </div>
      </div>
    );
}

export default Checkout;
