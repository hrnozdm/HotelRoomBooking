import {create} from 'zustand';
import { getRooms } from '../services/roomService';

interface RoomState {
  rooms: any[];
  loading: boolean;
  error: string | null;
  fetchRooms: () => Promise<void>;
}

export const useRoomStore = create<RoomState>((set) => ({
  rooms: [],
  loading: false,
  error: null,
  fetchRooms: async () => {
    set({ loading: true, error: null });
    try {
      const rooms = await getRooms();
      set({ rooms, loading: false });
    } catch (error) {
      set({ error: 'Odaları yüklerken bir hata oluştu.', loading: false });
    }
  },
}));