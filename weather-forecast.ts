// TypeWeather - TypeScript Weather Forecast App

// Define an interface for weather data
interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  date: Date;
}

// Define a class for weather forecast
class WeatherForecast {
  private forecastData: WeatherData[] = [];

  // Add weather data to the forecast
  addWeatherData(data: WeatherData) {
    this.forecastData.push(data);
  }

  // Get the average temperature for the forecast
  getAverageTemperature(): number {
    const totalTemperature = this.forecastData.reduce((sum, data) => sum + data.temperature, 0);
    return totalTemperature / this.forecastData.length;
  }

  // Get the maximum humidity for the forecast
  getMaxHumidity(): number {
    return Math.max(...this.forecastData.map(data => data.humidity));
  }

  // Get the minimum wind speed for the forecast
  getMinWindSpeed(): number {
    return Math.min(...this.forecastData.map(data => data.windSpeed));
  }

  // Search weather data by date
  searchWeatherData(date: Date): WeatherData | undefined {
    return this.forecastData.find(data => data.date.getTime() === date.getTime());
  }

  // Delete weather data by date
  deleteWeatherData(date: Date): void {
    this.forecastData = this.forecastData.filter(data => data.date.getTime() !== date.getTime());
  }
}

// Create an instance of the WeatherForecast class
const weatherForecast = new WeatherForecast();

// Function to fetch weather data for a given location
async function fetchWeatherData(location: string): Promise<WeatherData> {
  // Perform an API request to fetch the weather data for the location
  // Example API request implementation goes here

  // Simulate the response
  const response = await new Promise<WeatherData>((resolve) => {
    setTimeout(() => {
      const data: WeatherData = {
        temperature: 25,
        humidity: 80,
        windSpeed: 10,
        date: new Date(),
      };
      resolve(data);
    }, 1000);
  });

  return response;
}

// Function to display weather data
function displayWeatherData(data: WeatherData) {
  console.log("Temperature:", data.temperature);
  console.log("Humidity:", data.humidity);
  console.log("Wind Speed:", data.windSpeed);
  console.log("Date:", data.date);
}

// Get the location from the user
const location = prompt("Enter location:");

// Fetch weather data for the provided location
fetchWeatherData(location)
  .then((data) => {
    // Add the fetched weather data to the forecast
    weatherForecast.addWeatherData(data);

    // Get and display the average temperature, maximum humidity, and minimum wind speed for the forecast
    const averageTemperature = weatherForecast.getAverageTemperature();
    const maxHumidity = weatherForecast.getMaxHumidity();
    const minWindSpeed = weatherForecast.getMinWindSpeed();
    console.log("Average Temperature:", averageTemperature);
    console.log("Maximum Humidity:", maxHumidity);
    console.log("Minimum Wind Speed:", minWindSpeed);

    // Display the fetched weather data
    displayWeatherData(data);
  })
  .catch((error) => {
    console.error("Failed to fetch weather data:", error);
  });
