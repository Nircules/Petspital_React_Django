import React from 'react';

type SearchBarContextType = {
    searchData: string;
    setSearchData: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBarContext = React.createContext<SearchBarContextType>({
    searchData: '',
    setSearchData: () => { },
});

export default SearchBarContext;