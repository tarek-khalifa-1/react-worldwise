import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/HomePage/Homepage";
import AppLayout from "./pages/AppLayout/AppLayout";
import Login from "./pages/Login/Login";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import CityList from "./components/CityList/CityList";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList/CountryList";
import City from "./components/City/City";
import Form from "./components/Form/Form";

const BASE_URL =
  "https://raw.githubusercontent.com/tarek-khalifa-1/react-worldwise/refs/heads/main/data";

function App() {
  const [cities, setCeties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities.json`);
        if (!res.ok) throw new Error("Can't fetch data");
        const data = await res.json();
        setCeties(data.cities);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate replace to="cities" />} />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:id" element={<City />} />

          <Route path="countries" element={<CountryList cities={cities} />} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
