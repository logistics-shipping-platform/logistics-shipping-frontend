import React, {useEffect, useContext} from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { AuthContext } from '../context/AuthContext';
import { ShipmentContext } from '../context/ShipmentContext';
import { getCities } from '../services/cityService';

export default function MainLayout() {
  const { logout } = useContext(AuthContext);
  const {  updateCities } = useContext(ShipmentContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    getCities()
      .then(data => updateCities(data.cities))
      .catch(err => console.error('Error fetching cities:', err));
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Logistics Shipping
          </Typography>
          <Button color="inherit" component={Link} to="/request-quote">Cotización</Button>
          <Button color="inherit" component={Link} to="/tracking">Seguimiento</Button>
          <Button color="inherit" onClick={handleLogout}>Salir</Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: 16 }}>
        <Outlet />
      </Container>
    </>
  );
}
