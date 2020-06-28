interface IProducer {
  getMediaByTerm(term: string): Promise<IImageObject | string>;
  getMediaByID(id: number): Promise<string | undefined>;
  getType(): string;
}
export interface IImageObject {
  id: any,
  imageURL: string
}
export default IProducer;
