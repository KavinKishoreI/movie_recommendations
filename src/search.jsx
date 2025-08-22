import React from 'react';


const Searcher = ({searchItem , setSearch}) => {
    return (
        <div className="search">
            <div>
                <img alt ="search-icon" src = "search.svg" />
                <input
                    type="text"
                    value={searchItem}
                    placeholder= "Search Here"
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>


        </div>
    )
}

export default Searcher;