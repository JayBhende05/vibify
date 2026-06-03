let socket: WebSocket | null = null;

export function getSocket() {
  if (socket && socket.readyState !== WebSocket.CLOSED) {
    return socket;
  }

  console.log("🔌 Creating WebSocket...");

  socket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL!);

  socket.onopen = () => {
    console.log("✅ WebSocket Connected");
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      console.log("📩 Server message:", data);
    } catch {
      console.log("📩 Server message (raw):", event.data);
    }
  };

  socket.onerror = (err) => {
    console.log("❌ WebSocket Error:", err);
  };

  socket.onclose = () => {
    console.log("🔌 WebSocket Closed");
    socket = null;
  };

  return socket;
}