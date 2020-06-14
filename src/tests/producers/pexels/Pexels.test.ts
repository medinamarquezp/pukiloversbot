import Pexels from "../../../producers/pexels/Pexels";

let pexels: Pexels;

describe("Pexels producer tests", () => {
  beforeAll(() => {
    pexels = new Pexels();
  });
  test("It should display a large image when searching by term without specifying size", async () => {
    const largeImageURL =
      "https://images.pexels.com/photos/212286/pexels-photo-212286.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
    const imageByTerm = await pexels.getImageByTerm("test");
    expect(imageByTerm).toBe(largeImageURL);
  });
  test("It should display a small image when searching by term specifying small size", async () => {
    const smallImageURL =
      "https://images.pexels.com/photos/212286/pexels-photo-212286.jpeg?auto=compress&cs=tinysrgb&h=130";
    const imageByTermSmall = await pexels.getImageByTerm("test", "small");
    expect(imageByTermSmall).toBe(smallImageURL);
  });
  test("It should display an error when searching by incorrect correct ID", async () => {
    const imageByID = await pexels.getImageByID(0);
    const { status, error } = imageByID;
    expect(status).toBe(404);
    expect(error).toBe("Not Found");
  });
  test("It should display an image when searching by correct ID", async () => {
    const imageByIDURL =
      "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
    const imageByID = await pexels.getImageByID(2014422);
    expect(imageByID).toBe(imageByIDURL);
  });
});
