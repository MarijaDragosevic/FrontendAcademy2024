import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Card from './components/Card'; 
import SettingsWindow from './components/SettingsWindow'; 
import Modal from './components/Modal'; 
import './App.css';
import './components/light-theme.css';
import './components/dark-theme.css';
import {Pokemon}  from './Pokemon';


function App(): JSX.Element {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string>('');
  const [observerElement, setObserverElement] = useState<HTMLDivElement | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [favorites, setFavorites] = useState<Pokemon[]>([]);
  const [favoritesOpen, setFavoritesOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
        const { results, next } = response.data;
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
  }, [nextPageUrl, observerElement]);

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

  const handleThemeChange = (selectedTheme: 'light' | 'dark') => {
    setTheme(selectedTheme);
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  const toggleFavoritesModal = () => {
    setFavoritesOpen(!favoritesOpen);
  };

  const addToFavorites = (pokemon: Pokemon) => {
    setFavorites((prevFavorites) => [...prevFavorites, pokemon]);
   
  };

  const removeFromFavorites = (pokemon: Pokemon) => {
    
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.url !== pokemon.url));
  };

  useEffect(() => {
    console.log('Favorites:', favorites);
  }, [favorites]);

  return (
    <div className={`App ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      <Header 
        toggleSettings={toggleSettings} 
        handleThemeChange={handleThemeChange} 
        settingsOpen={settingsOpen} 
        toggleFavoritesModal={toggleFavoritesModal} 
        favoritesOpen={favoritesOpen} 
      />
      <SettingsWindow 
        handleThemeChange={handleThemeChange}  
        settingsOpen={settingsOpen} 
      />
      <Modal isOpen={favoritesOpen} handleClose={toggleFavoritesModal} favorites={favorites}>
  <div>
    <h2>Favorites</h2>
    {favorites.map((fav) => (
      <div key={fav.id}>
        <p>{fav.name}</p>
        <button onClick={() => removeFromFavorites(fav)}>Remove</button>
      </div>
    ))}
  </div>
</Modal>
      <div className="card-container">
        {pokemons.map((pokemon, index) => (
          <div key={pokemon.id} ref={index === pokemons.length - 1 ? setObserverElement : null}>
            <Card pokemon={pokemon} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
