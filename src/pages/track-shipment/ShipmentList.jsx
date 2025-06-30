import React, { useState, useEffect, useContext } from 'react';
import {
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    TableFooter,
    Button,
    TableContainer,
    Paper,
    CircularProgress,
    makeStyles,
    Typography
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { getShipmentList } from '../../services/shipment';
import { ShipmentContext } from '../../context/ShipmentContext';

const useStyles = makeStyles(theme => ({
    sectionTitle: {
        marginBottom: theme.spacing(2),
        fontWeight: 500,
        textAlign: 'center'
    },
    container: {
        margin: theme.spacing(4),
        padding: theme.spacing(2),
        width: '90vw',
        maxWidth: 1200,
        minHeight: '70vh',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    tableContainer: {
        maxHeight: '60vh',
    },
    table: {
        minWidth: 800
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(1)
    },
    clickableRow: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.action.hover
        }
    }
}));

export default function ShipmentList() {
    const classes = useStyles();
    const navigate = useNavigate();
    const { cities } = useContext(ShipmentContext);

    const [shipments, setShipments] = useState([]);
    const [page, setPage] = useState(0);
    const [disableNext, setDisableNext] = useState(false);
    const [loading, setLoading] = useState(false);
    const pageSize = 10;


    // Carga los envíos de forma paginada
    const loadShipments = async (pageToLoad) => {
        setLoading(true);
        try {
            const data = await getShipmentList(pageToLoad, pageSize);
            if (Array.isArray(data) && data.length > 0) {
                setShipments(data);
            } else {
                // Si no hay más datos, retrocede y deshabilita siguiente
                setPage(prev => prev > 0 ? prev - 1 : 0);
                setDisableNext(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadShipments(page);
    }, [page]);

    const handlePrev = () => {
        if (page > 0) {
            setPage(prev => prev - 1);
            setDisableNext(false);
        }
    };

    const handleNext = () => {
        setPage(prev => prev + 1);
    };

    const handleRowClick = (id) => {
        navigate(`/track-shipment/${id}`);
    };

    const getCityName = (cityId) => {
        const city = cities.find(c => c.id === cityId);
        return city ? city.name : 'Desconocida';
    };

    const getStateName = (state) => {
        switch (state) {
            case 'CREATED':
                return 'Creado';
            case 'WAITING':
                return 'En Espera';
            case 'IN_TRANSIT':
                return 'En Tránsito';
            case 'DELIVERED':
                return 'Entregado';
            case 'CANCELED':
                return 'Cancelado';
            default:
                return 'Desconocido';
        }
    };

    return (
        <Paper className={classes.container} elevation={3}>
            <Typography variant="h5" className={classes.sectionTitle}>Envíos</Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <TableContainer className={classes.tableContainer} component={Paper} elevation={1}>
                    <Table className={classes.table} stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Origen</TableCell>
                                <TableCell>Destino</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Fecha de Creación</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {shipments.map(s => (
                                <TableRow
                                    key={s.id}
                                    hover
                                    className={classes.clickableRow}
                                    onClick={() => handleRowClick(s.id)}
                                >
                                    <TableCell>{s.id}</TableCell>
                                    <TableCell>{getCityName(s.originId)}</TableCell>
                                    <TableCell>{getCityName(s.destinationId)}</TableCell>
                                    <TableCell>{getStateName(s.state)}</TableCell>
                                    <TableCell>{new Date(s.createdAt).toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow className={classes.footer}>
                                <Button onClick={handlePrev} disabled={page === 0}>
                                    Anterior
                                </Button>
                                <span>Página {page + 1}</span>
                                <Button onClick={handleNext} disabled={disableNext}>
                                    Siguiente
                                </Button>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            )}
        </Paper>
    );
}
