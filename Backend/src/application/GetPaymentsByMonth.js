export class GetPaymentsByMonth {
  constructor(paymentRepository) {
    this.paymentRepository = paymentRepository;
  }

  async execute(mes) {
    if (!mes) {
      throw new Error("El mes es obligatorio para hacer la búsqueda.");
    }
    return await this.paymentRepository.getByMonth(mes);
  }
}