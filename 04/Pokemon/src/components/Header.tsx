import { useState, useEffect } from 'react';
import heartIcon from "../assets/heart.png";
import pokeIcon from "../assets/logo.png";
import settingsIcon from "../assets/settings.png";
import settingsActiveIcon from "../assets/selected-settings.png"; // Import active settings icon
import heartActiveIcon from "../assets/selected-heart.png"; // Import active heart icon
import SettingsWindow from './SettingsWindow'; // Import the SettingsWindow component
import './Header.css';
import Modal from './Modal'; // Import the Modal component

interface HeaderProps {
  toggleSettings: () => void;
  handleThemeChange: (selectedTheme: 'light' | 'dark') => void;
  settingsOpen: boolean;
  toggleFavoritesModal: () => void;
  favoritesOpen: boolean;
}

export default function Header({ toggleSettings, handleThemeChange, settingsOpen, toggleFavoritesModal, favoritesOpen }: HeaderProps) {
  const [isHeartActive, setIsHeartActive] = useState(false); // State for heart icon active status
  const [isSettingsActive, setIsSettingsActive] = useState(false); // State for settings icon active status

  // Function to handle heart icon click
  const handleHeartClick = () => {
    toggleFavoritesModal();
    setIsHeartActive(!isHeartActive); // Toggle heart icon active status
  };

  // Function to handle settings icon click
  const handleSettingsClick = () => {
    toggleSettings();
    setIsSettingsActive(!isSettingsActive); // Toggle settings icon active status
  };

  // Listen for changes in favoritesOpen prop and reset heart icon active status when modal is closed
  useEffect(() => {
    if (!favoritesOpen) {
      setIsHeartActive(false);
    }
  }, [favoritesOpen]);

  // Determine heart icon source based on active status
  const heartSrc = isHeartActive ? heartActiveIcon : heartIcon;

  // Determine settings icon source based on active status
  const settingsSrc = isSettingsActive ? settingsActiveIcon : settingsIcon;

  return (
    <header className="header">
      <img src={heartSrc} alt="heart-icon" className="header-icon" onClick={handleHeartClick} />
      <div className="header-middle">
        <img src={pokeIcon} alt="poke-icon" className="header-icon" />
        <div className="header-title">POKEDEX</div>
      </div>
      {/* Render the Modal component for displaying favorites */}
      <Modal isOpen={favoritesOpen} handleClose={toggleFavoritesModal}></Modal>

      {/* Render SettingsWindow */}
      {/* No need to pass handleThemeChange here */}
      <SettingsWindow settingsOpen={settingsOpen} handleThemeChange={handleThemeChange} />
      {/* Call handleSettingsClick when clicking on settings icon */}
      <img src={settingsSrc} alt="settings-icon" className="header-icon right" onClick={handleSettingsClick} />
    </header>
  );
}
