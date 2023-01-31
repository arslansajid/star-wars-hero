import { useState, useEffect, useMemo } from "react";
import HeroesTable from "./components/HeroesTable";
import { fetchPeople, searchPeople } from "./api";
import useDebounce from "./hooks/useDebounce";
import "./App.css";

const App = () => {
  // Search term
  const [searchTerm, setSearchTerm] = useState<string>("");
  //API fetch data
  const [data, setData] = useState<any[]>([]);
  // API search results
  const [results, setResults] = useState<any[]>([]);
  // Searching status (whether there is pending API request)
  const [isSearching, setIsSearching] = useState<boolean>(true);
  // Debounce search term so that it only gives us latest value ...
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500);

  // Effect for API call
  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      searchPeople(debouncedSearchTerm).then((results) => {
        setIsSearching(false);
        setResults(results);
      });
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);
  
  // Initial fetch on page load
  useEffect(() => {
    fetchPeople()
      .then((res) => {
        setIsSearching(false);
        setData(res.results);
      })
      .catch((err) => {
        setIsSearching(false);
      });
  }, []);

  const tableData = useMemo(
    () => (debouncedSearchTerm.length ? results : data),
    [data, results, debouncedSearchTerm]
  );

  return (
    <div className="App">
      <input
        className="input"
        name="search"
        placeholder="Search Heroes..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
      />
      <HeroesTable data={tableData} isLoading={isSearching} />
    </div>
  );
};

export default App;
