import React, { useState } from "react";
import "./Weather.css";

export default function Temperature(props) {
  const [unit, setUnit] = useState("celsius");
  let degreeC = props.temp;
  let degreeF = Math.round((degreeC * 9) / 5 + 32);

  function showFahrenheit(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }

  function showCelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }

  if (unit === "celsius") {
    return (
      <div>
        <strong className="Temperature">{degreeC}</strong>
        <span className="units">
          <span>°C</span> |{" "}
          <a href="/" onClick={showFahrenheit}>
            °F
          </a>
        </span>
      </div>
    );
  } else {
    return (
      <div>
        <strong className="Temperature">{degreeF}</strong>
        <span className="units">
          <a href="/" onClick={showCelsius}>
            °C
          </a>{" "}
          | <span>°F</span>
        </span>
      </div>
    );
  }
}
