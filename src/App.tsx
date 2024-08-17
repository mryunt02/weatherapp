import React from 'react';
import './App.css';
import Welcome from './components/Welcome.tsx';
import Search from './components/Search.tsx';
import CurrentWeather from './components/CurrentWeather';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WEATHER_API_URL, WEATHER_API_KEY } from './cityApi.ts';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function App() {
  const navigate = useNavigate();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSearchChange = (data) => {
    const [latitude, longitude] = data.value.split(' ');
    const currentWeather = axios.get(
      `${WEATHER_API_URL}weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`
    );
    const forecast = axios.get(
      `${WEATHER_API_URL}forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`
    );
    Promise.all([currentWeather, forecast])
      .then((response) => {
        const weatherResponse = response[0].data;
        const forecastResponse = response[1].data;
        setCurrentWeather({ city: data.label, ...weatherResponse });
        setForecast({ city: data.label, ...forecastResponse });
        navigate(`/${weatherResponse.name}`);
        setErrorMessage(null);
      })
      .catch((error) => {
        console.error('Error:', error);
        if (error.response && error.response.status === 429) {
          setErrorMessage(
            'You have exceeded the number of requests allowed by the API. Please try again later.'
          );
        } else {
          setErrorMessage(
            'An error occurred while fetching data. Please try again later.'
          );
        }
      });
  };

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/weatherapp'
          element={
            <>
              <header>
                <h1 style={{ color: '#FAFAFA', marginTop: '40px' }}>
                  iWeather
                </h1>
              </header>
              <Welcome />
              <Search onSearch={handleSearchChange} />
            </>
          }
        />

        {/* Add this line if you want a specific component for the root path */}
        <Route
          path='/:id'
          element={<CurrentWeather data={currentWeather} forecast={forecast} />}
        />
      </Routes>
      {errorMessage && (
        <div style={{ marginTop: '20px' }}>
          <p style={{ color: '#FAFAFA' }}>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default App;
