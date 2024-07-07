import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3002');

export function useNotification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on('notification', (notification) => {
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      socket.off('notification');
    };
  }, []);

  const selectCustomer = (customerId, auctionId) => {
    socket.emit('selectCustomer', { customerId, auctionId });
  };

  const responseWinner = (accepted, auctionId, participants, sellerId) => {
    socket.emit('responseWinner', { accepted, participants, sellerId, auctionId });
  };

  return {
    notifications,
    selectCustomer,
    responseWinner,
  };
}
