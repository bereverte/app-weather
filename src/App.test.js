import { render, screen } from "@testing-library/react"
import App from "./App"

test("renders the Weather App header", () => {
  render(<App />)

  // Verifica que se renderiza el título principal
  const titleElement = screen.getByText(/Weather App/i)
  expect(titleElement).toBeInTheDocument()

  // Verifica que el formulario se renderiza (ejemplo con etiqueta)
  const labelElement = screen.getByText(/City:/i)
  expect(labelElement).toBeInTheDocument()
})
