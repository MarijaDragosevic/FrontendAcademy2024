import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Card from './components/Card'; 
import axios from 'axios';

interface Pokemon {
  id: number;
  name: string;
  url: string;
}

function App(): JSX.Element {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string>('');
  const [observerElement, setObserverElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
        const { results, next } = response.data;
        console.log(results)
        setPokemons(results);
        setNextPageUrl(next || '');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!nextPageUrl) return;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchMorePokemons();
      }
    }, options);

    if (observerElement) {
      observer.observe(observerElement);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, );

  const fetchMorePokemons = async () => {
    try {
      const response = await axios.get(nextPageUrl);
      const { results, next } = response.data;
      setPokemons((prevPokemons) => [...prevPokemons, ...results]);
      setNextPageUrl(next || '');
    } catch (error) {
      console.error('Error fetching more pokemons:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="card-container">
        {pokemons.map((pokemon, index) => {
          if (index === pokemons.length - 1) {
            return (
              <div key={pokemon.id} ref={setObserverElement}>
                <Card pokemon={pokemon} />
              </div>
            );
          } else {
            return <Card key={pokemon.id} pokemon={pokemon} />;
          }
        })}
      </div>
    </>
  );
}

export default App;
