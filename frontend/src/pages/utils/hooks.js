import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../config';

// Hook para obtener películas
export const fetchMovies = (filters = {}) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const params = { ...filters };
        const res = await axios.get(`${config.apiUrl}/movies`, { params });
        setMovies(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar películas:', err);
        setError('Error al cargar películas');
        toast.error('Error al cargar películas');
        setLoading(false);
      }
    };

    getMovies();
  }, [JSON.stringify(filters)]);

  return { movies, loading, error };
};

// Hook para obtener una película por ID
export const fetchMovie = (id) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditMode] = useState(!!id);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const getMovie = async () => {
      try {
        const res = await axios.get(`${config.apiUrl}/movies/${id}`);
        setMovie(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar película:', err);
        setError('Error al cargar película');
        toast.error('Error al cargar datos de la película');
        setLoading(false);
      }
    };

    getMovie();
  }, [id]);

  return { movie, loading, error, isEditMode };
};

// Hook para obtener series
export const fetchSeries = (filters = {}) => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSeries = async () => {
      try {
        const params = { ...filters };
        const res = await axios.get(`${config.apiUrl}/series`, { params });
        setSeries(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar series:', err);
        setError('Error al cargar series');
        toast.error('Error al cargar series');
        setLoading(false);
      }
    };

    getSeries();
  }, [JSON.stringify(filters)]);

  return { series, loading, error };
};

// Hook para obtener música
export const fetchMusic = (filters = {}) => {
  const [music, setMusic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMusic = async () => {
      try {
        const params = { ...filters };
        const res = await axios.get(`${config.apiUrl}/music`, { params });
        setMusic(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar música:', err);
        setError('Error al cargar música');
        toast.error('Error al cargar música');
        setLoading(false);
      }
    };

    getMusic();
  }, [JSON.stringify(filters)]);

  return { music, loading, error };
};
