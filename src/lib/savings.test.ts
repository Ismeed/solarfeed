import { describe, expect, it } from "vitest";
import { bagsPerYear, savingPerYear } from "./savings";
import { nairaMillions } from "./format";

describe("savings model", () => {
  it("matches the published illustrative figures at ₦18,000 a bag", () => {
    expect(nairaMillions(savingPerYear(200, 18000))).toBe("₦0.91m");
    expect(nairaMillions(savingPerYear(500, 18000))).toBe("₦2.27m");
    expect(nairaMillions(savingPerYear(1000, 18000))).toBe("₦4.53m");
    expect(nairaMillions(savingPerYear(2000, 18000))).toBe("₦9.07m");
  });
  it("computes bags per year from 115 g per hen per day", () => {
    expect(bagsPerYear(500)).toBeCloseTo(839.5, 5);
  });
});
