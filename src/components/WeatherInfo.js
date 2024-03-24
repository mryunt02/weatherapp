import React from "react";
import Infos from "./Infos";
import { toCelcius } from "./toCelcius";

const WeatherInfo = ({ data }) => {
  return (
    <div>
      <Infos info="thermostat" about="Thermal sensation" isLine={true}>
        {toCelcius(data?.main.feels_like)}°C
      </Infos>
      <Infos info="thunderstorm" about="Probability of rain" isLine={true}>
        {data?.clouds.all}%
      </Infos>
      <Infos info="air" about="Wind speed" isLine={true}>
        {data?.wind.speed} km/h
      </Infos>
      <Infos info="humidity_low" about="Air humidity" isLine={true}>
        {data?.main.humidity}%
      </Infos>
      <Infos info="compress" about="Pressure" isLine={false}>
        {data?.main.pressure} hPa
      </Infos>
    </div>
  );
};

export default WeatherInfo;
