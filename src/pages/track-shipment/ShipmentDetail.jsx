import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Grid,
    Typography,
    Divider,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    CircularProgress,
    makeStyles
} from '@material-ui/core';
import { getShipmentById } from '../../services/shipment';
import { ShipmentContext } from '../../context/ShipmentContext';

const useStyles = makeStyles(theme => ({
    sectionTitle: {
        marginBottom: theme.spacing(2),
        fontWeight: 500,
        textAlign: 'center'
    },
    section: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    label: {
        color: theme.palette.text.secondary
    },
    value: {
        fontWeight: 500
    },
    divider: {
        margin: theme.spacing(2, 0)
    },
    table: {
        marginTop: theme.spacing(2)
    }
}));

export default function ShipmentDetail() {
    const classes = useStyles();
    const { id } = useParams();
    const { cities } = useContext(ShipmentContext);

    const [shipment, setShipment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getShipmentById(id);
                setShipment(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    if (loading) return <CircularProgress />;
    if (!shipment) return <Typography>Envio no encontrado.</Typography>;

    // Formatear fecha en español
    const createdDate = new Date(shipment.createdAt);
    const formattedDate = createdDate.toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // Formato de precio en COP
    const formattedPrice = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(shipment.price);

    // Nombres de ciudad
    const originCity = cities.find(city => city.id === shipment.originId)?.name || '-';
    const destinationCity = cities.find(city => city.id === shipment.destinationId)?.name || '-';

    const getStateName = (state) => {
        switch (state) {
            case 'CREATED': return 'Creado';
            case 'WAITING': return 'En Espera';
            case 'IN_TRANSIT': return 'En Tránsito';
            case 'DELIVERED': return 'Entregado';
            case 'CANCELED': return 'Cancelado';
            default: return 'Desconocido';
        }
    };

    return (
        <Container>
            <Typography variant="h5" className={classes.sectionTitle}>Detalle de Envío</Typography>

            <Grid container spacing={2} className={classes.section}>
                <Grid item xs={4}>
                    <Typography className={classes.label}>Fecha de solicitud</Typography>
                    <Typography className={classes.value}>{formattedDate}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography className={classes.label}>Valor total de la cotización</Typography>
                    <Typography className={classes.value}>{formattedPrice}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography className={classes.label}>Estado Actual</Typography>
                    <Typography className={classes.value}>{getStateName(shipment.state)}</Typography>
                </Grid>

                <Grid item xs={4}>
                    <Typography className={classes.label}>Ciudad de Origen</Typography>
                    <Typography className={classes.value}>{originCity}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography className={classes.label}>Ciudad de Destino</Typography>
                    <Typography className={classes.value}>{destinationCity}</Typography>
                </Grid>
            </Grid>

            <Divider className={classes.divider} />

            <Typography variant="subtitle1">Datos del Envío</Typography>
            <Grid container spacing={2} className={classes.section}>
                <Grid item xs={2}>
                    <Typography className={classes.label}>Peso (Kg)</Typography>
                    <Typography className={classes.value}>{shipment.weight} Kg</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography className={classes.label}>Peso Cobrado (Kg)</Typography>
                    <Typography className={classes.value}>{shipment.chargeableWeight} Kg</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography className={classes.label}>Largo (cm)</Typography>
                    <Typography className={classes.value}>{shipment.length}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography className={classes.label}>Alto (cm)</Typography>
                    <Typography className={classes.value}>{shipment.width}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography className={classes.label}>Ancho (cm)</Typography>
                    <Typography className={classes.value}>{shipment.height}</Typography>
                </Grid>
            </Grid>

            <Divider className={classes.divider} />

            <Typography variant="subtitle1">Historial de Estados</Typography>
            <Paper className={classes.table}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Estado</TableCell>
                            <TableCell>Cambiado En</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {shipment.stateHistory.map((entry, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{getStateName(entry.state)}</TableCell>
                                <TableCell>{new Date(entry.changedAt).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
}
