import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Country } from "./countries";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCountryPlaceholder = (country: Country): string => {
  return `(${country.dial_code}) ${country.name} ${country.emoji}`;
};
