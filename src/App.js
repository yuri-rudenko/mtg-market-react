import Cards from './Components/Cards/Cards';
import Header from './Components/Header/Header';
import { useCardData } from './Functions/useCardData.js';

function App() {

    const { cards, loading, setCards, setLoading } = useCardData();

    return (
        <div>
            <Header onSearch={setCards} setLoading={setLoading} />
            <Cards data={cards} loading={loading} />
        </div>
    );
}

export default App;
