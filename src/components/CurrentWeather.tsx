import React from 'react';
import './CurrentWeather.css';
import WeatherInfo from './WeatherInfo.tsx';
import { toCelcius } from './toCelcius.ts';
import { icons } from './icons.ts';
import Forecast from './Forecast.tsx';
import { Link } from 'react-router-dom';

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

interface ForecastItem {
  main: {
    temp_max: number;
    temp_min: number;
  };
  weather: Array<{
    icon: string;
  }>;
}

interface ForecastData {
  list: ForecastItem[];
}

interface CurrentWeatherProps {
  data: WeatherData | null;
  forecast: ForecastData | null;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, forecast }) => {
  const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const dayInAWeek = today.getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, 7).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const date = `${today.toLocaleDateString('en-US', options)}`;
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Link
        to='/weatherapp'
        style={{ textDecoration: 'none', marginTop: '50px' }}
      >
        <h3 style={{ color: 'rgb(191, 191, 212)' }}>Go to home</h3>
      </Link>
      <div className='city-card'>
        <div
          className='city-info'
          style={{
            background: `url(${icons[data?.weather[0].icon][1]})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <div className='city-day'>
            <h3 className='info'>
              {data?.name ?? 'Default name'},{' '}
              {data?.sys.country ?? 'Default country'}
            </h3>
            <p className='info' style={{ marginTop: '-20px' }}>
              {date}
            </p>
          </div>
          <div className='degree'>
            <div>
              <h1 className='info' style={{ textAlign: 'left' }}>
                {toCelcius(data?.main.temp)}°C
              </h1>
              <h3
                className='info'
                style={{ marginBottom: '10px', textAlign: 'left' }}
              >
                {toCelcius(data?.main.temp_min)}°C /{' '}
                {toCelcius(data?.main.temp_max)}°C
              </h3>
              <p
                className='info'
                style={{ marginTop: '-10px', textAlign: 'left' }}
              >
                {data?.weather[0].description}
              </p>
            </div>
            <div style={{ display: 'flex', alignSelf: 'flex-end' }}>
              <img src={icons[data?.weather[0].icon][0]} alt='Weather icon' />
            </div>
          </div>
        </div>
        <div
          style={{
            background: '#16161F',
            width: '365px',
            borderRadius: '8px',
            height: '227.31px',
          }}
        >
          <WeatherInfo data={data} />
        </div>
      </div>
      <div
        className='container'
        style={{
          background: '#16161F',
          borderRadius: '8px',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Forecast
          day={forecastDays[0]}
          iconNo={forecast?.list?.[0]?.weather?.[0]?.icon}
          tempMax={toCelcius(forecast?.list?.[0]?.main?.temp_max)}
          tempMin={toCelcius(forecast?.list?.[0]?.main?.temp_min)}
        />
        <Forecast
          day={forecastDays[1]}
          iconNo={forecast?.list?.[7]?.weather?.[0]?.icon}
          tempMax={toCelcius(forecast?.list?.[7]?.main?.temp_max)}
          tempMin={toCelcius(forecast?.list?.[7]?.main?.temp_min)}
        />
        <Forecast
          day={forecastDays[2]}
          iconNo={forecast?.list?.[15]?.weather?.[0]?.icon}
          tempMax={toCelcius(forecast?.list?.[15]?.main?.temp_max)}
          tempMin={toCelcius(forecast?.list?.[15]?.main?.temp_min)}
        />
        <Forecast
          day={forecastDays[3]}
          iconNo={forecast?.list?.[23]?.weather?.[0]?.icon}
          tempMax={toCelcius(forecast?.list?.[23]?.main?.temp_max)}
          tempMin={toCelcius(forecast?.list?.[23]?.main?.temp_min)}
        />
        <Forecast
          day={forecastDays[4]}
          iconNo={forecast?.list?.[31]?.weather?.[0]?.icon}
          tempMax={toCelcius(forecast?.list?.[31]?.main?.temp_max)}
          tempMin={toCelcius(forecast?.list?.[31]?.main?.temp_min)}
        />
      </div>
    </div>
  );
};

export default CurrentWeather;
