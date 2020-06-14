import Unsplash from "../../../producers/unsplash/Unsplash";

let unsplash: Unsplash;

describe("Unsplash producer tests", () => {
  beforeAll(() => {
    unsplash = new Unsplash();
  });
  test("It should display a regular size URL when searching by term without specifying size", async () => {
    const imageByTerm = await unsplash.getImageByTerm("test");
    expect(imageByTerm).toContain("https://images.unsplash.com/photo");
    expect(imageByTerm).toContain("w=1080");
  });
  test("It should display a small image when searching by term specifying small size", async () => {
    const imageByTermSmall = await unsplash.getImageByTerm("test", "small");
    expect(imageByTermSmall).toContain("https://images.unsplash.com/photo");
    expect(imageByTermSmall).toContain("w=400");
  });
  test("It should display an error when searching by incorrect term", async () => {
    const imageByID = await unsplash.getImageByTerm("eeeeeeeeeeeeeeeeeeeee");
    expect(imageByID.errors[0]).toBe("No photos found.");
  });
  test("It should display an image when searching by correct ID", async () => {
    const imageByIDURL =
      "https://images.unsplash.com/photo-1592146597890-6584b8117c12?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE0MjE2M30";
    const imageByID = await unsplash.getImageByID("aHPMqdOQfnY");
    expect(imageByID).toBe(imageByIDURL);
  });
  test("It should display an error when searching by incorrect ID", async () => {
    const imageByID = await unsplash.getImageByID(0);
    expect(imageByID.errors[0]).toBe("Couldn't find Photo");
  });
});
