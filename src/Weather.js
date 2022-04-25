import React, { useState } from "react";
import axios from "axios";
import FormatDate from "./FormatDate";
import "./Weather.css";
import WeatherIcon from "./WeatherIcon";
import Temperature from "./Temperature";
import Forecast from "./Forecast";

function Weather() {
  const [city, setCity] = useState("London");
  const [weatherData, setWeatherData] = useState({ ready: false });

  function changeData(response) {
    setWeatherData({
      ready: true,
      city: response.data.name,
      date: response.data.dt * 1000,
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: Math.round(response.data.wind.speed),
      icon: response.data.weather[0].icon,
      coordinates: response.data.coord,
    });
  }

  // useEffect(() => {
  //   function defaultCity(city1) {
  //     let urlDefault = `https://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=4884059c1a2f6653c04d553890063a37&units=metric`;
  //     axios.get(urlDefault).then(changeData);
  //   }

  //   defaultCity("Paris");
  //   //handle Weather function after first render
  // }, []);

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function changeCity(event) {
    setCity(event.target.value);
  }

  function search() {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4884059c1a2f6653c04d553890063a37&units=metric`;
    axios.get(url).then(changeData);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form className="mb-3" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Change your location"
                className="form-control"
                autoComplete="off"
                onChange={changeCity}
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-secondary w-100"
              />
            </div>
          </div>
        </form>
        <div className="current-city">
          <h1>{weatherData.city}</h1>
          <ul>
            <li>
              <FormatDate dateString={weatherData.date} />
            </li>
            <li className="text-capitalize">{weatherData.description}</li>
          </ul>
        </div>
        <div className="row">
          <div className="col-7">
            <div className="d-flex align-end">
              <div className="float-left me-3 ms-4 mt-3">
                <WeatherIcon code={weatherData.icon} size={60} />
              </div>
              <span className="mh-100">
                <Temperature temp={weatherData.temperature} />
              </span>
            </div>
          </div>
          <div className="col-5 mt-1">
            <ul>
              <li>Humidity: {weatherData.humidity}%</li>
              <li>Wind: {weatherData.wind} km/h</li>
            </ul>
          </div>
        </div>
        <Forecast coord={weatherData.coordinates} />
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}

export default Weather;
