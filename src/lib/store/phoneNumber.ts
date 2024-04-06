import { create } from "zustand";

export interface PhoneNumberStore {
  value: string;
  setValue: (value: string) => void;
}

export const usePhoneNumberStore = create<PhoneNumberStore>()((set) => ({
  value: "",
  setValue: (value: string) => set({ value }),
}));

export interface MyStore {
  value: number;
  setValue: (value: number) => void;
}

export const useMyStore = create<MyStore>()((set) => ({
  value: 0,
  setValue: (value: number) => set({ value }),
}));
