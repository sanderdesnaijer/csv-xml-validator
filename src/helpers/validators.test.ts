import {
  errorTranslations,
  getError,
  validateHasReference,
  validateEndBalance
} from "./validators";

describe("validators", () => {
  test("getError: get correct error translation", () => {
    expect(getError("unique_reference", ["unique_reference"])).toBe(
      errorTranslations.unique_reference
    );
    expect(getError("end_balance", ["end_balance"])).toBe(
      errorTranslations.end_balance
    );
    expect(getError("unique_reference", [""])).toEqual(false);
  });

  test("validateHasReference: validate reference", () => {
    const fields = [
      {
        reference: "11"
      }
    ];
    expect(validateHasReference(fields, "11")).toBe(false);
    expect(validateHasReference([], "11")).toBe(true);
  });

  test("validateEndBalance", () => {
    expect(validateEndBalance("0", "100", "100")).toBe(true);
    expect(validateEndBalance("-100", "0", "100")).toBe(true);
    expect(validateEndBalance("5.56", "3.45", "-2.11")).toBe(true);
    expect(validateEndBalance("5.56", "3.45", "2.11")).toBe(false);
  });
});
