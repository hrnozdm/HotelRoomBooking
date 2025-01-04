import api from "../api/api";

export const getRooms = async () => {
    try {
      const response = await api.get('/rooms'); 
      //console.log(response.data,"oda");
      return response.data;
    } catch (error) {
      console.error('Odaları alma hatası:', error);
      throw error;
    }
  };