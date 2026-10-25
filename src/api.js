import { API_ENDPOINT, API_KEY } from './constants'

export const getForecast = async (location) => {
  const response = await fetch(
    `${API_ENDPOINT}/forecast.json?key=${API_KEY}&q=${location}&days=7&aqi=no&alerts=no`,
  )
  const data = await response.json()

  if (!response.ok) {
    const { message = 'Something went wrong', code } = data.error ?? data
    const error = new Error(message)
    error.code = code
    throw error
  }
  return data
}
