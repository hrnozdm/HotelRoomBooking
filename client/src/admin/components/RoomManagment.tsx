import React, { useEffect, useState } from 'react';
import { useRoomStore } from '../../stores/useRoomStore';


const RoomManagement: React.FC = () => {
  const { rooms, loading, error, fetchRooms, removeRoom,addRoom,fetchRoomTypes,roomTypes } = useRoomStore();
  const [newRoom, setNewRoom] = useState({number:'',type:''});

  
  

  useEffect(() => {
    fetchRooms();
    fetchRoomTypes();
  }, [fetchRooms]);
  
  const handleAddRoom =async (e:React.FormEvent) => {
    e.preventDefault();
    if (newRoom.number && newRoom.type){
       await addRoom(newRoom);
       setNewRoom({number:'',type:''});
      await fetchRooms();
    }
  };
  

  const handleDelete = (roomId: string) => {
    removeRoom(roomId); 
  };



  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;

  //console.log(rooms);
  

  return (

    <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Oda Yönetimi</h2>

   
    <form onSubmit={handleAddRoom} className="mb-6">
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Oda Numarası"
          value={newRoom.number}
          onChange={(e) => setNewRoom({ ...newRoom, number: e.target.value })}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />
         <select
            value={newRoom.type}
            onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          >
            <option value="">Oda Tipi Seçin</option>
            {(Array.isArray(roomTypes) ? roomTypes : []).map((type) => ( // roomTypes bir dizi değilse boş dizi kullan
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Oda Ekle</button>
      </div>
    </form>

    {/* Oda Listesi */}
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 border-b text-left text-gray-600">Oda Numarası</th>
            <th className="py-3 px-4 border-b text-left text-gray-600">Oda Tipi</th>
            <th className="py-3 px-4 border-b text-left text-gray-600">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {rooms?.map(room => (
            <tr key={room._id} className="hover:bg-gray-100 transition">
              <td className="py-2 px-4 border-b">{room?.number}</td>
              <td className="py-2 px-4 border-b">{room?.type}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => handleDelete(room._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  );
};

export default RoomManagement;