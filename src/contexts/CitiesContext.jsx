/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
const BASE_URL = "http://localhost:55000/";
const CitiesContext = createContext();
function CitiesProvider({ children }) {
  const [cities, setCeties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`/cities`);
        if (!res.ok) throw new Error("Can't fetch data");
        const data = await res.json();
        setCeties(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`/cities/${id}`);
      if (!res.ok) throw new Error("Can't fetch data");
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function addCity(newCity) {
    try {
      setIsLoading(true);
      const exists = cities.some((city) => city.cityName === newCity.cityName);
      if (exists) {
        const msg = "You've alread visited this city before";
        setError(msg);
        return msg;
      }
      const res = await fetch(`/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Please try again later");
      const data = await res.json();
      setCurrentCity(data);
      setCeties((cities) => [...cities, data]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function removeCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`/cities/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Please try again later");
      setCeties((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        isLoading,
        error,
        setError,
        cities,
        currentCity,
        getCity,
        addCity,
        removeCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const value = useContext(CitiesContext);
  if (value === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return value;
}

export { CitiesProvider, useCities };
