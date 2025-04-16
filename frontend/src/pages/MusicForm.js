import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import Grid from '@mui/material/Grid';
import config from '../config';

const MusicForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    image: '',
    url: '',
    badge: '',
    category: '',
    profile: '',
    platform: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [fetchingMusic, setFetchingMusic] = useState(isEditMode);
  
  useEffect(() => {
    if (isEditMode) {
      fetchMusic();
    }
  }, [id]);
  
  const fetchMusic = async () => {
    try {
      const res = await axios.get(`${config.apiUrl}/music/${id}`);
      setFormData({
        title: res.data.data.title,
        artist: res.data.data.artist,
        image: res.data.data.image,
        url: res.data.data.url,
        badge: res.data.data.badge || '',
        category: res.data.data.category,
        profile: res.data.data.profile,
        platform: res.data.data.platform
      });
      setFetchingMusic(false);
    } catch (error) {
      console.error('Error al cargar canción:', error);
      toast.error('Error al cargar datos de la canción');
      navigate('/music');
    }
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar campos requeridos
    if (!formData.title || !formData.artist || !formData.image || !formData.url || !formData.category || !formData.profile || !formData.platform) {
      toast.error('Por favor, completa todos los campos requeridos');
      return;
    }
    
    setLoading(true);
    
    try {
      if (isEditMode) {
        await axios.put(`${config.apiUrl}/music/${id}`, formData);
        toast.success('Canción actualizada con éxito');
      } else {
        await axios.post(`${config.apiUrl}/music`, formData);
        toast.success('Canción añadida con éxito');
      }
      
      navigate('/music');
    } catch (error) {
      console.error('Error al guardar canción:', error);
      toast.error(error.response?.data?.message || 'Error al guardar canción');
      setLoading(false);
    }
  };
  
  if (fetchingMusic) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Box sx={{ flexGrow: 1, ml: '240px', p: 3 }}>
      <Container maxWidth="md">
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/music')}
            sx={{ mr: 2 }}
          >
            Volver
          </Button>
          
          <Typography variant="h4" component="h1">
            {isEditMode ? 'Editar Canción' : 'Añadir Canción'}
          </Typography>
        </Box>
        
        <Card>
          <CardContent>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Título"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Artista"
                    name="artist"
                    value={formData.artist}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="URL de la imagen"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                    helperText="URL de la imagen de la canción (preferiblemente desde Cloudinary)"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="URL de acceso"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    required
                    helperText="URL donde se reproduce la canción"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="badge-label">Badge</InputLabel>
                    <Select
                      labelId="badge-label"
                      name="badge"
                      value={formData.badge}
                      label="Badge"
                      onChange={handleChange}
                    >
                      <MenuItem value="">Ninguno</MenuItem>
                      <MenuItem value="ORIGINAL">ORIGINAL</MenuItem>
                      <MenuItem value="PRÓXIMAMENTE">PRÓXIMAMENTE</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel id="category-label">Categoría</InputLabel>
                    <Select
                      labelId="category-label"
                      name="category"
                      value={formData.category}
                      label="Categoría"
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="latest">Últimas</MenuItem>
                      <MenuItem value="popular">Populares</MenuItem>
                      <MenuItem value="rock">Rock</MenuItem>
                      <MenuItem value="pop">Pop</MenuItem>
                      <MenuItem value="electronic">Electrónica</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel id="profile-label">Perfil</InputLabel>
                    <Select
                      labelId="profile-label"
                      name="profile"
                      value={formData.profile}
                      label="Perfil"
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="julio">Julio</MenuItem>
                      <MenuItem value="irene">Irene</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel id="platform-label">Plataforma</InputLabel>
                    <Select
                      labelId="platform-label"
                      name="platform"
                      value={formData.platform}
                      label="Plataforma"
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="tmoj">TMOJ</MenuItem>
                      <MenuItem value="tmod">TMOD</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<SaveIcon />}
                      disabled={loading}
                      sx={{ minWidth: 120 }}
                    >
                      {loading ? <CircularProgress size={24} /> : 'Guardar'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
        
        {formData.image && (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Vista previa de la imagen
            </Typography>
            <img 
              src={formData.image} 
              alt={formData.title} 
              style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default MusicForm;
