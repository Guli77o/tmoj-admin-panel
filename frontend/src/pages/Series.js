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

const Series = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [seriesToDelete, setSeriesToDelete] = useState(null);
  const [filters, setFilters] = useState({
    profile: '',
    platform: '',
    category: ''
  });

  useEffect(() => {
    fetchSeries();
  }, [filters]);

  const fetchSeries = async () => {
    try {
      const params = {};
      if (filters.profile) params.profile = filters.profile;
      if (filters.platform) params.platform = filters.platform;
      if (filters.category) params.category = filters.category;

      const res = await axios.get(`${config.apiUrl}/series`, { params });
      setSeries(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar series:', error);
      toast.error('Error al cargar series');
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleDeleteClick = (series) => {
    setSeriesToDelete(series);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!seriesToDelete) return;

    try {
      await axios.delete(`${config.apiUrl}/series/${seriesToDelete._id}`);
      toast.success('Serie eliminada con éxito');
      setSeries(series.filter(s => s._id !== seriesToDelete._id));
      setDeleteDialogOpen(false);
      setSeriesToDelete(null);
    } catch (error) {
      console.error('Error al eliminar serie:', error);
      toast.error('Error al eliminar serie');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSeriesToDelete(null);
  };

  return (
    <Box sx={{ flexGrow: 1, ml: '240px', p: 3 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Series
          </Typography>
          
          <Button 
            component={Link} 
            to="/series/add" 
            variant="contained" 
            startIcon={<AddIcon />}
          >
            Añadir Serie
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
              <MenuItem value="popular">Populares</MenuItem>
              <MenuItem value="comedy">Comedia</MenuItem>
              <MenuItem value="drama">Drama</MenuItem>
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
                {series.length > 0 ? (
                  series.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          style={{ width: '60px', height: '90px', objectFit: 'cover' }}
                        />
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.profile}</TableCell>
                      <TableCell>{item.platform}</TableCell>
                      <TableCell>
                        <IconButton 
                          component={Link} 
                          to={`/series/edit/${item._id}`}
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                        
                        <IconButton 
                          color="error"
                          onClick={() => handleDeleteClick(item)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No hay series disponibles
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
              ¿Estás seguro de que deseas eliminar la serie "{seriesToDelete?.title}"? Esta acción no se puede deshacer.
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

export default Series;
