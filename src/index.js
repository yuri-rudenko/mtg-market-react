import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const defaultState = {

      totalPrice: 0,
      amount: 0,
      cards: [],
}


const reducer = (state = defaultState, action) => {
      switch (action.type) {
            case "ADD_CARD":
                  const existingCard = state.cards.find(card => card.id === action.payload.card.id)
            
                  if (existingCard) {
                   
                        return {
                              ...state,
                              cards: state.cards.map(card =>
                              card.id === action.payload.card.id
                                  ? { ...card, amount: card.amount + action.payload.card.amount }
                                  : card
                              ),
                              amount: state.amount + action.payload.card.amount,
                        }
                  } 
                  else {

                        return {
                              ...state,
                              cards: [...state.cards, action.payload.card],
                              amount: state.amount + action.payload.card.amount,
                        }
                  }

            default:
          return state;
      }
}

const store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <Provider store={store}>
            <App />
      </Provider>
); 

