import api from './api';

export async function createShipment(data) {
    try {
        // Se normaliza los datos del paquete antes de enviarlos
        const payload = {
            ...data,
            weight: Number(data.weight),
            length: Number(data.length),
            height: Number(data.height),
            width: Number(data.width)
        };
        const response = await api.post('/shipments', payload);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export async function getShipmentList(page = 0, count = 10) {
    try {
        const response = await api.get(`/shipments?page=${page}&count=${count}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getShipmentById(id) {
    try {
        const response = await api.get(`/shipments/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}