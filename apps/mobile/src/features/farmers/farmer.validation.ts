export type FarmerInput = {
  name: string;
  mobile: string;
  village: string;
  notes: string;
};

export type FarmerErrors = Partial<Record<keyof FarmerInput, string>>;

export function validateFarmer(input: FarmerInput): FarmerErrors {
  const errors: FarmerErrors = {};

  if (!input.name.trim()) {
    errors.name = "किसान का नाम जरूरी है";
  }

  if (!input.village.trim()) {
    errors.village = "गाँव का नाम जरूरी है";
  }

  const mobile = input.mobile.trim();

  if (mobile && !/^[6-9]\d{9}$/.test(mobile)) {
    errors.mobile = "सही 10 अंकों का मोबाइल नंबर डालें";
  }

  return errors;
}

export function normalizeFarmer(input: FarmerInput): FarmerInput {
  return {
    name: input.name.trim(),
    mobile: input.mobile.trim(),
    village: input.village.trim(),
    notes: input.notes.trim(),
  };
}
