import config from "../../config";
import IUnsplash, { Urls } from "./IUnsplash";
import IProducer, { IImageObject } from "../IProducer";
import fetch, { Headers } from "../../services/fetch.service";

class Unsplash implements IProducer {
  private url: string;
  private key: string;

  constructor() {
    const { url, key } = config.producers.unsplash;
    this.url = url;
    this.key = key;
  }

  private getHeaders(): Headers {
    return { Authorization: `Client-ID ${this.key}` };
  }

  private async fetchRandomByTerm(
    query: string
  ): Promise<IUnsplash | undefined> {
    return await fetch.get(
      `${this.url}/photos/random`,
      { query },
      this.getHeaders()
    );
  }

  getType() {
    return 'unsplash'
  }
  async getMediaByTerm(
    term: string,
    size: keyof Urls = "regular"
  ): Promise<IImageObject | string> {
    const media = await this.fetchRandomByTerm(term);
    return media?.id ? { id: media.id, imageURL: media?.urls[size] } : "No photos found.";
  }
  async getMediaByID(
    id: number | string,
    size: keyof Urls = "regular"
  ): Promise<any> {
    const searchUrl = `${this.url}/photos/${id}`;
    const media = await fetch.get(searchUrl, undefined, this.getHeaders());
    return media.id ? media.urls[size] : media;
  }
}

export default Unsplash;
