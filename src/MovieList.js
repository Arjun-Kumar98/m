import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useConfig from './hooks/useConfig';
import './MovieList.css';

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 8;

    const { config } = useConfig(); // Load config
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const addMovie = () => {
        navigate('/newMovie');
    };

    const editMovie = (movieId) => {
        navigate(`/editMovie/${movieId}`);
    };

    const fetchMovies = useCallback(async (currentPage) => {
        if (!config || !config.API_URL) {
            console.error("API_URL is not defined in config.");
            return;
        }

        try {
            const userId = localStorage.getItem("userId");
            const response = await axios.get(`${config.API_URL}/movie/getMovieList`, {
                params: {
                    userId: userId,
                    page: currentPage,
                    size: pageSize,
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            setMovies(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    }, [config, token, pageSize]);

    const logout = () => {
        localStorage.clear("token");
        navigate('/');
    };

    useEffect(() => {
        fetchMovies(page);
    }, [page, fetchMovies]);

    const handleNext = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    const handlePrevious = () => {
        if (page > 0) setPage(page - 1);
    };

    return (
        <div className="movie-container">
            <div className="header">
                <h3 style={{ textAlign: 'left' }}>My Movies</h3>
                <h3 style={{ textAlign: 'right', marginRight: '10px', color: 'green', cursor: 'pointer' }} onClick={logout}>Log out</h3>
            </div>

            {movies.length === 0 ? (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    color: 'white'
                }}>
                    <h1>Your movie list is empty</h1>
                    <div style={{ backgroundColor: 'green', width: '35%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', margin: '0 auto', display: 'flex' }}>
                        <h3 style={{ color: 'white', cursor: 'pointer' }} onClick={addMovie}>+ Add New</h3>
                    </div>
                </div>
            ) : (
                <div className="movie-grid">
                    {movies.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            <img
                                src={`data:image/jpeg;base64,${movie.image}`}
                                alt={movie.title}
                                className="movie-poster"
                            />
                            <div className="movie-info">
                                <h3>{movie.title}</h3>
                                <p>{movie.year}</p>
                                <button onClick={() => editMovie(movie.movieId)} style={{ backgroundColor: 'black', color: 'white', cursor: 'pointer' }}>Edit</button>
                            </div>
                        </div>
                    ))}
                    {(page === totalPages - 1 && movies.length !== 8) && (
                        <div className="movie-card add-new-card" onClick={addMovie}>
                            <div className="add-new-content">
                                <h3>+ Add new</h3>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {(movies.length === 8) && (page === totalPages - 1) && (
                <div style={{ backgroundColor: 'green', width: '35%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', margin: '0 auto', display: 'flex' }}>
                    <h3 style={{ color: 'white', cursor: 'pointer' }} onClick={addMovie}>+ Add New</h3>
                </div>
            )}
            {totalPages !== 0 && (
                <div className="pagination">
                    <button onClick={handlePrevious} disabled={page === 0}>
                        Previous
                    </button>
                    <span>
                        Page {page + 1} of {totalPages}
                    </span>
                    <button onClick={handleNext} disabled={page === totalPages - 1}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default MovieList;
