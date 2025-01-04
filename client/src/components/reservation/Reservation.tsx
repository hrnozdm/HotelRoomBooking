import React, { useState } from 'react';
import { useReservationStore } from '../../stores/useReservationStore';

interface ReservationProps {
    roomId: string;
    onClose: () => void; 
  }
  

const Reservation:React.FC<ReservationProps> = ({roomId,onClose}) => {
    const [checkInDate, setcheckInDate] = useState('');
    const [checkOutDate, setcheckOutDate] = useState('');
    const { loading, error, success, makeReservation } = useReservationStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await makeReservation(roomId, checkInDate, checkOutDate);
        if (!error) {
          onClose(); 
        }
      };
  return (
    <div className="bg-white p-6 rounded shadow-md">
    <h2 className="text-2xl font-bold mb-4">Rezervasyon Yap</h2>
    {error && <p className="text-red-500">{error}</p>}
    {success && <p className="text-green-500">{success}</p>}
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Başlangıç Tarihi</label>
        <input
          type="date"
          id="checkInDate"
          value={checkInDate}
          onChange={(e) => setcheckInDate(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Bitiş Tarihi</label>
        <input
          type="date"
          id="checkOutDate"
          value={checkOutDate}
          onChange={(e) => setcheckOutDate(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        disabled={loading} // Yükleme durumunda butonu devre dışı bırak
      >
        {loading ? 'Yükleniyor...' : 'Rezervasyon Yap'}
      </button>
    </form>
    <button onClick={onClose} className="mt-4 text-red-500">İptal</button>
  </div>
  )
}

export default Reservation
