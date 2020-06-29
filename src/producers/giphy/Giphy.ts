import IGiphy from "./IGiphy";
import config from "../../config";
import IProducer from "../IProducer";
import fetch, { Headers } from "../../services/fetch.service";

class Giphy implements IProducer {
  private url: string;
  private key: string;

  constructor() {
    const { url, key } = config.producers.giphy;
    this.url = url;
    this.key = key;
  }

  private gifUrlByID(id: string): string {
    return `https://i.giphy.com/media/${id}/giphy.webp`;
  }

  private getHeaders(): Headers {
    return { api_key: this.key };
  }

  private async fetchRandomByTerm(tag: string): Promise<IGiphy | undefined> {
    return await fetch.get(
      `${this.url}/gifs/random`,
      { tag },
      this.getHeaders()
    );
  }
  getType() {
    return 'giphy'
  }
  async getMediaByTerm(term: string): Promise<any> {
    const media = await this.fetchRandomByTerm(term);
    const gifID = media?.data.id;
    return gifID ? { id: gifID, imageURL: this.gifUrlByID(gifID) } : { message: "Not Found." };
  }
  async getMediaByID(id: number | string): Promise<any> {
    const searchUrl = `${this.url}/gifs/${id}`;
    const media = await fetch.get(searchUrl, undefined, this.getHeaders());
    const gifID = media?.data.id;
    return gifID ? this.gifUrlByID(gifID) : { message: "Not Found." };
  }
}

export default Giphy;
