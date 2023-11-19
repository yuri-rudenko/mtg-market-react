import axios from "axios";

export async function defaultCards() {
    try {
        let cards = []
        let response = await axios.get('https://api.scryfall.com/cards/search?order=usd&q=e%3ARIX')
        let data = response.data
        cards = data.data
        
        while (data.has_more) {
            response = await axios.get(data.next_page)
            data = response.data
            cards = [...cards, ...data.data]
        }

        return cards
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error
    }
}
