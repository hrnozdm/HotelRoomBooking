import React, { useState, useEffect } from 'react';
import { useReservationStore } from '../../stores/useReservationStore';
import { checkAvailability } from '../../services/reservationService';

interface ReservationProps {
  roomId: string;
  onClose: () => void;
}

const Reservation: React.FC<ReservationProps> = ({ roomId, onClose }) => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const { loading, error, success, makeReservation, resetReservationState } = useReservationStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isAvailable = await checkAvailability(roomId, checkInDate, checkOutDate);
    if (!isAvailable) {
        alert('Seçilen tarihler için oda mevcut değil.');
        return;
    }
    await makeReservation(roomId, checkInDate, checkOutDate);
  };

  
  useEffect(() => {
    if (success) {
      alert('Rezervasyon başarılı!');
      resetReservationState();
      onClose();
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      alert('Rezervasyon başarısız: ' + error);
      resetReservationState();
    }
  }, [error]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Rezervasyon Yap</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700">
            Başlangıç Tarihi
          </label>
          <input
            type="date"
            id="checkInDate"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700">
            Bitiş Tarihi
          </label>
          <input
            type="date"
            id="checkOutDate"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Yükleniyor...' : 'Rezervasyon Yap'}
        </button>
      </form>
      <button onClick={onClose} className="mt-4 text-red-500">
        İptal
      </button>
    </div>
  );
};

export default Reservation;
