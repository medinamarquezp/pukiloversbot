import IProducer from "../Iproducer";
import IPexels, { Src } from "./IPexels";
import config from "../../config/main";
import fetch, { Headers } from "../../services/fetch.service";

class Pexels implements IProducer {
  private url: string;
  private key: string;

  constructor() {
    const { url, key } = config.producers.pexels;
    this.url = url;
    this.key = key;
  }

  private getHeaders(): Headers {
    return { Authorization: this.key };
  }

  private async fetchMediaByTerm(query: string): Promise<IPexels> {
    return await fetch.get(`${this.url}/search`, { query }, this.getHeaders());
  }

  async getImageByTerm(
    term: string,
    size: keyof Src = "large"
  ): Promise<string | undefined> {
    const media = await this.fetchMediaByTerm(term);
    return media.total_results > 0 ? media.photos?.[0].src[size] : "Not Found";
  }

  async getImageByID(id: number, size: keyof Src = "large"): Promise<any> {
    const searchUrl = `${this.url}/photos/${id}`;
    const media = await fetch.get(searchUrl, undefined, this.getHeaders());
    return media.id ? media.src[size] : media;
  }
}

export default Pexels;
