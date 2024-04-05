import { useEffect } from 'react';
import './Modal.css';
import {Pokemon}  from '../Pokemon';


interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  favorites: Pokemon[];

}

const Modal: React.FC<ModalProps> = ({ isOpen, handleClose,favorites }) => {
    useEffect(() => {
        console.log('Favorites updated:', favorites);
        // Perform any additional actions here based on the updated favorites
      }, [favorites]);

      const firstFavorite = favorites && favorites.length > 0 ? favorites[0] : null;
      console.log('firstFavorite:', firstFavorite?.name);
  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h1>{firstFavorite?.name} </h1>
            <h1>bla</h1>
            <h1>bla</h1>
            <h1>bla</h1>
            <h1>ahha</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
