import { Records } from "../types";

// error translations, should be in a seperate file
export const errorTranslations: any = {
  unique_reference: "Reference is not unique",
  end_balance: "End balance is not correct"
};

// get error and translate
export const getError = (error: string, errors: [string]) => {
  const foundError = errors.find((er: string) => er === error);
  if (foundError) {
    return errorTranslations[foundError];
  }
  return false;
};

// validate field reference
export function validateHasReference(fields: any, value: string): boolean {
  return !fields.some((field: any) => field.reference === value);
}

// validate field endBalance
export function validateEndBalance(
  startBalance: string,
  endBalance: string,
  mutation: string
): boolean {
  const calcedEndBalance = parseFloat(startBalance) + parseFloat(mutation);
  const roundedEndBalance = Math.round(calcedEndBalance * 100) / 100;
  return roundedEndBalance === parseFloat(endBalance);
}

// validate all records
export function validateRecords(records: Records): Records {
  return records.reduce((list, record) => {
    const errors = [];
    const { reference, startBalance, endBalance, mutation } = record;

    // validate unique reference
    if (!validateHasReference(list, reference)) {
      errors.push("unique_reference");
    }

    // validate endBalance
    if (!validateEndBalance(startBalance, endBalance, mutation)) {
      errors.push("end_balance");
    }

    return list.concat({ ...record, errors });
  }, []);
}
