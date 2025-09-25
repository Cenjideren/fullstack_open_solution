import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_KEY; 
// store your OpenWeather API key in .env as VITE_WEATHER_KEY=your_api_key

const CountrySearch = () => {
  const [query, setQuery] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  // Fetch all countries once
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((res) => setAllCountries(res.data))
      .catch((err) => console.error('Error fetching countries:', err));
  }, []);

  // Filter countries when query changes
  useEffect(() => {
    if (query.length === 0) {
      setFilteredCountries([]);
      setSelectedCountry(null);
      setWeather(null);
      return;
    }

    const matches = allCountries.filter((c) =>
      c.name.common.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredCountries(matches);

    if (matches.length !== 1) {
      setSelectedCountry(null);
      setWeather(null);
    }
  }, [query, allCountries]);

  // Fetch weather when a country is selected or only one match exists
  useEffect(() => {
    const country = selectedCountry || (filteredCountries.length === 1 && filteredCountries[0]);
    if (!country || !country.capital) return;

    const capital = country.capital[0];
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${capital}&appid=${API_KEY}`
      )
      .then((res) => setWeather(res.data))
      .catch((err) => console.error('Error fetching weather:', err));
  }, [selectedCountry, filteredCountries]);

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  const countryToShow = selectedCountry || (filteredCountries.length === 1 && filteredCountries[0]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="find countries"
      />

      {filteredCountries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {filteredCountries.length <= 10 &&
        filteredCountries.length > 1 &&
        !selectedCountry && (
          <ul>
            {filteredCountries.map((c) => (
              <li key={c.name.common}>
                {c.name.common}{' '}
                <button onClick={() => handleShowCountry(c)}>show</button>
              </li>
            ))}
          </ul>
        )}

      {countryToShow && (
        <div>
          <h2>{countryToShow.name.common}</h2>
          <p>Capital: {countryToShow.capital?.[0]}</p>
          <p>
            Area: {countryToShow.area} km<sup>2</sup>
          </p>
          <p>
            Languages: {Object.values(countryToShow.languages || {}).join(', ')}
          </p>
          <img
            src={countryToShow.flags.png}
            alt={`Flag of ${countryToShow.name.common}`}
            width="150"
          />

          {weather && (
            <div>
              <h3>Weather in {countryToShow.capital?.[0]}</h3>
              <p>Temperature: {weather.main.temp} °C</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <p>Wind: {weather.wind.speed} m/s</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CountrySearch;