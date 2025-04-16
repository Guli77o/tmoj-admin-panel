import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Contexto
import { useAuth } from './context/AuthContext';

// Componentes
import Header from './components/Header';
import Sidebar from './components/Sidebar';

// Páginas
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Movies from './pages/Movies';
import MovieForm from './pages/MovieForm';
import Series from './pages/Series';
import SeriesForm from './pages/SeriesForm';
import Music from './pages/Music';
import MusicForm from './pages/MusicForm';
import NotFound from './pages/NotFound';

// Rutas protegidas
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      
      {isAuthenticated && <Header />}
      
      <div className="app-container">
        {isAuthenticated && <Sidebar />}
        
        <main className="main-content">
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
            
            <Route path="/" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            
            <Route path="/movies" element={
              <PrivateRoute>
                <Movies />
              </PrivateRoute>
            } />
            
            <Route path="/movies/add" element={
              <PrivateRoute>
                <MovieForm />
              </PrivateRoute>
            } />
            
            <Route path="/movies/edit/:id" element={
              <PrivateRoute>
                <MovieForm />
              </PrivateRoute>
            } />
            
            <Route path="/series" element={
              <PrivateRoute>
                <Series />
              </PrivateRoute>
            } />
            
            <Route path="/series/add" element={
              <PrivateRoute>
                <SeriesForm />
              </PrivateRoute>
            } />
            
            <Route path="/series/edit/:id" element={
              <PrivateRoute>
                <SeriesForm />
              </PrivateRoute>
            } />
            
            <Route path="/music" element={
              <PrivateRoute>
                <Music />
              </PrivateRoute>
            } />
            
            <Route path="/music/add" element={
              <PrivateRoute>
                <MusicForm />
              </PrivateRoute>
            } />
            
            <Route path="/music/edit/:id" element={
              <PrivateRoute>
                <MusicForm />
              </PrivateRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
