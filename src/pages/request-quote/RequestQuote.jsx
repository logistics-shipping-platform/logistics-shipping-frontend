import React, { useState, useEffect, useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
    Container,
    Grid,
    TextField,
    InputAdornment,
    Typography,
    Link,
    Card,
    CardMedia,
    CardContent,
    Button,
    makeStyles
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { quoteParcel } from '../../services/parcelService';
import { ShipmentContext } from '../../context/ShipmentContext';

const useStyles = makeStyles(theme => ({
    sectionTitle: {
        marginBottom: theme.spacing(2),
        fontWeight: 500,
        textAlign: 'center'
    },
    input: {
        borderRadius: theme.shape.borderRadius
    },
    addLink: {
        cursor: 'pointer',
        color: theme.palette.primary.main,
        marginTop: theme.spacing(1),
        textDecoration: 'none'
    },
    card: {
        cursor: 'pointer',
        textAlign: 'center',
        padding: theme.spacing(1),
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: theme.shadows[4]
        },
        '&:active': {
            transform: 'scale(0.95)'
        }
    },
    media: {
        height: 80,
        backgroundSize: 'contain',
        margin: '0 auto'
    },
    quoteButton: {
        marginTop: theme.spacing(4)
    }
}));

const referenceBoxes = [
    { title: 'Libro', dimensions: '22 x 16 x 11', image: '/images/book.svg' },
    { title: 'Par de zapatos', dimensions: '33 x 15 x 16', image: '/images/shoes.svg' },
    { title: 'Freidora o Mini Nevera', dimensions: '50 x 38 x 42', image: '/images/fridge.svg' },
    { title: 'Televisor 65"', dimensions: '164 x 100 x 20', image: '/images/tv.svg' }
];

const validationSchema = Yup.object().shape({
    originId: Yup.string().required('Ciudad de origen es requerida'),
    destinationId: Yup.string().required('Ciudad de destino es requerida'),
    weight: Yup.number()
        .typeError('Debe ser un número')
        .required('Peso es requerido')
        .min(1, 'Mínimo 1 kg'),
    length: Yup.number()
        .typeError('Debe ser un número')
        .required('Largo es requerido')
        .min(1, 'Debe ser mayor a 0'),
    height: Yup.number()
        .typeError('Debe ser un número')
        .required('Alto es requerido')
        .min(1, 'Debe ser mayor a 0'),
    width: Yup.number()
        .typeError('Debe ser un número')
        .required('Ancho es requerido')
        .min(1, 'Debe ser mayor a 0')
});

export default function RequestQuote() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { cities, updateCalculatedShipment } = useContext(ShipmentContext);


    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            //Consulta la cotización del paquete
            const resultQuoteParcel = await quoteParcel(values);
            
            // Si la cotización es exitosa, actualiza el contexto con los datos del paquete y se redirige a la página de creación de envío
            updateCalculatedShipment({...values, ...resultQuoteParcel, requestDate: new Date()})
            navigate('/create-shipment');
        } catch (err) {
            console.log('Error al calcular la cotización:', err);
            enqueueSnackbar(err.response?.data?.message || 'Error al calcular la cotización, por favor intentalo nuevamente', { variant: 'error' });
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <Container maxWidth="md">
            <Formik
                initialValues={{
                    originId: '',
                    destinationId: '',
                    weight: '',
                    length: '',
                    height: '',
                    width: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    setFieldValue,
                    setFieldTouched
                }) => {
                    const isFormValid =
                        values.originId &&
                        values.destinationId &&
                        values.weight &&
                        values.length &&
                        values.width &&
                        values.height &&
                        Object.keys(errors).length === 0;

                    const fillDimensions = (dims) => {
                        const [l, w, h] = dims.split(' x ');
                        setFieldValue('length', l);
                        setFieldValue('width', w);
                        setFieldValue('height', h);
                    };

                    return (
                        cities?.length === 0 ? (
                            <Typography variant="body1" align="center" color="textSecondary">
                                Cargando ciudades...
                            </Typography>
                        ) : (
                            <Form noValidate>
                                <Typography variant="h6" className={classes.sectionTitle}>
                                    Información General de Envío
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Autocomplete
                                            options={cities}
                                            getOptionLabel={(option) => option.name}
                                            value={cities.find(city => city.id === values.originId) || null}
                                            onChange={(_, value) => setFieldValue('originId', value ? value.id : '')}
                                            onBlur={() => setFieldTouched('originId', true)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    name="originId"
                                                    variant="outlined"
                                                    placeholder="Ciudad de Origen"
                                                    error={touched.originId && Boolean(errors.originId)}
                                                    helperText={touched.originId && errors.originId}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Autocomplete
                                            options={cities}
                                            getOptionLabel={(option) => option.name}
                                            value={cities.find(city => city.id === values.destinationId) || null}
                                            onChange={(_, value) => setFieldValue('destinationId', value ? value.id : '')}
                                            onBlur={() => setFieldTouched('destinationId', true)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    name="destinationId"
                                                    variant="outlined"
                                                    placeholder="Ciudad de Destino"
                                                    error={touched.destinationId && Boolean(errors.destinationId)}
                                                    helperText={touched.destinationId && errors.destinationId}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Typography variant="subtitle1" className={classes.sectionTitle} style={{ marginTop: 32 }}>
                                    Detalle de Envío
                                </Typography>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} sm={2}>
                                        <TextField
                                            name="weight"
                                            fullWidth
                                            variant="outlined"
                                            placeholder="Mínimo 1 kg"
                                            type="number"
                                            value={values.weight}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.weight && Boolean(errors.weight)}
                                            helperText={touched.weight && errors.weight}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            name="length"
                                            fullWidth
                                            variant="outlined"
                                            placeholder="Largo"
                                            type="number"
                                            value={values.length}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.length && Boolean(errors.length)}
                                            helperText={touched.length && errors.length}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            name="height"
                                            fullWidth
                                            variant="outlined"
                                            placeholder="Alto"
                                            type="number"
                                            value={values.height}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.height && Boolean(errors.height)}
                                            helperText={touched.height && errors.height}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            name="width"
                                            fullWidth
                                            variant="outlined"
                                            placeholder="Ancho"
                                            type="number"
                                            value={values.width}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.width && Boolean(errors.width)}
                                            helperText={touched.width && errors.width}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} style={{ marginTop: 32 }}>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle2">
                                            ¿No estás seguro de las medidas?
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Puedes seleccionar la medida de la caja que más se parezca al envío que quieres cotizar. Recuerda que son medidas de referencia.
                                        </Typography>
                                    </Grid>
                                    {referenceBoxes.map(box => (
                                        <Grid item xs={6} sm={3} key={box.title}>
                                            <Card className={classes.card} onClick={() => fillDimensions(box.dimensions)}>
                                                <CardMedia image={box.image} className={classes.media} />
                                                <CardContent>
                                                    <Typography variant="subtitle1">{box.title}</Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {box.dimensions}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    disabled={!isFormValid}
                                    className={classes.quoteButton}
                                >
                                    Solicitar Cotización
                                </Button>
                            </Form>
                        )
                    );
                }}
            </Formik>
        </Container>
    );
}
