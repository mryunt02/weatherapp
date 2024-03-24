import "./CurrentWeather.css";
import WeatherInfo from "./WeatherInfo";
import { toCelcius } from "./toCelcius";
import { icons } from "./icons";
import Forecast from "./Forecast";
import { Link } from "react-router-dom";

function CurrentWeather({ data, forecast }) {
  console.log(data);

  const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const dayInAWeek = today.getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, 7).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date = `${today.toLocaleDateString("en-US", options)}`;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Link
        to="/weatherapp"
        style={{ textDecoration: "none", marginTop: "50px" }}
      >
        {" "}
        <h3 style={{ color: "rgb(191, 191, 212)" }}>Go to home</h3>
      </Link>
      <div className="city-card">
        <div className="city-info">
          <div className="city-day">
            <h3 className="info">
              {data?.name}, {data?.sys.country}
            </h3>
            <p className="info" style={{ marginTop: "-20px" }}>
              {date}
            </p>
          </div>
          <div className="degree">
            <div>
              <h1 className="info" style={{ textAlign: "left" }}>
                {toCelcius(data?.main.temp)}°C
              </h1>
              <h3
                className="info"
                style={{ marginBottom: "10px", textAlign: "left" }}
              >
                {toCelcius(data?.main.temp_min)}°C /{" "}
                {toCelcius(data?.main.temp_max)}°C
              </h3>
              <p
                className="info"
                style={{ marginTop: "-10px", textAlign: "left" }}
              >
                {data?.weather[0].description}
              </p>
            </div>
            <div style={{ display: "flex", alignSelf: "flex-end" }}>
              <img src={icons[data?.weather[0].icon]} alt="Weather icon" />
            </div>
          </div>
        </div>
        <div
          style={{
            background: "#16161F",
            width: "365px",
            borderRadius: "8px",
            height: "227.31px",
          }}
        >
          <WeatherInfo data={data} />
        </div>
      </div>
      <div
        className="container"
        style={{
          background: "#16161F",
          borderRadius: "8px",
          margin: "auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
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
}

export default CurrentWeather;
