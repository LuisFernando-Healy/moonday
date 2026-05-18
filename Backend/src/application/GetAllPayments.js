export class GetAllPayments {
    
  constructor(paymentRepository) {
    this.paymentRepository = paymentRepository;
  }

  async execute() {
    return await this.paymentRepository.getAll();
  }
}