import IProducer from "../Iproducer";
import IPexels, { Src } from "./IPexels";
import config from "../../config/main";
import fetch, { Headers } from "../../services/fetch.service";
import { randomNumberBetween } from "../../services/random.service"

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

  private async fetchMedia(query: string, page?: number): Promise<IPexels> {
    const params = (page) ? { query, per_page: 1, page } : { query }
    return await fetch.get(`${this.url}/search`, params, this.getHeaders());
  }

  async getImageByTerm(
    term: string,
    size: keyof Src = "large"
  ): Promise<string | undefined> {
    const media = await this.fetchMedia(term);
    const { total_results } = media
    const randomResult = randomNumberBetween(1, total_results)
    const randomImage = await this.fetchMedia(term, randomResult);
    return randomImage.total_results > 0 ? randomImage.photos?.[0].src[size] : "Not Found";
  }

  async getImageByID(id: number, size: keyof Src = "large"): Promise<any> {
    const searchUrl = `${this.url}/photos/${id}`;
    const media = await fetch.get(searchUrl, undefined, this.getHeaders());
    return media.id ? media.src[size] : media;
  }
}

export default Pexels;
