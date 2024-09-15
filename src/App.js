// App.js
import React, { useState } from "react";
import Meditation from "./Meditation";
import Menu from "./Menu";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div className="app-container">
      <Menu user={user} setUser={setUser} />
      <Meditation user={user} />
    </div>
  );
};

export default App;
