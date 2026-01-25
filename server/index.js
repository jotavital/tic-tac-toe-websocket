import { Server } from "socket.io";

const PORT = 8000;

const io = new Server(PORT, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

console.log(`Servidor rodando na porta ${PORT}`);

io.on("connection", (socket) => {
  console.log(`Usuário conectado: ${socket.id}`);

  socket.on("create_room", () => {
    let roomId = generateRoomId();

    while (io.sockets.adapter.rooms.has(roomId)) {
      roomId = generateRoomId();
    }

    socket.join(roomId);

    console.log(`Sala criada: ${roomId} pelo socket ${socket.id}`);

    socket.emit("room_created", roomId);
  });

  socket.on("leave_room", (roomId) => {
    socket.leave(roomId);

    console.log(`Usuário ${socket.id} saiu da sala ${roomId}`);

    socket.emit("room_left");
  });

  socket.on("disconnect", () => {
    console.log(`Usuário desconectado: ${socket.id}`);
  });
});

function generateRoomId() {
  const code = Math.floor(Math.random() * 10000);

  return code.toString().padStart(4, "0");
}
