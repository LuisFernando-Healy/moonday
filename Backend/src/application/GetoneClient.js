export class GetoneClient {

  constructor(clientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(query, locality) {
    try {
      if (!query || !locality) {
        return [];
      }

      return await this.clientRepository.getOne(query, locality);
    } catch (error) {
      throw new Error("Ha ocurrido un error", error.message);
    }
  }

}

