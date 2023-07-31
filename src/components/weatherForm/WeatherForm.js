import React from "react";

import { convertToFlag } from "../../helpers";

class WeatherForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "",
    };

    this.fetchWeather = this.fetchWeather.bind(this);
  }

  async fetchWeather() {
    if (!this.state.location) {
      return;
    }

    try {
      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      console.log(`${name} ${convertToFlag(country_code)}`);

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      console.log(weatherData.daily);
    } catch (err) {
      console.err(err);
    }

    console.log(this);
  }

  render() {
    const { location } = this.state;

    return (
      <>
        <h1>Weather app</h1>
        <div>
          <input
            type="text"
            value={location}
            onChange={(e) => this.setState({ location: e.target.value })}
            placeholder="Enter your location..."
          />
        </div>
        <button onClick={this.fetchWeather}>Get weather</button>
      </>
    );
  }
}

export default WeatherForm;
