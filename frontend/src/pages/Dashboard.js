import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import config from '../config';

const Dashboard = () => {
  const [stats, setStats] = useState({
    movies: 0,
    series: 0,
    music: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Obtener estadísticas de películas
        const moviesRes = await axios.get(`${config.apiUrl}/movies`);
        
        // Obtener estadísticas de series
        const seriesRes = await axios.get(`${config.apiUrl}/series`);
        
        // Obtener estadísticas de música
        const musicRes = await axios.get(`${config.apiUrl}/music`);
        
        setStats({
          movies: moviesRes.data.count || 0,
          series: seriesRes.data.count || 0,
          music: musicRes.data.count || 0
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar estadísticas:', error);
        toast.error('Error al cargar estadísticas');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Películas',
      count: stats.movies,
      icon: <MovieIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
      link: '/movies',
      color: '#bbdefb'
    },
    {
      title: 'Series',
      count: stats.series,
      icon: <TvIcon sx={{ fontSize: 40, color: '#388e3c' }} />,
      link: '/series',
      color: '#c8e6c9'
    },
    {
      title: 'Música',
      count: stats.music,
      icon: <MusicNoteIcon sx={{ fontSize: 40, color: '#f57c00' }} />,
      link: '/music',
      color: '#ffe0b2'
    },
    {
      title: 'Perfiles',
      count: 2, // Julio e Irene
      icon: <PersonIcon sx={{ fontSize: 40, color: '#7b1fa2' }} />,
      link: '#',
      color: '#e1bee7'
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, ml: '240px', p: 3 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Bienvenido al panel de administración de TMOJ Media. Aquí puedes gestionar todo el contenido de la plataforma.
        </Typography>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {statCards.map((card) => (
              <Grid item xs={12} sm={6} md={3} key={card.title}>
                <Card 
                  sx={{ 
                    height: '100%',
                    backgroundColor: card.color,
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 3
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h5" component="div">
                        {card.title}
                      </Typography>
                      {card.icon}
                    </Box>
                    
                    <Typography variant="h3" component="div" sx={{ mb: 2 }}>
                      {card.count}
                    </Typography>
                    
                    <Button 
                      component={Link} 
                      to={card.link} 
                      variant="contained" 
                      fullWidth
                      sx={{ mt: 1 }}
                    >
                      Ver Detalles
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Dashboard;
