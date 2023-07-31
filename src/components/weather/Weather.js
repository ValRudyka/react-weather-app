import React from "react";
import { formatDay, getWeatherIcon } from "../../helpers";

class Weather extends React.Component {
  render() {
    const {
      time,
      weathercode,
      temperature_2m_max: maxTemp,
      temperature_2m_min: minTemp,
    } = this.props.weather;

    return (
      <>
        <h2>Weather for {this.props.countryDetail}</h2>
        <ul className="weather">
          {maxTemp.map((temp, i) => (
            <Day
              key={temp}
              maxTemp={temp}
              minTemp={minTemp[i]}
              time={time[i]}
              code={weathercode[i]}
              isToday={i === 0}
            />
          ))}
        </ul>
      </>
    );
  }
}

class Day extends React.Component {
  render() {
    const { maxTemp, minTemp, isToday, time, code } = this.props;
    return (
      <li className="day">
        <span>{getWeatherIcon(code)}</span>
        <p>{isToday ? "Today" : formatDay(time)}</p>
        <p>
          {Math.floor(minTemp)}&deg; &mdash; {Math.ceil(maxTemp)}&deg;
        </p>
      </li>
    );
  }
}

export default Weather;
