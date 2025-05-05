import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../customHooks/tasks/useTasks";
import Search from "../../utils/Search";

function SearchTask() {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const { searchData, searchQuery, setSearchQuery } = useTasks();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;

    const results = await searchData(searchQuery);
    setSearchResults(results);
    console.log(searchQuery);
    // navigate(`task/${searchQuery}`);
    setSearchQuery("");
    console.log(searchResults);
  };

  return (
    <>
      <Search placeholder={"Search task #"} handleSearch={handleSearch} />
    </>
  );
}

export default SearchTask;
