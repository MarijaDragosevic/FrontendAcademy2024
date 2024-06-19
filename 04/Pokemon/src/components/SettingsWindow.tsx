import React from 'react';
import './SettingsWindow.css';


interface SettingsWindowProps {
  handleThemeChange: (selectedTheme: 'light' | 'dark') => void;
  settingsOpen: boolean;
 
}

const SettingsWindow: React.FC<SettingsWindowProps> = ({ handleThemeChange,  settingsOpen }) => {

  return (
    <div className={`settings-container ${ settingsOpen ? 'open' : ''}`}>
      <div className="settings-dropdown">
        <p>Theme</p>
        <div className="theme-options">
       
          <label>
            <input
              type="radio"
              name="theme"
              value="light"
              onChange={() =>  handleThemeChange('light')}
             
            />
            Light 
          </label>
          <label>
            <input
              type="radio"
              name="theme"
              value="dark"
              onChange={() =>  handleThemeChange('dark')}
        
            />
            Dark 
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsWindow;
