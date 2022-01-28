import React from 'react';

const Search = ({setSearchQuery}) => {

    return (
        <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск..."
        />
    );
};

export default Search;