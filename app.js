import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import ResultsList from "./ResultsList";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // Using CORS Anywhere proxy
        const apiUrl = "https://api.theracingapi.com";
        const response = await axios.get(`${proxyUrl}${apiUrl}`, {
          params: {
            date: "2020-06-17",
            region: "GB",
          },
          headers: {
            Authorization: "Bearer your_api_key_here", // Ensure your API key is correct
            "Content-Type": "application/json",
          },
        });
        // Assuming the API returns the relevant horse race data in the response
        const filteredResults = response.data.filter(
          (entry) =>
            entry.course.toLowerCase().includes(searchTerm) ||
            entry.horse.toLowerCase().includes(searchTerm) // Ensure this line is not broken improperly
        );
        setResults(filteredResults);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          "Failed to fetch data. Please check the console for more details."
        );
      }
      setLoading(false);
    };

    fetchData();
  }, [searchTerm]); // Ensure correct usage of dependencies in useEffect

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  return (
    <div className="App">
      <h1>Horse Race Search</h1>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ResultsList results={results} />
      )}
    </div>
  );
}

export default App;
