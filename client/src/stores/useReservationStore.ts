import { create } from "zustand";
import { createReservation } from "../services/reservationService";

interface ReservationState {
    loading: boolean;
    error: string | null;
    success: boolean;
    makeReservation: (roomId: string, checkInDate: string, checkOutDate: string) => Promise<void>;
    resetReservationState: () => void;
  }
  
  export const useReservationStore = create<ReservationState>((set) => ({
    loading: false,
    error: null,
    success: false,
    makeReservation: async (roomId, checkInDate, checkOutDate) => {
      set({ loading: true, error: null, success: false });
      try {
        const result = await createReservation(roomId, checkInDate, checkOutDate);
        if (result.success) {
          set({ success: true, loading: false });
        } else {
          set({ error: result.message || 'Bilinmeyen bir hata oluştu.', loading: false });
        }
      } catch (error) {
        set({ error: 'Rezervasyon yaparken bir hata oluştu.', loading: false });
      }
    },
    resetReservationState: () => set({ loading: false, error: null, success: false }), 
  }));