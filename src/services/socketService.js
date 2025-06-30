import { io } from 'socket.io-client';

const socket = io({
  path: '/ws',
  transports: ['websocket'],
  auth: { token: localStorage.getItem('authToken') }
});


/* 
* Conecta al socket y maneja la conexión
 */
export function subscribeToChannel(channel, onUpdate) {
  socket.on('update', onUpdate);
  if (socket.connected) {
    socket.emit('subscribe', channel);
  } else {
    socket.once('connect', () => socket.emit('subscribe', channel));
  }
}

/*
* Desconecta del socket y deja de escuchar actualizaciones
 */
export function unsubscribeFromChannel(onUpdate) {
  socket.off('update', onUpdate);
}