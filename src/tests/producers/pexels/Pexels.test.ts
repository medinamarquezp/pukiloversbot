import Pexels from "../../../producers/pexels/Pexels";
import { IImageObject } from "../../../producers/IProducer";

let pexels: Pexels;

describe("Pexels producer tests", () => {
  beforeAll(() => {
    pexels = new Pexels();
  });
  test("It should display a large image when searching by term without specifying size", async () => {
    const imageByTerm = await pexels.getMediaByTerm("test") as IImageObject;
    const { imageURL } = imageByTerm;
    expect(imageURL).toContain("https://images.pexels.com/photos/");
    expect(imageURL).toContain("auto=compress&cs=tinysrgb&h=650&w=940");
  });
  test("It should display a small image when searching by term specifying small size", async () => {
    const imageByTermSmall = await pexels.getMediaByTerm("test", "small") as IImageObject;
    const { imageURL } = imageByTermSmall;
    expect(imageURL).toContain("https://images.pexels.com/photos/");
    expect(imageURL).toContain("auto=compress&cs=tinysrgb&h=130");
  });
  test("It should display an error when searching by incorrect term", async () => {
    const imageByID = await pexels.getMediaByTerm("eeeeeeeeeeeeeeeeeeeee");
    expect(imageByID).toBe("Not Found");
  });
  test("It should display an image when searching by correct ID", async () => {
    const imageByIDURL =
      "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
    const imageByID = await pexels.getMediaByID(2014422);
    expect(imageByID).toBe(imageByIDURL);
  });
  test("It should display an error when searching by incorrect ID", async () => {
    const imageByID = await pexels.getMediaByID(0);
    const { status, error } = imageByID;
    expect(status).toBe(404);
    expect(error).toBe("Not Found");
  });
});
