import React, { useState } from "react"

export default function Form({ weather, inputCity, setInputCity, fetchWeatherData }) {
  const handleChange = e => {
    setInputCity(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    fetchWeatherData(inputCity)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="city-container">
          <div className="label-input-container">
            <label htmlFor="city">City: </label>
            <input
              type="text"
              id="city"
              className="input"
              placeholder="Enter the name of the city"
              value={inputCity}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Search</button>
        </div>
      </form>

      {weather.location.city !== null ? (
        weather.temp_c && (
          <div className="weather-container">
            <p className="location">
              {weather.location.city}, {weather.location.country}
            </p>
            <p className="temp">{weather.temp_c} ºC</p>
            <p className="description">{weather.description}</p>
          </div>
        )
      ) : (
        <>
          <p>City not found</p>
        </>
      )}
    </>
  )
}
