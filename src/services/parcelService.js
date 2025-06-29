import api from './api';

export async function quoteParcel(data) {
    try {
        // Se normaliza los datos del paquete antes de enviarlos
        const payload = {
            ...data,
            weight: Number(data.weight),
            length: Number(data.length),
            height: Number(data.height),
            width: Number(data.width)
        };
        const response = await api.post('/parcels/quote', payload);
        return response.data;
    } catch (error) {
        throw error;
    }
}