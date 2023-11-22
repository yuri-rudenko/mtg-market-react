import axios from "axios";
import { defaultCards } from "./defaultCards";
import { useNavigate } from "react-router-dom";

function findCards(params, setCards, setLoading) {

    const newUrl = 'https://api.scryfall.com/cards/search?order=usd&q=' + params

    try {
        setLoading(true);
    
        if (newUrl === '/') {
            axios.get("https://api.scryfall.com/cards/search?order=usd&q=e%3ARIX")
                .then((response) => {
                    setCards(response.data.data)
                })
                .finally(() => {
                    setLoading(false)
                });
            return;
        }
    
        axios.get(newUrl)
            .then((response) => {
                setCards(response.data.data)
            })
            .catch((error) => {
                axios.get("https://api.scryfall.com/cards/search?order=usd&q=e%3ARIX")
                    .then(response => setCards(response.data.data))
            })
            .finally(() => {
                setLoading(false)
            });
    } catch (error) {
        console.log(error);
    }
    
}

export default findCards;
