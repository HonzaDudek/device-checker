import { buildFilter } from "./BuildFilter";

describe("Build filter tests", () => {
  const phoneMockData = {
    code: "02-M-01",
    os: "ANDROID",
    vendor: "SAMSUNG",
    model: "Galaxy S5 mini",
    osVersion: "6.0.1",
    image:
      "https://www.o2.cz/_pub/dc/a7/7b/470494_1130960_SG_S5_mini_black_bigdetail.png",
  };

  const initialPhoneMockData = {
    code: undefined,
    os: undefined,
    vendor: undefined,
  };

  const borrowedPhoneData = {
    code: "02-M-01",
    os: "ANDROID",
    vendor: "SAMSUNG",
    model: "Galaxy S5 mini",
    osVersion: "6.0.1",
    image:
      "https://www.o2.cz/_pub/dc/a7/7b/470494_1130960_SG_S5_mini_black_bigdetail.png",
    borrowed: {
      user: {
        id: 1,
        type: "user",
        login: "frodo.baggins@etnetera.cz",
        name: "Frodo Baggins",
      },
      date: 1526486175115,
    },
  };

  it("returns empty object if values are undefined", () => {
    const result = buildFilter(initialPhoneMockData);
    expect(result).toStrictEqual({});
  });

  it("should convert isAvailable value to borrowed boolean", () => {
    const result = buildFilter(initialPhoneMockData);
    expect(result).toStrictEqual({});
  });

  it("should return formatted query", () => {
    const result = buildFilter(phoneMockData);
    expect(result).toStrictEqual({
      code: "02-M-01",
      os: "ANDROID",
      vendor: "SAMSUNG",
      model: "Galaxy S5 mini",
      osVersion: "6.0.1",
      image:
        "https://www.o2.cz/_pub/dc/a7/7b/470494_1130960_SG_S5_mini_black_bigdetail.png",
    });
  });
});

export {};
