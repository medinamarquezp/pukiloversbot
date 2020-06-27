import fetch from "../../services/fetch.service";
import config from "../../config";

describe("Fetching data test", () => {
  test("It should display an error fetching data from an API without authorization", async () => {
    const { url } = config.producers.pexels;
    const params = { query: "house" };
    const data = await fetch.get(`${url}/search`, params);
    expect(data.error).toBe("Authorization field missing");
  });
  test("It should works on fetching an image by term", async () => {
    const { url, key } = config.producers.pexels;
    const headers = { Authorization: key };
    const params = { query: "test" };
    const data = await fetch.get(`${url}/search`, params, headers);
    const firstImageId = 212286;
    expect(data.photos?.[0].id).toBe(firstImageId);
  });
  test("It should works on fetching an image by ID", async () => {
    const { url, key } = config.producers.pexels;
    const headers = { Authorization: key };
    const mockRS = {
      id: 2014422,
      width: 3024,
      height: 3024,
      url:
        "https://www.pexels.com/photo/brown-rocks-during-golden-hour-2014422/",
      photographer: "Joey Farina",
      photographer_url: "https://www.pexels.com/@joey",
      photographer_id: 680589,
      src: {
        original:
          "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg",
        large2x:
          "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        large:
          "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        medium:
          "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=350",
        small:
          "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=130",
        portrait:
          "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
        landscape:
          "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        tiny:
          "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
      },
      liked: false,
    };
    const data = await fetch.get(`${url}/photos/2014422`, undefined, headers);
    expect(data).toEqual(mockRS);
  });
});
