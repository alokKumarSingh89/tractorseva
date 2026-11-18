import { describe, expect, it } from "vitest";

import { normalizeFarmer, validateFarmer } from "./farmer.validation";

describe("Farmer validation", () => {
  const valid = {
    name: "रामलाल यादव",
    mobile: "9876543210",
    village: "गाजीपुर",
    notes: "",
  };

  it("accepts a valid farmer", () => {
    expect(validateFarmer(valid)).toEqual({});
  });

  it("requires farmer name", () => {
    expect(validateFarmer({ ...valid, name: " " }).name).toBeDefined();
  });

  it("requires village", () => {
    expect(validateFarmer({ ...valid, village: "" }).village).toBeDefined();
  });

  it("allows an empty mobile number", () => {
    expect(validateFarmer({ ...valid, mobile: "" })).toEqual({});
  });

  it("rejects invalid mobile numbers", () => {
    expect(
      validateFarmer({
        ...valid,
        mobile: "12345",
      }).mobile,
    ).toBeDefined();
  });

  it("trims farmer information", () => {
    expect(
      normalizeFarmer({
        ...valid,
        name: " रामलाल यादव ",
      }).name,
    ).toBe("रामलाल यादव");
  });
});
