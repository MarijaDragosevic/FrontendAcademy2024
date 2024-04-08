import { useEffect } from 'react';
import './Modal.css';
import { Pokemon } from '../Pokemon';
import PokemonLiked from './PokemonLiked';


interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  favorites: Pokemon[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, handleClose, favorites }) => {
  useEffect(() => {
    console.log('Favorites updated:', favorites.length);
    // Perform any additional actions here based on the updated favorites
  }, [favorites]);

  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-scroll">
            {favorites.length=== 0 ? (
                    <p>You don't have any liked pokemons.</p>
                ) : (

                  <div className="pokemon-grid">
                  {favorites.map((pokemon) => (
                    <PokemonLiked key={pokemon.url} pokemon={pokemon} favorites={favorites} />
                  ))}
                </div>
                )}
             
            </div>
           
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
