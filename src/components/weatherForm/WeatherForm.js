import { useFetchWeather } from "../../hooks/useFetchWeather";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import Weather from "../weather/Weather";

function WeatherForm() {
  const [location, setLocation] = useLocalStorage("", "location");
  const { isLoading, weather, country } = useFetchWeather(location);

  return (
    <>
      <h1>Weather app</h1>
      <div>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter your location..."
        />
      </div>
      {isLoading && <p className="loader">Loading...</p>}

      {weather.weathercode && (
        <Weather weather={weather} countryDetail={country} />
      )}
    </>
  );
}

export default WeatherForm;
