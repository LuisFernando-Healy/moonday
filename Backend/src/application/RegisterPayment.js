export class RegisterPayment {
  constructor(paymentRepository) {
    this.paymentRepository = paymentRepository;
  }

  async execute(paymentData) {
    // 1. Validar que vengan los datos obligatorios
    if (!paymentData.clienteId || !paymentData.montoPagado || !paymentData.mesCorrespondiente) {
      throw new Error("El Folio (clienteId), el monto y el mes son obligatorios para registrar un pago.");
    }

    // 2. Validar que el monto no sea negativo o cero
    if (paymentData.montoPagado <= 0) {
      throw new Error("El monto pagado debe ser mayor a 0.");
    }

    // 3. Mandar a guardar al repositorio
    const nuevoPago = await this.paymentRepository.save(paymentData);
    
    return {
      registrado: true,
      recibo: nuevoPago
    };
  }
}