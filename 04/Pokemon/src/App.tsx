import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Card from './components/Card'; 
import SettingsWindow from './components/SettingsWindow'; 
import axios from 'axios';
import './components/light-theme.css'; // Import the light theme
import './components/dark-theme.css'; // Import the light theme
interface Pokemon {
  id: number;
  name: string;
  url: string;
  height: number;
  weight: number;
  sprites: { front_default: string, back_default: string, other: { 'official-artwork': { front_default: string } } };
  stats: { base_stat: number }[];
  types: { type: { name: string } }[];
  flavorText: string;
  species: { url: string };
}

function App(): JSX.Element {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string>('');
  const [observerElement, setObserverElement] = useState<HTMLDivElement | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [settingsOpen, setSettingsOpen] = useState(false); // Define settingsOpen state

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
    setTheme(selectedTheme); // Update the theme in App component
    console.log('Selected theme:', selectedTheme); // Log the selected theme
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen); // Toggle settingsOpen state
  };

  return (
    <div className={`App ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      <Header toggleSettings={toggleSettings} handleThemeChange={handleThemeChange} settingsOpen={settingsOpen} />
      {/* Pass isOpen and handleThemeChange to SettingsWindow */}
      <SettingsWindow handleThemeChange={handleThemeChange}  settingsOpen={settingsOpen} />
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
    </div>
  );
}

export default App;
