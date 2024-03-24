import "./App.css";
import Welcome from "./components/Welcome";
import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./cityApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  const navigate = useNavigate();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleSearchChange = (data) => {
    const [latitude, longitude] = data.value.split(" ");
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/weatherapp"
          element={
            <>
              <header>
                <h1 style={{ color: "#FAFAFA", marginTop: "40px" }}>
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
          path="/:id"
          element={<CurrentWeather data={currentWeather} forecast={forecast} />}
        />
      </Routes>
    </div>
  );
}

export default App;
