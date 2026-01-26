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
    let roomCode = generateRoomCode();

    while (io.sockets.adapter.rooms.has(roomCode)) {
      roomCode = generateRoomCode();
    }

    socket.join(roomCode);

    console.log(`Sala criada: ${roomCode} pelo socket ${socket.id}`);

    socket.emit("room_created", roomCode);
  });

  socket.on("leave_room", (roomCode) => {
    socket.leave(roomCode);

    console.log(`Usuário ${socket.id} saiu da sala ${roomCode}`);

    socket.emit("room_left");
  });

  socket.on("disconnect", () => {
    console.log(`Usuário desconectado: ${socket.id}`);
  });
});

function generateRoomCode() {
  const code = Math.floor(Math.random() * 10000);

  return code.toString().padStart(4, "0");
}
