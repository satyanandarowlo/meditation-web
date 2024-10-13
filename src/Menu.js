// Menu.js
import React, { useState } from "react";

const Menu = ({ user, setUser }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="menu-container">
      <button onClick={toggleMenu} className="menu-button">
        ☰
      </button>
      {isMenuOpen && (
        <div className="menu-dropdown">
          <a href="/profile">Profile</a>
          <a href="/about">About</a>
          <a href="/support">Support</a>
        </div>
      )}
    </div>
  );
};

export default Menu;
