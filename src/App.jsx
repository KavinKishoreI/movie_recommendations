import React, {useEffect} from 'react'
import Header from './header.jsx'
import Searcher from './search.jsx'



const Headers = () => {
    const [search , setSearch] = React.useState('');

    const [errorstring , setError] = React.useState('');

    const [movies , setMovies] = React.useState([]);

    const [loading, setLoading] = React.useState(false);

    const url = "https://api.themoviedb.org/3/discover/movie";

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
        }
    }
    const req = async () =>{
        try {
            setLoading(true);
            setError("");

            const response = await fetch(url, options);
            if ( !response.ok ) {
                throw Error(`Could not find movies for ${url}`);
            }
            const json_response = await response.json();
            if ( json_response.Response === "False" ) {
                setError("Error in fetching movies");
                setMovies([]);
            }
            else{
                setMovies(json_response.results);
                console.log(json_response.results);
            }
        }
        catch(error){
            setError("Error in fetching movies");
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        req().then( () => {
            console.log(movies.results);
        });
    },[]);

    return (
        <>
            <main>
                <div className="pattern" />
                <div className="wrapper">
                    <header >
                        <img src="./hero.png" />
                        <h1> <span className="text-gradient" >Find Movies</span>  YOU like just skip the hassle  </h1>
                        <Searcher searchItem = {search} setSearch = {setSearch} />

                        {loading ? <p className="text-white" > Loading movies for you </p>
                        : errorstring ? <p className="text-white" > Error occurred</p>
                        :(
                            <ul>
                                {movies.map(movie => (
                                    <>
                                        <img alt='att' src = {url + movie.poster_path} />
                                        <p className="text-white" key={movie.id}> {movie.title}</p>
                                    </>

                                )) }
                            </ul>
                                )}
                    </header>

                </div>
            </main>

        </>


    )

}
export default Headers;