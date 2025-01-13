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

export const addRoom = async (newRoom:any) => {
  try {
    const response  = await api.post('/create-room',newRoom);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const getRoomTypes=async ()=>{
  try {
    const response=await api.get('/room-types');
    //console.log(response.data);
    return response.data.roomTypes;
  } catch (error) {
    console.error('Oda tiplerini alma hatası',error);
    throw error;
  }
 
}


 export const deleteRoom=async (roomId:string)=>{
    await api.delete(`/delete-room/${roomId}`);
 }


 export const updateRoom=async (roomId:string, updatedData:any)=>{
  await api.put(`/update-room/${roomId}`,updatedData);
 }