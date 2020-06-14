import { validateURLFormat } from "../../services/url.service";

describe("URL validator tests", () => {
  test("It should display an error on validating incorrect URL", () => {
    const incorrectURL = "http:test.test";
    expect(() => validateURLFormat(incorrectURL)).toThrowError(
      "Error on URL format"
    );
  });
  test("It should display an error on validating and URL without http", () => {
    const URLWithoutHttp = "www.google.es";
    expect(() => validateURLFormat(URLWithoutHttp)).toThrowError(
      "Error on URL format"
    );
  });
  test("It should display an error on validating a subdomain without http", () => {
    const subdomainWithoutHttp = "api.google.es";
    expect(() => validateURLFormat(subdomainWithoutHttp)).toThrowError(
      "Error on URL format"
    );
  });
  test("It should works on validating correct domains", () => {
    const correctDomain = "https://www.google.es";
    expect(validateURLFormat(correctDomain)).toBeTruthy();
  });
  test("It should works on validating correct subdomains", () => {
    const correctSubDomain = "http://firebase.google.es";
    expect(validateURLFormat(correctSubDomain)).toBeTruthy();
  });
});
