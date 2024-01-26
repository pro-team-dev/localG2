import { create } from "zustand";

interface UserSocketStore {
  data: string[]; // Add your desired type for the data property
  connectWebSocket: (userId: string) => void;
  disconnectWebSocket: () => void;
  sendWebSocket: (message: any) => void;
}

const useUserSocketStore = create<UserSocketStore>((set) => {
  let socket: WebSocket | null = null;

  const initialState: UserSocketStore = {
    data: [],
    connectWebSocket: (userId: string) => {
      const wsUrl = `ws://api.localg.biz/ws/tourist-tour/${userId}`;

      socket = new WebSocket(wsUrl);

      // Set up event listeners for the WebSocket connection
      socket.addEventListener("open", () => {
        console.log("WebSocket connection opened");
      });

      socket.addEventListener("message", (event) => {
        console.log("WebSocket message received:", event.data);

        set((state) => ({
          data: [...state.data, event.data],
        }));
      });

      socket.addEventListener("close", () => {
        console.log("WebSocket connection closed");
      });
    },
    disconnectWebSocket: () => {
      if (socket) {
        socket.close();
      }
    },
    sendWebSocket: (message: any) => {
      if (socket) {
        socket.send(message);
      }
    },
  };

  set(initialState);

  return initialState;
});

export default useUserSocketStore;
