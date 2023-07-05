import { useState, useEffect } from "react";
import axios from "axios";
import { SearchForm } from "./components/SearchForm";
import { Countries } from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => setCountries(res.data));
  }, [search, setCountries]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return (
    <div>
      <SearchForm search={search} handleChange={handleSearchChange} />
      <Countries countries={filteredCountries} search={search} />
    </div>
  );
};

export default App;
