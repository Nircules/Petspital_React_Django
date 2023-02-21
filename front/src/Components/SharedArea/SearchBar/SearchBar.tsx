import { useContext, useState } from "react";
import "./SearchBar.css";
import SearchBarContext from "./SearchBarContext";

function SearchBar(): JSX.Element {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [preOptions, setPreOptions] = useState([]);

    function handleSearchTermChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value);
        fetch(`http://127.0.0.1:8000/products/search_suggestions?query=${event.target.value}`)
            .then(response => response.json())
            .then(data => setPreOptions(data));
    }

    function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        fetch(`http://127.0.0.1:8000/products/search?search_value=${searchTerm}`)
            .then(response => response.json())
            .then(data => setSearchResults(data));
    }

    return (
        <form onSubmit={handleSearchSubmit}>
            <input
                type="text"
                placeholder="Search for products"
                value={searchTerm}
                onChange={handleSearchTermChange}
                list="pre-options"
            />
            <datalist id="pre-options">
                {preOptions.map(option => (
                    <option key={option.id} value={option.name} />
                ))}
            </datalist>
            <button type="submit">Search</button>
            <ul>
                {searchResults.map(result => (
                    <li key={result.id}>{result.name}</li>
                ))}
            </ul>
        </form>
    );
}

export default SearchBar;
