// App.js
import React, { useState } from "react";
import Meditation from "./meditation/Meditation";
import Menu from "./Menu";
import "./App.css";
import "./protection/protect";

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
