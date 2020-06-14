import client, { HeadersInit as Headers } from "node-fetch";
import { validateURLFormat, urlParams } from "./url.service";

const fetch = {
  async get(url: string, params?: object, headers?: Headers): Promise<any> {
    validateURLFormat(url);
    const searchUrl = urlParams(url, params);
    const options = headers ? { method: "GET", headers } : { method: "GET" };
    try {
      const rs = await client(searchUrl, options);
      return await rs.json();
    } catch (err) {
      throw new Error(`Error on fetching data: ${err}`);
    }
  },
};

export { fetch as default, Headers };
