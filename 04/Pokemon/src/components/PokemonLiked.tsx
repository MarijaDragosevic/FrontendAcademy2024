import React, { useEffect, useState } from 'react';
import './PokemonLiked.css';
import { Pokemon } from '../Pokemon';
import heartIconActive from '../assets/full-heart.png';
import heartIcon from '../assets/heart2.png';
import axios from 'axios';

interface PokemonLikedProps {
    pokemon: Pokemon | null;
    favorites: Pokemon[]; // Array of favorite Pokemons
}

function PokemonLiked({ pokemon,favorites }: PokemonLikedProps) {
    const [pokemonDetails, setPokemonDetails] = useState<Pokemon | null>(null);
    const [pokemonImage, setPokemonImage] = useState<string>('');
    const [isFavorite, setIsFavorite] = useState<boolean>(true);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            if (pokemon) {
                try {
                    const response = await axios.get(pokemon.url);
                    setPokemonDetails(response.data);
                } catch (error) {
                    console.error('Error fetching Pokemon details:', error);
                }
            }
        };

        fetchPokemonDetails();
    }, [pokemon]);

    useEffect(() => {
        if (pokemonDetails) {
            // Extract necessary details like ID and name
            // Set Pokemon image
            const pokemonImage = pokemonDetails.sprites.other['official-artwork'].front_shiny || '';

            const isFavorite = favorites.some((fav) => fav.id === pokemonDetails.id);

            // Update state
            setPokemonImage(pokemonImage);
            setIsFavorite(isFavorite);
        }
    }, [pokemonDetails]);

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleFavoriteClick = () => {
        // Toggle favorite status
      
        setIsFavorite(!isFavorite); // Toggle favorite status
    };
    return (
        <div className="liked-pokemons-card">
            {pokemonDetails && (
                <div className="pokemon-item">
                    <img className="heart-icon" src={isFavorite ?heartIcon :  heartIconActive} alt='Liked' onClick={handleFavoriteClick} />
                    {pokemonImage && (
                        <img src={pokemonImage} alt="Pokemon" className='big-image' />
                    )}
                    <div className="title">
                        #{pokemonDetails.id.toString().padStart(4, '0')} {capitalizeFirstLetter(pokemonDetails.name || '')}
                    </div>
                   
                </div>
            )}
        </div>
    );
}

export default PokemonLiked;
