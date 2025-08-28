import React, { useEffect } from "react";
import Searcher from "./search.jsx";
import Spinner from "./spinner.jsx";
const Headers = () => {
    const [search, setSearch] = React.useState("");
    const [errorstring, setError] = React.useState("");
    const [movies, setMovies] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const API_BASE = "https://api.themoviedb.org/3";
    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
    };

    const fetchMovies = async (query = "") => {
        try {
            setLoading(true);
            setError("");

            let url = "";
            if (query.trim() === "") {
                url = `${API_BASE}/discover/movie?include_adult=false&page=1`;
            } else {
                const keywords = query.trim().split(/\s+/).join("+"); // OR logic
                url = `${API_BASE}/search/movie?query=${keywords}&include_adult=false&page=1`;
            }

            const response = await fetch(url, options);
            if (!response.ok) {
                throw Error(`Could not find movies for ${url}`);
            }

            const json_response = await response.json();
            let results = json_response.results || [];

            if (query.trim() !== "") {
                const words = query.toLowerCase().split(/\s+/);
                results = results.filter((movie) =>
                    words.every(
                        (w) =>
                            movie.title?.toLowerCase().includes(w) ||
                            movie.overview?.toLowerCase().includes(w)
                    )
                );
            }

            if (results.length === 0) {
                setError("No movies found");
                setMovies([]);
            } else {
                setMovies(results);
            }
        } catch (error) {
            setError("Error in fetching movies");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();

    }, []);

    useEffect(() => {
        if (search === "") {
            fetchMovies();
        } else {
            const timeout = setTimeout(() => {
                fetchMovies(search);
            }, 600);
            return () => clearTimeout(timeout);
        }
    }, [search]);

    return (
        <main>
            <div className="pattern" />
            <div className="wrapper">
                <header>
                    <img src="./hero.png" alt="Hero" />
                    <h1>
                        <span className="text-gradient">Find Movies</span> YOU LOVE WATCHING

                    </h1>
                    <Searcher searchItem={search} setSearch={setSearch} />
                    {loading ? (
                        <Spinner />
                    ) : errorstring ? (
                        <p className="text-white mt-10">{errorstring}</p>
                    ) : (
                        <div className="all-movies mt-10">
                            <ul>
                                {movies.map((movie) => (
                                    <li key={movie.id} className="movie-card">
                                        <img
                                            src={
                                                movie.poster_path
                                                    ? "https://image.tmdb.org/t/p/w500" +
                                                    movie.poster_path
                                                    : "./no-poster.png"
                                            }
                                            alt={movie.title}
                                        />
                                        <h3>{movie.title}</h3>
                                        <div className="content">
                                            <div className="rating">
                                                <img src="./star.svg" alt="rating" />
                                                <p>{movie.vote_average.toFixed(1)}</p>
                                            </div>
                                            <span className="year">
                        {movie.release_date?.split("-")[0]}
                      </span>
                                            <span className="lang">{movie.original_language}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </header>
            </div>
        </main>
    );
};

export default Headers;
