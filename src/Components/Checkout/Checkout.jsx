import React, { useState } from 'react';
import { Input, Button, Divider, Radio, Space, Checkbox } from 'antd';
import './Checkout.css';
import { useSelector } from 'react-redux';
import { getPrice } from '../Cards/Card/Card';

const Checkout = (props) => {

    const [telephone, setTelephone] = useState('')
    const [post, setPost] = useState('60')
    const [paymentMethod, setPaymentMethod] = useState('0')

  
    const handleTelephoneChange = (e) => {
        const value = e.target.value
            
        const sanitizedValue = value.replace(/[^0-9+\s]/g, '')
        setTelephone(sanitizedValue)
    }

    const hanglePostChange = (e) => {

        const value = e.target.value

        setPost(value)
    }

    const hanglePaymentMethod = (e) => {

        const value = e.target.value

        setPaymentMethod(value)
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

    const cards = useSelector(state => state.cards)
    const course = props.course
  
    return (
    <div className='Checkout'>
        <form id='main-form' onSubmit={handleSubmit}>
            <div className="form">
              <h2 className='payment-and-order'>Payment and order</h2>
                <div className="form-group">
                  <label htmlFor="name">First Name: *</label>
                  <Input type="text" id="name" className="name" required />
                </div>
        
                <div className="form-group">
                  <label htmlFor="last-name">Last Name: *</label>
                  <Input type="text" id="last-name" className="last-name" required />
                </div>
        
                <div className="form-group">
                  <label htmlFor="country">Country: *</label>
                  <Input type="text" id="country" className="country" required />
                </div>
        
                <div className="form-group">
                  <label htmlFor="city">City: *</label>
                  <Input type="text" id="city" className="city" required />
                </div>
        
                <div className="form-group">
                  <label htmlFor="address">Address: *</label>
                  <Input type="text" id="address" className="address" required/>
                </div>

                <div className="form-group">
                  <label htmlFor="postIndex">Post Index:</label>
                  <Input type="number" id="postIndex" className="address"/>
                </div>
        
                <div className="form-group">
                  <label htmlFor="telephone">Telephone:</label>
                  <Input
                    type="tel"
                    id="telephone"
                    className="telephone"
                    value={telephone}
                    onChange={handleTelephoneChange}
                  />
                </div>
        
                <div className="form-group">
                  <label htmlFor="email">Email: *</label>
                  <Input type="email" id="email" className="email" required />
                </div>

            </div>
            <div className="chechout-cart">
                <p className="your-order">YOUR ORDER</p>
                <div className="cards">
                    <p className='items'>Items</p>
                    <Divider style={{background:'darkgrey'}}/>
                    {cards.map(card => {
                        return (
                            <div key={card.id + '2'} className='card-checkout'>
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
                
                <div className='choose-post'>
                    <label className='label'>Choose Post Company:</label>
                    <div>
                        <Radio.Group onChange={hanglePostChange} value={post} required>
                            <Space direction="vertical">
                                <Radio className='post' value="60">Nova Poshta - 60 ₴</Radio>
                                <Radio className='post' value="30">UkrPoshta - 30 ₴</Radio>
                                <Radio className='post' value="40">Meest Express - 40 ₴</Radio>
                                <Radio className='post' value="45">DHL - 45 ₴</Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                    <Divider style={{background:'darkgrey'}}/>
                    <label className='label'>Choose Payment Method:</label>
                    <div>
                        <Radio.Group onChange={hanglePaymentMethod} value={paymentMethod} required>
                            <Space direction="vertical">
                                <Radio form='' className='post' value="0">Before Order - 0 ₴</Radio>
                                <Radio className='post' value="15">After Order - 15 ₴</Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                    <Divider style={{background:'darkgrey'}}/>
                    <div className="total-cart">
                        <p className='total-cart-text'>Total:</p>
                        <p className="total-cart-sum">{Number(post) + Number(paymentMethod) + Math.round(cards.reduce((sum, card) => sum + getPrice(card, course) * card.amount, 0) * 100) / 100} ₴</p>
                    </div>
                    <Divider style={{background:'darkgrey'}}/>
                    <Checkbox className='agree-terms' required>I have read and agree to the terms and conditions </Checkbox>
                    
                    <div className='submit-container'>
                        <button className='submit'>Submit</button>
                    </div>
                    
                </div>
            </div>
        </form>
      </div>
    );
}

export default Checkout;
