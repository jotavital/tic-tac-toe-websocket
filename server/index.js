import { Server } from "socket.io";

const PORT = 8000;

const io = new Server(PORT, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

console.log(`Servidor rodando na porta ${PORT}`);

const gameStates = {};

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

  socket.on("join_room", (roomCode) => {
    const room = io.sockets.adapter.rooms.get(roomCode);

    if (!room || room.size === 0) {
      socket.emit("failed_to_join_room", "Sala não encontrada!");
      return;
    }

    if (room.size >= 2) {
      socket.emit("failed_to_join_room", "A sala já está cheia!");
      return;
    }

    socket.join(roomCode);

    socket.emit("room_joined", roomCode);

    console.log(`Usuário ${socket.id} entrou na sala ${roomCode}`);

    if (room.size === 2) {
      const playerSocketIds = Array.from(room);

      gameStates[roomCode] = {
        board: Array(9).fill(null),
        currentTurn: "X",
        players: {
          [playerSocketIds[0]]: "X",
          [playerSocketIds[1]]: "O",
        },
      };

      io.to(roomCode).emit("game_started", {
        players: gameStates[roomCode].players,
      });
    }
  });

  socket.on("make_move", ({ roomCode, index }) => {
    const game = gameStates[roomCode];

    if (!game) return;

    const playerSymbol = game.players[socket.id];

    if (game.currentTurn !== playerSymbol) return;

    if (game.board[index] !== null) return;

    game.board[index] = playerSymbol;

    // 5. Verifica Vitória/Empate (Podemos adicionar depois)
    // const winner = checkWinner(game.board);

    game.currentTurn = game.currentTurn === "X" ? "O" : "X";

    io.to(roomCode).emit("game_state_updated", {
      board: game.board,
      currentTurn: game.currentTurn,
    });
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
