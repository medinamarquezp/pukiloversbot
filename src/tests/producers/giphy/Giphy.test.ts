import Giphy from "../../../producers/giphy/Giphy";

let giphy: Giphy;

describe("Giphy producer tests", () => {
  beforeAll(() => {
    giphy = new Giphy();
  });
  test("It should display a gif URL when searching by term", async () => {
    const rs = await giphy.getImageByTerm("test");
    expect(rs).toContain("https://i.giphy.com/");
  });
  test("It should display an error when searching by incorrect term", async () => {
    const imageByID = await giphy.getImageByTerm("eeeeeeeeeeeeeeeeeeeee");
    expect(imageByID.message).toBe("Not Found.");
  });
  test("It should display a gif URL when searching by correct ID", async () => {
    const imageByIDURL = "https://i.giphy.com/media/J5dTZWVfDnCeVgkENg/giphy.webp";
    const imageByID = await giphy.getImageByID("J5dTZWVfDnCeVgkENg");
    expect(imageByID).toBe(imageByIDURL);
  });
  test("It should display an error when searching by incorrect ID", async () => {
    const imageByID = await giphy.getImageByID(0);
    expect(imageByID.message).toBe("Not Found.");
  });
});
