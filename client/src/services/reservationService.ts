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

  export const checkAvailability = async (roomId: string, checkInDate: string, checkOutDate: string) => {
    try {
      const response = await api.post('/check-availability', { roomId, checkInDate, checkOutDate });
      return response.data;
    } catch (error) {
      console.error('Müsaitlik kontrolü hatası:', error);
      throw error;
    }
  };