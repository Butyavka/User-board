import React, {useState} from 'react';

const Search = ({setSearchQuery}) => {
    const [inputValue, setInputValue] = useState('')

    const submitSearch = (e) => {
        e.preventDefault()
        setSearchQuery(inputValue)
    }

    return (
        <form onSubmit={submitSearch} className="search">
            <input
                className="search__input"
                type="text"
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Поиск..."
            />
            <button
                className="search__button"
                type="submit"
            >
                Найти
            </button>
        </form>
    );
};

export default Search;