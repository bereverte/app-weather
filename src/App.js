import Form from "./components/Form"
import useWeather from "./hooks/useWeather"

function App() {
  const { weather, inputCity, setInputCity, fetchWeatherData } = useWeather()
  return (
    <>
      <header className="header">
        <h1 className="title">Weather App</h1>
      </header>
      <main>
        <div>
          <Form
            weather={weather}
            inputCity={inputCity}
            setInputCity={setInputCity}
            fetchWeatherData={fetchWeatherData}
          />
        </div>
      </main>
    </>
  )
}

export default App
