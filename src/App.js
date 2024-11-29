import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState("Toronto");

    const API_KEY = "bf8d41aa57d4c258e497f548ffbded82";

    const fetchWeatherData = async (city) => {
        try {
            const response = await fetch(
                `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch weather data");
            }
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    useEffect(() => {
        fetchWeatherData(city);
    }, [city]);

    return (
        <div className="weather-app">
            <h1>Weather</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={() => fetchWeatherData(city)}>Search</button>
            </div>
            {weatherData && (
                <div className="weather-info">
                    <h2>{weatherData.name}</h2>
                    <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
                    <p>Condition: {weatherData.weather[0].description}</p>
                    <img
                        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt="weather icon"
                    />
                </div>
            )}
        </div>
    );
}

export default App;


