import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { signUpUser } from '../../services/authService';

import { Avatar, Button, TextField, Link, Grid, Box, Typography, Container, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

const validationSchema = Yup.object({
    email: Yup.string().email('Correo inválido').max(255, 'El correo es demasiado largo').required('El correo es obligatorio'),
    password: Yup.string().min(8, 'Debe tener al menos 8 caracteres').required('La contraseña es obligatoria'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
        .required('La confirmación de contraseña es obligatoria'),
    fullName: Yup.string().max(255, 'El nombre completo es demasiado largo').required('El nombre completo es obligatorio'),
    documentType: Yup.string().oneOf(['CC', 'CE', 'PASSPORT'], 'El tipo de documento es obligatorio').required('El tipo de documento es obligatorio'),
    document: Yup.string().max(255, 'El número de documento es demasiado largo').required('El número de documento es obligatorio'),
});

export default function Register() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    /* 
    *  Función que maneja el envío del formulario de registro.
     * Realiza una llamada al API para registrar un nuevo usuario con los valores proporcionados.
     * Si el registro es exitoso, muestra un mensaje de éxito y redirige al usuario a la página de inicio de sesión.
     * Si ocurre un error, muestra un mensaje de error.
     */
    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {

            // Llamada al API para registrar un nuevo usuario
            await signUpUser(values);

            // Mostrar mensaje de éxito y redirigir al usuario a la página de inicio de sesión
            enqueueSnackbar('Registro exitoso', { variant: 'success' });
            navigate('/login');
        } catch (err) {
            setErrors({ submit: err.response?.data?.error || 'Error al registrarse' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box style={{ marginTop: 64, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar style={{ margin: 8, backgroundColor: '#f50057' }}>
                    <AccountCircle />
                </Avatar>
                <Typography component="h1" variant="h5">Registrarse</Typography>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleBlur, values, errors, touched, isSubmitting, isValid, dirty }) => (
                        <Form>
                            <TextField
                                variant="outlined"
                                margin="normal"
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
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="confirmPassword"
                                label="Confirmar Contraseña"
                                type="password"
                                id="confirmPassword"
                                autoComplete="new-password"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                helperText={touched.confirmPassword && errors.confirmPassword}
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="fullName"
                                label="Nombre Completo"
                                name="fullName"
                                autoComplete="fullName"
                                autoFocus
                                value={values.fullName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.fullName && Boolean(errors.fullName)}
                                helperText={touched.fullName && errors.fullName}
                            />
                            <FormControl variant="outlined" fullWidth margin="normal">
                                <InputLabel id="document-type-label">Tipo de documento</InputLabel>
                                <Select
                                    labelId="document-type-label"
                                    id="documentType"
                                    name="documentType"
                                    value={values.documentType}
                                    onChange={handleChange}
                                    label="Tipo de documento"
                                    error={touched.documentType && Boolean(errors.documentType)}
                                >
                                    <MenuItem value="CC">Cédula de ciudadanía</MenuItem>
                                    <MenuItem value="CE">Cédula de extranjería</MenuItem>
                                    <MenuItem value="PASSPORT">Pasaporte</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="document"
                                label="Número de documento"
                                name="document"
                                autoComplete="document"
                                autoFocus
                                value={values.document}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.document && Boolean(errors.document)}
                                helperText={touched.document && errors.document}
                            />
                            {errors.submit && (
                                <Typography color="error" variant="body2">{errors.submit}</Typography>
                            )}
                            <Button type="submit" fullWidth variant="contained" color="primary" disabled={!isValid || !dirty || isSubmitting} style={{ marginTop: 16, marginBottom: 8 }}>
                                Registrarse
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="/login" variant="body2">¿Ya tienes cuenta? Inicia sesión</Link>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
}
