import React from 'react';
import './SettingsWindow.css'; // Import CSS file for styling

const SettingsWindow = ({ toggleSettings, handleThemeChange, isOpen }) => {
  // No need for local state to track isOpen

  return (
    <div className={`settings-container ${isOpen ? 'open' : ''}`}>
      {/* No need for settings button */}
      <div className="settings-dropdown">
        <p>Theme</p>
        <div className="theme-options">
          <label>
            <input
              type="radio"
              name="theme"
              value="light"
              onChange={() => handleThemeChange('light')}
            />
            Light 
          </label>
          <label>
            <input
              type="radio"
              name="theme"
              value="dark"
              onChange={() => handleThemeChange('dark')}
            />
            Dark 
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsWindow;
