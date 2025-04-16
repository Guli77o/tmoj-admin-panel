import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import config from '../config';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);
  const [filters, setFilters] = useState({
    profile: '',
    platform: '',
    category: ''
  });

  useEffect(() => {
    fetchMovies();
  }, [filters]);

  const fetchMovies = async () => {
    try {
      const params = {};
      if (filters.profile) params.profile = filters.profile;
      if (filters.platform) params.platform = filters.platform;
      if (filters.category) params.category = filters.category;

      const res = await axios.get(`${config.apiUrl}/movies`, { params });
      setMovies(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar películas:', error);
      toast.error('Error al cargar películas');
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleDeleteClick = (movie) => {
    setMovieToDelete(movie);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!movieToDelete) return;

    try {
      await axios.delete(`${config.apiUrl}/movies/${movieToDelete._id}`);
      toast.success('Película eliminada con éxito');
      setMovies(movies.filter(movie => movie._id !== movieToDelete._id));
      setDeleteDialogOpen(false);
      setMovieToDelete(null);
    } catch (error) {
      console.error('Error al eliminar película:', error);
      toast.error('Error al eliminar película');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setMovieToDelete(null);
  };

  return (
    <Box sx={{ flexGrow: 1, ml: '240px', p: 3 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Películas
          </Typography>
          
          <Button 
            component={Link} 
            to="/movies/add" 
            variant="contained" 
            startIcon={<AddIcon />}
          >
            Añadir Película
          </Button>
        </Box>
        
        <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="profile-filter-label">Perfil</InputLabel>
            <Select
              labelId="profile-filter-label"
              id="profile-filter"
              name="profile"
              value={filters.profile}
              label="Perfil"
              onChange={handleFilterChange}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="julio">Julio</MenuItem>
              <MenuItem value="irene">Irene</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="platform-filter-label">Plataforma</InputLabel>
            <Select
              labelId="platform-filter-label"
              id="platform-filter"
              name="platform"
              value={filters.platform}
              label="Plataforma"
              onChange={handleFilterChange}
            >
              <MenuItem value="">Todas</MenuItem>
              <MenuItem value="tmoj">TMOJ</MenuItem>
              <MenuItem value="tmod">TMOD</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="category-filter-label">Categoría</InputLabel>
            <Select
              labelId="category-filter-label"
              id="category-filter"
              name="category"
              value={filters.category}
              label="Categoría"
              onChange={handleFilterChange}
            >
              <MenuItem value="">Todas</MenuItem>
              <MenuItem value="latest">Últimas</MenuItem>
              <MenuItem value="classics">Clásicas</MenuItem>
              <MenuItem value="musicals">Musicales</MenuItem>
              <MenuItem value="adventures">Aventuras</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Título</TableCell>
                  <TableCell>Imagen</TableCell>
                  <TableCell>Categoría</TableCell>
                  <TableCell>Perfil</TableCell>
                  <TableCell>Plataforma</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movies.length > 0 ? (
                  movies.map((movie) => (
                    <TableRow key={movie._id}>
                      <TableCell>{movie.title}</TableCell>
                      <TableCell>
                        <img 
                          src={movie.image} 
                          alt={movie.title} 
                          style={{ width: '60px', height: '90px', objectFit: 'cover' }}
                        />
                      </TableCell>
                      <TableCell>{movie.category}</TableCell>
                      <TableCell>{movie.profile}</TableCell>
                      <TableCell>{movie.platform}</TableCell>
                      <TableCell>
                        <IconButton 
                          component={Link} 
                          to={`/movies/edit/${movie._id}`}
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                        
                        <IconButton 
                          color="error"
                          onClick={() => handleDeleteClick(movie)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No hay películas disponibles
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        
        {/* Diálogo de confirmación de eliminación */}
        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteCancel}
        >
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Estás seguro de que deseas eliminar la película "{movieToDelete?.title}"? Esta acción no se puede deshacer.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel}>Cancelar</Button>
            <Button onClick={handleDeleteConfirm} color="error" autoFocus>
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Movies;
