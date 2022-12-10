import React from "react";
import { useLocation } from "react-router-dom";

function SearchView() {
    const { search } = useLocation();
    const searchText = search.split("=")[1].replaceAll("%20", ' ');

    return (
        <>
        <h1>Search Page: {searchText}</h1>
        </>
    )
}

export default SearchView;