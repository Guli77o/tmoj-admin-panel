import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';

const NotFound = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      textAlign: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <Container maxWidth="md">
        <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: '6rem', fontWeight: 'bold', color: '#e50914' }}>
          404
        </Typography>
        
        <Typography variant="h4" component="h2" gutterBottom>
          Página no encontrada
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </Typography>
        
        <Button 
          component={Link} 
          to="/" 
          variant="contained" 
          startIcon={<HomeIcon />}
          size="large"
        >
          Volver al inicio
        </Button>
      </Container>
    </Box>
  );
};

export default NotFound;
