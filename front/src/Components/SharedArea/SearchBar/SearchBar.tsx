import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

function SearchBar(): JSX.Element {
    const [searchTerm, setSearchTerm] = useState('');
    const [preOptions, setPreOptions] = useState([]);
    const navigate = useNavigate()

    function handleSearchTermChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value);
        fetch(`http://127.0.0.1:8000/products/search_suggestions?query=${event.target.value}`)
            .then(response => response.json())
            .then(data => setPreOptions(data));
    }

    async function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await fetch(`http://127.0.0.1:8000/products/search?search_value=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                setSearchTerm('');
                navigate('/search_results', { state: { searchResults: data } });
            });
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
        </form>
    );
}

export default SearchBar;
