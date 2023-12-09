import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cards from './Components/Cards/Cards';
import Header from './Components/Header/Header';
import { useCardData } from './Functions/useCardData.js';
import Selector from './Components/Selector/Selector';
import axios from 'axios';
import getCourse from './Functions/getCourse';
import Checkout from './Components/Checkout/Checkout';
import Item from './Components/Item/Item';

function App() {
    const { cards, loading, setCards, setLoading } = useCardData()
    const course = getCourse()

    const [urlArr, setUrlArr] = useState({
        name:'',
        order: '',
        value:'',
        sets:'',
        colors:'',
        types:'',
        subtypes:'',
        formats:'',
        page:'',
        show:'',
    })

    const [selectedPage, setSelectedPage] = useState(1)

    return (
        <Router basename="/mtg-market-react">
            <div className='App'>
                <Header course={course} onSearch={setCards} setLoading={setLoading} />
                <Routes>
                    <Route path='/shop/*' element={
                        <div className='bottom'>
                            <Selector setSelectedPage={setSelectedPage} urlArr={urlArr} setUrlArr={setUrlArr} cards={cards} setCards={setCards} setLoading={setLoading} course={course}/>
                            <Cards selectedPage={selectedPage} setSelectedPage={setSelectedPage} setUrlArr={setUrlArr} data={cards} loading={loading} course={course}/>
                        </div>
                    } />
                    <Route path = '/checkout' element={

                        <Checkout course={course}></Checkout>

                    }></Route>

                    <Route path="/item/:id" element={
                        <Item course={course} />
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
