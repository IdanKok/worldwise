/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isLOading, setIsloading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fethCities() {
      try {
        setIsloading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was  an error loading data ...");
      } finally {
        setIsloading(false);
      }
    }
    fethCities();
  }, []);
  async function getCity(id) {
    try {
      setIsloading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("There was  an error loading data ...");
    } finally {
      setIsloading(false);
    }
  }
  async function createCity(newCity) {
    try {
      setIsloading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("datanya", data);
      setCities((cities) => [...cities, data]);
    } catch {
      alert("There was  an error loading data ...");
    } finally {
      setIsloading(false);
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLOading,
        currentCity,
        setCurrentCity,
        getCity,
        createCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CityContext was used outside CitiesProvider");
  return context;
}
export { CitiesProvider, useCities };
