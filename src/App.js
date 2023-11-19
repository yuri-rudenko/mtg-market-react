import axios from "axios";
import { useState, useEffect } from "react";
import './App.css'

function App() {

  function getImageSrc(card) {
    if(card.image_uris !== undefined) return card.image_uris.border_crop
    if(card.card_faces !== undefined) return card.card_faces[0].image_uris.border_crop
  }

  function getPrice(card, dollar) {
    if(card.prices.usd !== null) return `${Math.floor(card.prices.usd * dollar * 100)/100} ₴`
    if(card.prices.usd_foil !== null) return `${Math.floor(card.prices.usd_foil * dollar * 100)/100} ₴`
    else return `-`
  }

  const [loading, setLoading] = useState(true)
  const [cards, setCards] = useState([]);
  let course = 36

  useEffect(() => {
    const fetchData = async () => {
      try {

        setLoading(true)

        let response = await axios.get('https://api.scryfall.com/cards/search?order=usd&q=e%3AXLN');
        let data = response.data;
        setCards(data.data);

        while (data.has_more) {
          response = await axios.get(data.next_page);
          data = response.data;
          setCards(prevCards => [...prevCards, ...data.data]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        setLoading(false); 
      }

      try {
        course = (await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/dollar_info?json')).data[0].rate
        console.log(course)
      }
      catch(error) {
        console.log(error)
      }
    };

    fetchData();
  }, []);

  console.log(cards);

  return (
    <div className="App">
      {loading ? ( 
        <h1>Loading</h1>
      ) : (
        cards.map(card => (
          <div className="card" key={card.id}>
            <img src={getImageSrc(card)} alt=""></img>
            <p className="price">{getPrice(card, course)}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
