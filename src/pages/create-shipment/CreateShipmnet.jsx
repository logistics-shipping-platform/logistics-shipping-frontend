import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Typography,
    Button,
    makeStyles,
    Divider,
    Box
} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { ShipmentContext } from '../../context/ShipmentContext';

const useStyles = makeStyles(theme => ({
    root: { padding: theme.spacing(4, 0) },
    header: { textAlign: 'center', marginBottom: theme.spacing(4) },
    icon: { fontSize: 64, color: theme.palette.success.main, marginBottom: theme.spacing(1) },
    section: { margin: theme.spacing(2, 0) },
    label: { color: theme.palette.text.secondary },
    value: { fontWeight: 500 },
    divider: { margin: theme.spacing(2, 0) },
    controlButtons: { marginTop: theme.spacing(8), textAlign: 'center' },
    outlinedBtn: {
        marginRight: theme.spacing(2),
        borderColor: '#FF6600',
        color: '#FF6600',
        '&:hover': { backgroundColor: 'rgba(255,102,0,0.08)' }
    },
    containedBtn: {
        backgroundColor: '#FF6600',
        color: '#FFF',
        '&:hover': { backgroundColor: '#E65500' }
    }
}));

export default function CreateShipment() {
    const classes = useStyles();
    const navigate = useNavigate();
    const { calculatedShipmentData, cities } = useContext(ShipmentContext);

    const formattedDate = calculatedShipmentData?.requestDate
        ? new Date(calculatedShipmentData.requestDate).toLocaleDateString('es-CO', {
            day: 'numeric', month: 'long', year: 'numeric'
        })
        : '-';

    const formattedCost = calculatedShipmentData?.price
        ? new Intl.NumberFormat('es-CO', {
            style: 'currency', currency: 'COP', minimumFractionDigits: 0
        }).format(calculatedShipmentData.price)
        : '-';

    const originCity = cities.find(city => city.id === calculatedShipmentData?.originId)?.name || '-'
    const destinationCity = cities.find(city => city.id === calculatedShipmentData?.destinationId)?.name || '-';

    return (
        <Container maxWidth="sm" className={classes.root}>
            <Box className={classes.header}>
                <Typography variant="h5">Cotizar un Envío</Typography>
                <CheckCircleOutlineIcon className={classes.icon} />
                <Typography variant="subtitle1">¡Tu cotización ha sido generada!</Typography>
                <Typography variant="body2" color="textSecondary">
                    Conoce los detalles de tu cotización.
                </Typography>
            </Box>

            <Grid container spacing={2} className={classes.section}>
                <Grid item xs={6}>
                    <Typography className={classes.label}>Fecha de solicitud</Typography>
                    <Typography className={classes.value}>{formattedDate}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography className={classes.label}>Días estimados de Entrega</Typography>
                    <Typography className={classes.value}>{'2 Días'}</Typography>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />

            <Grid container spacing={2} className={classes.section}>
                <Grid item xs={6}>
                    <Typography className={classes.label}>Tipo de Envío</Typography>
                    <Typography className={classes.value}>{'Nacional'}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography className={classes.label}>Tipo de Producto</Typography>
                    <Typography className={classes.value}>{'Paquete'}</Typography>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />

            <Grid container spacing={2} className={classes.section}>
                <Grid item xs={6}>
                    <Typography className={classes.label}>Ciudad de Origen</Typography>
                    <Typography className={classes.value}>{originCity}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography className={classes.label}>Ciudad de Destino</Typography>
                    <Typography className={classes.value}>{destinationCity}</Typography>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />

            <Grid container spacing={2} className={classes.section}>
                <Grid item xs={12}>
                    <Typography className={classes.label}>Valor total de la cotización</Typography>
                    <Typography className={classes.value}>{formattedCost}</Typography>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />

            <Typography variant="subtitle1" className={classes.section}>
                Datos del Envío
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Typography className={classes.label}>Peso en Kg</Typography>
                    <Typography className={classes.value}>
                        {calculatedShipmentData?.weight ? `${calculatedShipmentData.weight} Kg` : '-'}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Typography className={classes.label}>Dimensiones en cm</Typography>
                    <Typography className={classes.value}>
                        Largo: {calculatedShipmentData?.length || '-'} Alto: {calculatedShipmentData?.height || '-'} Ancho: {calculatedShipmentData?.width || '-'}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Typography className={classes.label}>Cantidad</Typography>
                    <Typography className={classes.value}>
                        {'1'}
                    </Typography>
                </Grid>
            </Grid>


            <Box className={classes.controlButtons}>
                <Button
                    variant="outlined"
                    className={classes.outlinedBtn}
                    onClick={() => navigate('/')}
                >
                    Nueva Cotización
                </Button>
                <Button
                    variant="contained"
                    className={classes.containedBtn}
                    onClick={() => {
                        // TODO: crear envío
                    }}
                >
                    Solicitar Recogida
                </Button>
            </Box>
        </Container>
    );
}