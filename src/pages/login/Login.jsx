import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const validationSchema = Yup.object({
  email: Yup.string().email('Por favor ingresa tu correo').required('Por favor ingresa tu correo'),
  password: Yup.string().required('Por favor ingresa tu contraseña'),
});

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await api.post('/auth/login', values);
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      login(token);
      navigate('/');
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Error al iniciar sesión' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box style={{ marginTop: 64, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar style={{ margin: 8, backgroundColor: '#f50057' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">Iniciar Sesión</Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, values, errors, touched, isSubmitting, isValid, dirty }) => (
            <Form noValidate style={{ marginTop: 8 }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              {errors.submit && (
                <Typography color="error" variant="body2">{errors.submit}</Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={!isValid || !dirty || isSubmitting}
                style={{ marginTop: 16, marginBottom: 8 }}
              >
                Entrar
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/register" variant="body2">¿No tienes cuenta? Regístrate</Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
