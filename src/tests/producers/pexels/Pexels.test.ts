import Pexels from "../../../producers/pexels/Pexels";

let pexels: Pexels;

describe("Pexels producer tests", () => {
  beforeAll(() => {
    pexels = new Pexels();
  });
  test("It should display a large image when searching by term without specifying size", async () => {
    const imageByTerm = await pexels.getImageByTerm("test");
    expect(imageByTerm).toContain("https://images.pexels.com/photos/");
    expect(imageByTerm).toContain("auto=compress&cs=tinysrgb&h=650&w=940");
  });
  test("It should display a small image when searching by term specifying small size", async () => {
    const imageByTermSmall = await pexels.getImageByTerm("test", "small");
    expect(imageByTermSmall).toContain("https://images.pexels.com/photos/");
    expect(imageByTermSmall).toContain("auto=compress&cs=tinysrgb&h=130");
  });
  test("It should display an error when searching by incorrect term", async () => {
    const imageByID = await pexels.getImageByTerm("eeeeeeeeeeeeeeeeeeeee");
    expect(imageByID).toBe("Not Found");
  });
  test("It should display an image when searching by correct ID", async () => {
    const imageByIDURL =
      "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
    const imageByID = await pexels.getImageByID(2014422);
    expect(imageByID).toBe(imageByIDURL);
  });
  test("It should display an error when searching by incorrect ID", async () => {
    const imageByID = await pexels.getImageByID(0);
    const { status, error } = imageByID;
    expect(status).toBe(404);
    expect(error).toBe("Not Found");
  });
});
