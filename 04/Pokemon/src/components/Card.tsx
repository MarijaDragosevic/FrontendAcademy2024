import { useState, useEffect } from 'react';
import axios from 'axios';
import './card.css';
import heartIcon from '../assets/heart2.png';
import heartIconActive from '../assets/full-heart.png';
import {Pokemon}  from '../Pokemon';


interface SpeciesResponse {
  flavor_text_entries: { language: { name: string }; version: { name: string }; flavor_text: string }[];
  // Define other properties as needed
}

interface CardProps {
  pokemon: Pokemon;
  addToFavorites: (pokemon: Pokemon) => void;
  removeFromFavorites: (pokemon: Pokemon) => void;
}

const Card: React.FC<CardProps> = ({ pokemon, addToFavorites, removeFromFavorites }) => {
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon | null>(null);
  const [isFavorite, setIsFavorite] = useState(false); // State to track whether the Pokémon is a favorite

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get<Pokemon>(pokemon.url);
        const pokemonData = response.data;

        const speciesResponse = await axios.get<SpeciesResponse>(pokemonData.species.url);
        const speciesData = speciesResponse.data;

        const flavorTextEntry = speciesData.flavor_text_entries.find((entry: { language: { name: string }; version: { name: string }; flavor_text: string }) =>
          entry.language.name === 'en' && entry.version.name === 'red'
        );

        const sanitizedFlavorText = flavorTextEntry ? flavorTextEntry.flavor_text.replace(/\f/g, ' ') : '';

        setPokemonDetails({
          ...pokemonData,
          flavorText: sanitizedFlavorText
        });
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    };

    fetchPokemonDetails();
  }, [pokemon.url]);

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const renderTypeSpans = () => {
    const typeColors: { [key: string]: string } = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      grass: '#78C850',
      electric: '#F8D030',
      ice: '#98D8D8',
      fighting: '#C03028',
      ground: '#E0C068',
      poison: '#A040A0',
      flying: '#A890F0',
      psychic: '#F85888',
      ghost: '#705898',
      steel: '#B8B8D0',
      fairy: '#F0B6BC',
      bug: '#1d7b15'
    };

    return pokemonDetails?.types.map((type) => (
      <span
        key={type.type.name}
        style={{
          backgroundColor: typeColors[type.type.name.toLowerCase()],
          color: 'var(--types-text-color)',

          borderRadius: '15px',
          marginRight: '4px',
          display: 'inline-block',
          minWidth: '68px',
          minHeight: '16px',
          textAlign: 'center',
          fontSize: '12px',
        }}
      >
        {capitalizeFirstLetter(type.type.name)}
      </span>
    ));
  };

  const renderGrayDivAndCard = (onLeft: boolean) => {
    const grayDivJSX = (
      <div className="gray-div">
        <img src={isFavorite ? heartIconActive : heartIcon} alt="heart-icon" className="heart-icon" onClick={() => {if (isFavorite) {
    removeFromFavorites(pokemon);
  } else {
    addToFavorites(pokemon);
  }
  setIsFavorite(!isFavorite);
}} />
        <img src={isFavorite ?pokemonDetails?.sprites.other['official-artwork'].front_shiny:pokemonDetails?.sprites.other['official-artwork'].front_default} alt="front_default" className="big-image" />
      </div>
    );

    const cardJSX = (
      <div className="card">
        <div className="title">
          #{pokemonDetails?.id.toString().padStart(4, '0')} {capitalizeFirstLetter(pokemonDetails?.name || '')}
        </div>
        <div className="stats-images-container">
          <div className="stats">
            <p className="variable">
              Health Points: <span className="value">{pokemonDetails?.stats[0].base_stat} HP</span>
            </p>
            <p className="variable">
              Height: <span className="value">{pokemonDetails?.height ? pokemonDetails.height * 10 : ''} cm</span>
            </p>
            <p className="variable">
              Weight: <span className="value">{pokemonDetails?.weight} kg</span>
            </p>
            <p className="variable">
              Type: <span className="value">{renderTypeSpans()}</span>
            </p>
            <p className="variable">
              Details: <span className="value">{pokemonDetails?.flavorText}</span>
            </p>
          </div>
          <div className="evolutions">
            <p className="variable">Full view:</p>
            <div className="evolutions-image-section">
              <img src={isFavorite? pokemonDetails?.sprites.front_shiny:pokemonDetails?.sprites.front_default} alt="front_default" className="rectangle" />
              <img src={isFavorite? pokemonDetails?.sprites.back_shiny:pokemonDetails?.sprites.back_default} alt="back_default" className="rectangle" />
            </div>
          </div>
        </div>
      </div>
    );

    return onLeft ? [grayDivJSX, cardJSX] : [cardJSX, grayDivJSX];
  };

  return <div className="container">{pokemonDetails && renderGrayDivAndCard(pokemonDetails.id % 2 === 1 /* For odd IDs */)}</div>;
};

export default Card;