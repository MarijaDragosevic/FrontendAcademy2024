import React, { useState } from 'react';
import heartIcon from "../assets/heart.png";
import pokeIcon from "../assets/logo.png";
import settingsIcon from "../assets/settings.png";
import SettingsWindow from './SettingsWindow'; // Import the SettingsWindow component


export default function Header() {
    const [settingsOpen, setSettingsOpen] = useState(false);

    const toggleSettings = () => {
        setSettingsOpen(!settingsOpen);
    };

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
            <SettingsWindow toggleSettings={toggleSettings} isOpen={settingsOpen} />
        </header>
    );
}
