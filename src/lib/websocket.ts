/* eslint-disable @typescript-eslint/no-explicit-any */
let socket: WebSocket | null = null;

export function initWebSocket(onMessage: (data: any) => void) {
  socket = new WebSocket(process.env.NEXT_PUBLIC_WS_URL!);

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  socket.onclose = () => {
    console.log("WebSocket closed, retrying...");
    setTimeout(() => initWebSocket(onMessage), 3000); // hybrid reconnect
  };

  return socket;
}