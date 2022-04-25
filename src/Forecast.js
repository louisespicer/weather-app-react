import React, { useState, useEffect } from "react";
import WeatherIcon from "./WeatherIcon";
import axios from "axios";
import "./Weather.css";

export default function Forecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  useEffect(() => {
    setLoaded(false);
  }, [props.coord]);

  function displayForecast(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }

  function loadData() {
    let lon1 = props.coord.lon;
    let lat1 = props.coord.lat;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat1}&lon=${lon1}&appid=4884059c1a2f6653c04d553890063a37&units=metric`;

    axios.get(apiUrl).then(displayForecast);
  }

  if (loaded) {
    return (
      <div className="Forecast">
        <div className="row">
          {forecast.map(function (daily, index) {
            function formatDay() {
              let date = new Date(daily.dt * 1000);
              let day = date.getDay();
              let week = [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun",
              ];

              return week[day];
            }

            if (index < 5) {
              return (
                <div className="col p-0 mt-4" key={index}>
                  <div className="ForecastDate">{formatDay()}</div>
                  <div className="ForecastIcon">
                    {" "}
                    <WeatherIcon code={daily.weather[0].icon} size={40} />
                  </div>
                  <div className="ForecastTemp">
                    <span className="Forcast-max-temp me-2">
                      {Math.round(daily.temp.max)}°
                    </span>
                    <span className="Forcast-min-temp opacity-50">
                      {Math.round(daily.temp.min)}°
                    </span>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else {
    loadData();
    return null;
  }
}
