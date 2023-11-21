import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cards from './Components/Cards/Cards';
import Header from './Components/Header/Header';
import { useCardData } from './Functions/useCardData.js';
import Selector from './Components/Selector/Selector';

function App() {
    const { cards, loading, setCards, setLoading } = useCardData();

    return (
        <Router>
            <div className='App'>
                <Header onSearch={setCards} setLoading={setLoading} />
                <Routes>
                    <Route path='mtg-market-react/shop/*' element={
                        <div className='bottom'>
                            <Selector setCards={setCards} setLoading={setLoading}/>
                            <Cards data={cards} loading={loading} />
                        </div>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
