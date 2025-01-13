import {create} from 'zustand';
import { getRooms,deleteRoom,updateRoom, addRoom, getRoomTypes } from '../services/roomService';


interface RoomState {
  rooms: any[];
  loading: boolean;
  error: string | null;
  roomTypes:string[];
  fetchRooms: () => Promise<void>;
  removeRoom:(roomId:string)=>Promise<void>;
  editRoom:(roomId:string,updatedData:any)=>Promise<void>;
  addRoom:(newRoom:any)=>Promise<void>;
  fetchRoomTypes: () => Promise<void>;
}

export const useRoomStore = create<RoomState>((set) => ({
  rooms: [],
  loading: false,
  error: null,
  roomTypes:[],
  fetchRooms: async () => {
    set({ loading: true, error: null });
    try {
      const rooms = await getRooms();
      set({ rooms, loading: false });
    } catch (error) {
      set({ error: 'Odaları yüklerken bir hata oluştu.', loading: false });
    }
  },
  removeRoom:async (roomId:string) =>{
    try {
      await deleteRoom(roomId);
      set((state) => ({
        rooms: state.rooms.filter((room) => room._id !== roomId),
      }));
      alert('Oda kaydı başarılı şekilde silindi');
    } catch (err) {
      set({ error: 'Oda silinemedi.' });
    }
  },
  editRoom: async (roomId: string, updatedData: any) => {
    try {
      const updatedRoom = await updateRoom(roomId, updatedData);
      set((state) => ({
        rooms: state.rooms.map((room) => (room._id === roomId ? updatedRoom : room)),
      }));
    } catch (err) {
      set({ error: 'Oda güncellenemedi.' });
    }
  },
  addRoom:async (newRoom:any) =>{
    try {
      const addedRoom =await addRoom(newRoom);
      set((state)=>({rooms:[...state.rooms,addedRoom]}));
    } catch (error) {
      set({error:'Oda eklenmedi'});
    }
  },
  fetchRoomTypes: async () => {
    set({ loading: true, error: null });
    try {
      const types = await getRoomTypes(); 
      set({ roomTypes:types}); 
    } catch (err) {
      set({ error: 'Oda tipleri alınamadı.' });
    } finally {
      set({ loading: false });
    }
  },
  
}));