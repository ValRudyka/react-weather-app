import { formatDay, getWeatherIcon } from "../../helpers/helpers";

function Weather({
  weather: {
    time,
    weathercode,
    temperature_2m_max: maxTemp,
    temperature_2m_min: minTemp,
  },
  countryDetail,
}) {
  return (
    <>
      <h2>Weather for {countryDetail}</h2>
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

function Day({ maxTemp, minTemp, isToday, time, code }) {
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

export default Weather;
