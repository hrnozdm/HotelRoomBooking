import React, { useEffect, useState } from 'react';
import { useRoomStore } from '../../stores/useRoomStore';
import Reservation from '../reservation/Reservation';



const Rooms: React.FC = () => {
  const { rooms, loading, error, fetchRooms } = useRoomStore();
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  useEffect(() => {
    fetchRooms(); 
  }, []); 

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;

  //console.log(rooms);
  

  const handleReserve = (roomId: string) => {
    setSelectedRoomId(roomId); 
  };

  const handleClose = () => {
    setSelectedRoomId(null);
  };

  return (
    <div className="flex flex-wrap justify-center">
      {rooms.map((room) => (
        <div key={room._id} className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Oda Tipi: {room.type}</div>
            <p className="text-gray-700 text-base">Oda Numarası: {room.number}</p>
            <p className="text-gray-700 text-base">Oda ID: {room._id}</p>
            <p className={`text-base ${room.isAvailable ? 'text-green-500' : 'text-red-500'}`}>
              {room.isAvailable ? 'Mevcut' : 'Dolu'}
            </p>
            {room.isAvailable && (
              <button
                onClick={() => handleReserve(room._id)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Rezervasyon Yap
              </button>
            )}
          </div>
        </div>
      ))}
      {selectedRoomId && (
        <Reservation roomId={selectedRoomId} onClose={handleClose} />
      )}
    </div>
  );
};

export default Rooms;