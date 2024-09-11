import { useEffect, useState } from "react"

const API_KEY = "67899c4d78mshf7fde87ff9a2439p152bcbjsn275ef1e00b04"
const API_HOST = "weatherapi-com.p.rapidapi.com"

export default function useWeather() {
  const [inputCity, setInputCity] = useState("")
  const [weather, setWeather] = useState({
    description: "",
    temp_c: "",
    location: {
      country: "",
      city: "",
    },
  })

  const fetchWeatherData = async inputCity => {
    try {
      const URL = `https://weatherapi-com.p.rapidapi.com/current.json?q=${inputCity}`
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": API_HOST,
        },
      }

      const response = await fetch(URL, options)
      const result = await response.json()
      console.log(result)

      if (result && result.current) {
        setWeather({
          description: result.current.condition.text,
          temp_c: result.current.temp_c,
          location: {
            country: result.location.country,
            city: result.location.name,
          },
        })
      } else {
        setWeather(prevW => ({
          ...prevW,
          location: {
            city: null,
          },
        }))
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return {
    weather,
    inputCity,
    setInputCity,
    fetchWeatherData,
  }
}
