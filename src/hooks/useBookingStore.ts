
import { create } from "zustand";
import type { Doctor } from "@/mock/doctors";

export type Appointment = {
  doctor: Doctor;
  slot: string; // ISO time string
};

type State = {
  bookedAppointments: Appointment[];
  book: (doctor: Doctor, slot: string) => void;
  cancel: (doctorId: string, slot: string) => void;
};

export const useBookingStore = create<State>((set) => ({
  bookedAppointments: [],
  book: (doctor, slot) =>
    set((state) => ({
      bookedAppointments: [
        ...state.bookedAppointments,
        { doctor, slot },
      ],
    })),
  cancel: (doctorId, slot) =>
    set((state) => ({
      bookedAppointments: state.bookedAppointments.filter(
        (a) => !(a.doctor.id === doctorId && a.slot === slot)
      ),
    })),
}));
