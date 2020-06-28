import { IImageObject } from './../../../producers/IProducer';
import Unsplash from "../../../producers/unsplash/Unsplash";

let unsplash: Unsplash;

describe("Unsplash producer tests", () => {
  beforeAll(() => {
    unsplash = new Unsplash();
  });
  test("It should display a regular size URL when searching by term without specifying size", async () => {
    const imageByTerm = await unsplash.getMediaByTerm("test") as IImageObject;
    const { imageURL } = imageByTerm;
    expect(imageURL).toContain("https://images.unsplash.com/photo");
    expect(imageURL).toContain("w=1080");
  });
  test("It should display a small image when searching by term specifying small size", async () => {
    const imageByTermSmall = await unsplash.getMediaByTerm("test", "small") as IImageObject;
    const { imageURL } = imageByTermSmall;
    expect(imageURL).toContain("https://images.unsplash.com/photo");
    expect(imageURL).toContain("w=400");
  });
  test("It should display an error when searching by incorrect term", async () => {
    const imageByID = await unsplash.getMediaByTerm("eeeeeeeeeeeeeeeeeeeee");
    expect(imageByID).toBe("No photos found.");
  });
  test("It should display an image when searching by correct ID", async () => {
    const imageByIDURL =
      "https://images.unsplash.com/photo-1592146597890-6584b8117c12?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE0MjE2M30";
    const imageByID = await unsplash.getMediaByID("aHPMqdOQfnY");
    expect(imageByID).toBe(imageByIDURL);
  });
  test("It should display an error when searching by incorrect ID", async () => {
    const imageByID = await unsplash.getMediaByID(0);
    expect(imageByID.errors[0]).toBe("Couldn't find Photo");
  });
});
