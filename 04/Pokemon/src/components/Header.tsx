/*import React, { useState } from 'react';*/
import heartIcon from "../assets/heart.png";
import pokeIcon from "../assets/logo.png";
import settingsIcon from "../assets/settings.png";
import SettingsWindow from './SettingsWindow'; // Import the SettingsWindow component
import './Header.css';


interface HeaderProps {
  toggleSettings: () => void;
  handleThemeChange: (selectedTheme: 'light' | 'dark') => void;
  settingsOpen: boolean; // Define isOpen prop here
}

export default function Header({ toggleSettings, handleThemeChange,settingsOpen  }: HeaderProps) {
    return (
        <header className="header">
            <img src={heartIcon} alt="heart-icon" className="header-icon" />
            <div className="header-middle">
                <img src={pokeIcon} alt="poke-icon" className="header-icon" />
                <div className="header-title">POKEDEX</div>
            </div>
            {/* Call toggleSettings directly when clicking on settings icon */}
            <img src={settingsIcon} alt="settings-icon" className="header-icon right" onClick={toggleSettings} />

            {/* Render SettingsWindow */}
            {/* No need to pass handleThemeChange here */}
            <SettingsWindow  settingsOpen={settingsOpen} handleThemeChange={handleThemeChange} />
        </header>
    );
}
