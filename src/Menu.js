// Menu.js
import React, { useState } from "react";
import Auth from "./Auth";

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
          <Auth user={user} setUser={setUser} />
          <a href="/profile">Profile</a>
          <a href="/about">About</a>
          <a href="/support">Support</a>
        </div>
      )}
    </div>
  );
};

export default Menu;
