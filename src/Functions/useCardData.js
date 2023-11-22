import { useState, useEffect } from 'react';
import { defaultCards } from './defaultCards.js';

export function useCardData() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return { cards, loading, setCards, setLoading };
}
