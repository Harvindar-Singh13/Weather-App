
import React, { useState } from "react";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const searchWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    try {
      setError("");

      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();

      setWeather(data);
    } catch (error) {
      setWeather(null);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-teal-800 flex items-center justify-center p-5">

      <div className="w-full max-w-420px min-h-500px p-8 sm:p-9 rounded-3xl text-white bg-white/10 border border-white/20 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.4)]">

        {/* Title */}
        <h1 className="text-center text-3xl font-bold tracking-wide text-teal-300 mb-8">
          Weather App
        </h1>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-2.5 mb-5">

          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border-none outline-none bg-white text-gray-900 placeholder-gray-500 text-sm"
          />

          <button
            onClick={searchWeather}
            className="px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm cursor-pointer transition duration-300 hover:-translate-y-0.5"
          >
            Search
          </button>

        </div>

        {/* Error */}
        {error && (
          <p className="text-center text-red-300 bg-red-500/15 px-3 py-2.5 rounded-lg mb-4">
            {error}
          </p>
        )}

        {/* Weather */}
        {weather && (
          <div className="text-center mt-6">

            {/* City */}
            <h2 className="text-3xl font-semibold mb-1">
              {weather.name}
            </h2>

            {/* Weather Icon */}
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="w-24 h-24 mx-auto"
            />

            {/* Temperature */}
            <div className="text-[65px] font-bold text-teal-300 my-2">
              {Math.round(weather.main.temp)}°C
            </div>

            {/* Description */}
            <p className="capitalize text-lg text-slate-300 mb-6">
              {weather.weather[0].description}
            </p>

            {/* Weather Details */}
            <div className="grid grid-cols-3 gap-2.5">

              {/* Feels Like */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15 hover:-translate-y-1 transition duration-300">

                <span className="text-2xl">
                  🌡️
                </span>

                <p className="text-xs text-slate-300 my-2">
                  Feels Like
                </p>

                <strong className="text-sm text-white">
                  {Math.round(weather.main.feels_like)}°C
                </strong>

              </div>

              {/* Humidity */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15 hover:-translate-y-1 transition duration-300">

                <span className="text-2xl">
                  💧
                </span>

                <p className="text-xs text-slate-300 my-2">
                  Humidity
                </p>

                <strong className="text-sm text-white">
                  {weather.main.humidity}%
                </strong>

              </div>

              {/* Wind */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15 hover:-translate-y-1 transition duration-300">

                <span className="text-2xl">
                  💨
                </span>

                <p className="text-xs text-slate-300 my-2">
                  Wind
                </p>

                <strong className="text-sm text-white">
                  {weather.wind.speed} m/s
                </strong>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default WeatherApp;
