import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Mediathek = () => {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("all"); // Default filter is set to "all"
  const navigate = useNavigate()

  const handleAddNew = () => {
    navigate("/add")
  }

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get('http://localhost:8800/mediathek');
        setMovies(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAll();
  }, []);

  return (
    <div>
      <h1 className="mediathek-title">Mediathek</h1>
      <div className="filter">
        <label htmlFor="filter">Filter by:</label>
        <select id="filter" onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="movie">Film</option>
          <option value="series">Serie</option>
        </select>
      </div>
      <div className="mediathek">
        {movies
          .filter((movie) => filter === "all" || movie.media_type === filter)
          .map((movie) => (
            <div className="media" key={movie.id}>
              <h2>{movie.title}</h2>
              <h3>{movie.media_type}</h3>
              <p>{movie.release_date}</p>
              <span>{movie.length} minutes long</span>
            </div>
          ))}
      </div>
      <button className="add-button" onClick={handleAddNew}>Add new</button>
    </div>
  );
};

export default Mediathek;
