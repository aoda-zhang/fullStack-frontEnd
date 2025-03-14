import StorageKeys from "@/typings/storage.types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type TripState = {
  tripStep: number;
  transportationOptions: { label: string; value: string | number }[];
};
type TripAction = {
  setStep: (step: number) => void;
};

const initState = {
  tripStep: 1,
  transportationOptions: [
    { label: "dasdsa", value: 23 },
    { label: "da", value: "dadsa" },
  ],
};

const persistTripStore = persist<TripState & TripAction>(
  (set, _get) => ({
    ...initState,
    setStep: (step: number) => set(() => ({ tripStep: step })),
  }),
  {
    name: StorageKeys.tripRecord,
    storage: createJSONStorage(() => sessionStorage),
  },
);

const TripStore = create<TripState & TripAction>()(persistTripStore);
export default TripStore;
