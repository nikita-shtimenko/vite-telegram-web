import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const zodPhoneNumber = z.string().transform((arg, ctx) => {
  const phone = parsePhoneNumberFromString(arg, {
    defaultCountry: "RU",
    extract: false,
  });

  if (phone && phone.isValid()) {
    return phone.number;
  }

  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: "Неправильный формат номера телефона",
  });

  return z.NEVER;
});
