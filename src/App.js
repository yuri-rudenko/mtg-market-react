import Cards from './Components/Cards/Cards';
import Header from './Components/Header/Header';
import { useCardData } from './Functions/useCardData.js';
import Selector from './Components/Selector/Selector';

function App() {

    const { cards, loading, setCards, setLoading } = useCardData();

    return (
        <div className='App'>
            <Header onSearch={setCards} setLoading={setLoading} />
            <div className='bottom'>
                <Selector setCards={setCards} setLoading={setLoading}/>
                <Cards data={cards} loading={loading} />
            </div>
        </div>
    );
}

export default App;
