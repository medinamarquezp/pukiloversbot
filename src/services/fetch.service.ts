import client, { HeadersInit as Headers } from "node-fetch";
import { validateURLFormat, urlParams } from "./url.service";

const fetch = {
  async get(url: string, params?: object, headers?: Headers): Promise<any> {
    validateURLFormat(url);
    const searchUrl = urlParams(url, params);
    const options = headers ? { method: "GET", headers } : { method: "GET" };
    return await fetch.fetchData(searchUrl, options)
  },
  async post(url: string, content: object, headers: Headers): Promise<any> {
    validateURLFormat(url)
    const body = JSON.stringify(content)
    const options = { method: "POST", body, headers };
    return await fetch.fetchData(url, options)
  },
  async fetchData(url:string, options: object) {
    try {
      const rs = await client(url, options);
      return await rs.json();
    } catch (err) {
      throw new Error(`Error on fetching data: ${err}`);
    }
  }
};

export { fetch as default, Headers };
