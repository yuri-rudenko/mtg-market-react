import axios from "axios";
import { defaultCards } from "./defaultCards";

function findCards(url, urlArr, setCards, setLoading) {
    let newUrl = url;

    for (let el in urlArr) {
        if (urlArr[el]) {
            if (newUrl[newUrl.length - 1] !== "+") {
                newUrl += "&q=";
            }
            newUrl += urlArr[el];
        }
    }

    console.log(newUrl)

    try {
        setLoading(true);
    
        if (newUrl === url) {
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
                
                return axios.get("https://api.scryfall.com/cards/search?order=usd&q=e%3ARIX")
            })
            .then((fallbackResponse) => {
                setCards(fallbackResponse.data.data)
            })
            .finally(() => {
                setLoading(false)
            });
    } catch (error) {
        console.log(error);
    }
    
}

export default findCards;
