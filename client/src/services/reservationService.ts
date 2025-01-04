import api from "../api/api";

export const createReservation = async (roomId: string, checkInDate: string, checkOutDate: string) => {
    try {
      const response = await api.post('/book-room', { roomId, checkInDate, checkOutDate });
      console.log(response.data);
      return response.data;   
    } catch (error) {
      console.error('Rezervasyon hatası:', error);
      throw error; 
    }
  };