import { create } from "zustand";
import { createReservation } from "../services/reservationService";

interface ReservationState {
    loading: boolean;
    error: string | null;
    success: string | null;
    makeReservation: (roomId: string, checkInDate: string, checkOutDate: string) => Promise<void>;
  }
  
  export const useReservationStore = create<ReservationState>((set) => ({
    loading: false,
    error: null,
    success: null,
    makeReservation: async (roomId, checkInDate, checkOutDate) => {
      set({ loading: true, error: null, success: null });
      try {
        await createReservation(roomId, checkInDate, checkOutDate);
        set({ success: 'Rezervasyon başarılı!', loading: false });
      } catch (error) {
        set({ error: 'Rezervasyon yaparken bir hata oluştu.', loading: false });
      }
    },
  }));