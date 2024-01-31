import { formatCurrency } from "../numberUtils";

describe("formatCurrency", () => {
  it("should format the currency correctly", () => {
    expect(formatCurrency(100)).toBe("$100.00");
    expect(formatCurrency(50)).toBe("$50.00");
    expect(formatCurrency(80)).toBe("$80.00");
  });
});