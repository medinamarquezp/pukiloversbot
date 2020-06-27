import IProducer from "../Iproducer";
import IUnsplash, { Urls } from "./IUnsplash";
import config from "../../config";
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
  async getImageByTerm(
    term: string,
    size: keyof Urls = "regular"
  ): Promise<any> {
    const media = await this.fetchRandomByTerm(term);
    return media?.id ? media?.urls[size] : (media as undefined);
  }
  async getImageByID(
    id: number | string,
    size: keyof Urls = "regular"
  ): Promise<any> {
    const searchUrl = `${this.url}/photos/${id}`;
    const media = await fetch.get(searchUrl, undefined, this.getHeaders());
    return media.id ? media.urls[size] : media;
  }
}

export default Unsplash;
