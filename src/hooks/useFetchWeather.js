import { useState, useEffect } from "react";
import { convertToFlag } from "./helpers";

export function useFetchWeather(location) {
  const [country, setCountry] = useState("");
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchWeather() {
      if (!location || location.length < 2) {
        return setWeather({});
      }

      try {
        setIsLoading(true);
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${location}`,
          { signal: controller.signal }
        );
        const geoData = await geoRes.json();
        console.log(geoData);

        if (!geoData.results) throw new Error("Location not found");

        const { latitude, longitude, timezone, name, country_code } =
          geoData.results.at(0);

        setCountry(`${name} ${convertToFlag(country_code)}`);

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`,
          { signal: controller.signal }
        );

        const weatherData = await weatherRes.json();
        setWeather(weatherData.daily);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeather();

    return () => {
      controller.abort();
    };
  }, [location]);

  return { country, weather, isLoading };
}
