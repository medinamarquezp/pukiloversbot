interface IProducer {
  getImageByTerm(term: string): Promise<string | undefined>;
  getImageByID(id: number): Promise<string | undefined>;
}

export default IProducer;
