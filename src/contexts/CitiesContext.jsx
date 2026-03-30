/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
const BASE_URL = "http://localhost:55000/";
const CitiesContext = createContext();
function CitiesProvider({ children }) {
  const [cities, setCeties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

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
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={{ isLoading, cities, getCity, currentCity }}>
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
