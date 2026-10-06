
import React, { useState } from "react";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchWeather = async (e) => {
    e.preventDefault();

    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("City not found");
      }

      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-800 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-lg rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl p-5 sm:p-8 text-white shadow-2xl">

        {/* Title */}
        <h1 className="text-center text-3xl sm:text-4xl font-bold text-teal-300 mb-7">
          Weather App
        </h1>

        {/* Search */}
        <form
          onSubmit={searchWeather}
          className="flex flex-col sm:flex-row gap-3 mb-5"
        >
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-white text-gray-900 outline-none placeholder-gray-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 font-semibold transition disabled:opacity-60"
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </form>

        {/* Error */}
        {error && (
          <p className="text-center text-red-300 bg-red-500/10 rounded-lg px-3 py-2 mb-5">
            {error}
          </p>
        )}

        {/* Weather */}
        {weather && (
          <div className="text-center">

            <h2 className="text-2xl sm:text-3xl font-semibold">
              {weather.name}
            </h2>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt={weather.weather[0].description}
              className="w-28 h-28 sm:w-32 sm:h-32 mx-auto"
            />

            <div className="text-6xl sm:text-7xl font-bold text-teal-300">
              {Math.round(weather.main.temp)}°C
            </div>

            <p className="capitalize text-slate-300 mt-3">
              {weather.weather[0].description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-7">

              <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                <div className="text-2xl">🌡️</div>
                <p className="text-sm text-slate-400 mt-2">
                  Feels Like
                </p>
                <p className="font-semibold mt-1">
                  {Math.round(weather.main.feels_like)}°C
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                <div className="text-2xl">💧</div>
                <p className="text-sm text-slate-400 mt-2">
                  Humidity
                </p>
                <p className="font-semibold mt-1">
                  {weather.main.humidity}%
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                <div className="text-2xl">💨</div>
                <p className="text-sm text-slate-400 mt-2">
                  Wind
                </p>
                <p className="font-semibold mt-1">
                  {weather.wind.speed} m/s
                </p>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default WeatherApp;
