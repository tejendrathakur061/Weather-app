import { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const checkWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6977d0abac6acbb69c0b5c847a7bc3c2&units=metric`,
      );
      const response = await res.json();
      {
        res.ok ? setData(response) : setError("Enter a valid city");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    if (city.trim() === "") return;
    setError("")
    checkWeather();
  };

  return (
    <div className="w-full h-screen bg-cyan-700 text-white flex items-center justify-center">
      <div className="border-2 border-white w-96 p-6 rounded-lg shadow-lg bg-cyan-800">
        <h1 className="text-3xl font-bold text-center mb-6">Weather App</h1>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter city name"
            className="flex-1 px-3 py-2 rounded-md border-2 border-white bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-yellow-400 text-black font-semibold cursor-pointer rounded-md hover:bg-yellow-500 transition"
            onClick={handleClick}
          >
            Search
          </button>
        </div>

        <div className="mt-6 text-center">
          {error ? (
            <p className="text-red-400 font-semibold">{error}</p>
          ) : data ? (
            <>
              <h2 className="text-xl font-semibold">{data.name}</h2>
              <h3 className="text-lg">Temperature: {data.main?.temp} °C</h3>
              <p>Weather: {data.weather?.[0]?.description}
              </p>
            </>
          ) : (
            <p className="text-gray-300">Enter a city name</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
