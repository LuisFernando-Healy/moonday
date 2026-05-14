export class SocketService {
 
constructor(io) {
    this.io = io;
  }

  /**
   * Envia una notificación a todos los clientes conectados a través de Socket.IO.
   * @param {string} event
   * @param {object} data
   */

  notify(event, data) {

    console.log(`[Socket] Emitiendo: ${event}, data:`, data);
    this.io.emit(event, data);
  }

}
