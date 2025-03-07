import apiService from "./api";

const defaultWeatherData = {
  temperature: "N/A",
  feelsLike: "N/A",
  humidity: "N/A",
  description: "N/A",
  windSpeed: "N/A",
  city: "N/A",
  icon: "01d",
};

export const weatherService = {
  getCurrentWeather: async () => {
    try {
      // Get user's location with timeout and error handling
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        });
      });

      // Get city name from coordinates using reverse geocoding
      const { latitude, longitude } = position.coords;
      const openWeatherApiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

      if (!openWeatherApiKey) {
        console.error("OpenWeather API key is not configured");
        return defaultWeatherData;
      }

      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${openWeatherApiKey}`
      );

      if (!response.ok) {
        throw new Error(`Failed to get location data: ${response.statusText}`);
      }

      const locationData = await response.json();
      if (!locationData || !locationData[0]) {
        throw new Error("Invalid location data received");
      }

      const city = locationData[0].name;

      // Get weather data from our backend using apiService
      const weatherResponse = await apiService.weather.getCurrent({ city });

      if (!weatherResponse.data) {
        throw new Error("No weather data received from API");
      }

      return weatherResponse.data;
    } catch (error) {
      console.error("Weather service error:", error);

      // Handle specific error cases
      if (error.code === 1) {
        console.error("Location access denied");
      } else if (error.message === "Failed to get location data") {
        console.error("Location service unavailable");
      } else if (error.message === "OpenWeather API key is not configured") {
        console.error("Weather service configuration missing");
      } else if (error.response?.status === 401) {
        console.error("Weather service authentication failed");
      } else if (error.response?.status === 404) {
        console.error("Weather service endpoint not found");
      } else if (error.response?.status === 500) {
        console.error("Weather service internal error");
      }

      return defaultWeatherData;
    }
  },

  getForecast: async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = position.coords;
      const openWeatherApiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

      if (!openWeatherApiKey) {
        console.error("OpenWeather API key is not configured");
        return [];
      }

      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${openWeatherApiKey}`
      );

      if (!response.ok) {
        throw new Error(`Failed to get location data: ${response.statusText}`);
      }

      const locationData = await response.json();
      if (!locationData || !locationData[0]) {
        throw new Error("Invalid location data received");
      }

      const city = locationData[0].name;

      const forecastResponse = await apiService.weather.getForecast({ city });

      if (!forecastResponse.data) {
        throw new Error("No forecast data received from API");
      }

      return forecastResponse.data;
    } catch (error) {
      console.error("Forecast service error:", error);
      return [];
    }
  },
};
