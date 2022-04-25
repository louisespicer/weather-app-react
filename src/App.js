import React from "react";
import "./App.css";
import Weather from "./Weather";

function App() {
  return (
    <div className="container">
      <Weather />
      <div className="footer">
        <a
          href="https://github.com/louisespicer/weather-app-react.git"
          target="_blank"
          rel="noreferrer"
        >
          Open-source code
        </a>{" "}
        by Louise Spicer
      </div>
    </div>
  );
}

export default App;
