import { render, screen, fireEvent } from "@testing-library/react"
import Form from "./Form"

// Mock del fetchWeatherData para simular la llamada a la API.
const mockFetchWeatherData = jest.fn()

// Mock del estado inicial del clima
const initialWeather = {
  location: {
    city: null,
    country: null,
  },
  temp_c: null,
  description: "",
}

describe("Form component", () => {
  test("No muestra información si no se ha enviado el formulario", () => {
    render(
      <Form
        weather={initialWeather}
        inputCity=""
        setInputCity={() => {}}
        fetchWeatherData={mockFetchWeatherData}
      />
    )

    // Verifica que no se muestra información climática
    expect(screen.queryByText(/ºC/)).not.toBeInTheDocument()
    expect(screen.queryByText(/City not found/)).toBeInTheDocument()
  })

  test("Muestra la información climática cuando se ingresa una ciudad y se hace clic en el botón", () => {
    // Mockeamos el estado del clima para después de obtener la ciudad
    const updatedWeather = {
      location: {
        city: "Barcelona",
        country: "Spain",
      },
      temp_c: 25, // Ejemplo de temperatura para la prueba.
      description: "Sunny", // Ejemplo de descripción.
    }

    const mockSetInputCity = jest.fn()

    // Renderiza el componente
    render(
      <Form
        weather={updatedWeather}
        inputCity="Barcelona"
        setInputCity={mockSetInputCity}
        fetchWeatherData={mockFetchWeatherData}
      />
    )

    // Simula el ingreso de la ciudad en el input
    const input = screen.getByPlaceholderText(/Enter the name of the city/i)
    fireEvent.change(input, { target: { value: "Barcelona" } })

    // Simula el clic en el botón de enviar
    const button = screen.getByText(/Search/i)
    fireEvent.click(button)

    // Verifica que se haya llamado a la función fetchWeatherData con "Barcelona"
    expect(mockFetchWeatherData).toHaveBeenCalledWith("Barcelona")

    // Verifica que se muestra la ciudad y país correctamente
    expect(screen.getByText(/Barcelona, Spain/i)).toBeInTheDocument()

    // Verifica que se muestra alguna temperatura (sin especificar valor exacto)
    expect(screen.getByText(/25 ºC/i)).toBeInTheDocument()

    // Verifica que se muestra alguna descripción del clima
    expect(screen.getByText(/Sunny/i)).toBeInTheDocument()
  })
})
