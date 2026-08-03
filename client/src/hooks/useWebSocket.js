import { useState, useEffect, useRef } from 'react';

export const useWebSocket = (url) => {
  const [lastMessage, setLastMessage] = useState(null);
  const [readyState, setReadyState] = useState(0);
  const wsRef = useRef(null);
  
  useEffect(() => {
    wsRef.current = new WebSocket(url);
    
    wsRef.current.onopen = () => {
      setReadyState(1);
      console.log('WebSocket connected');
    };
    
    wsRef.current.onmessage = (event) => {
      setLastMessage(event.data);
    };
    
    wsRef.current.onclose = () => {
      setReadyState(3);
      console.log('WebSocket disconnected');
    };
    
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [url]);
  
  const sendMessage = (message) => {
    if (wsRef.current && wsRef.current.readyState === 1) {
      wsRef.current.send(JSON.stringify(message));
    }
  };
  
  return { lastMessage, sendMessage, readyState };
};