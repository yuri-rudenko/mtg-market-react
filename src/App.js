import Cards from './Components/Cards/Cards';
import Header from './Components/Header/Header';
import { useCardData } from './Functions/useCardData.js';

function App() {

    const { cards, loading, setCards } = useCardData();

    return (
        <div>
            <Header onSearch={setCards} />
            <Cards data={cards} loading={loading} />
        </div>
    );
}

export default App;
