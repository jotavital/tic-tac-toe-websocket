# ⭕❌ Realtime Tic-Tac-Toe

Um Jogo da Velha multiplayer em tempo real, desenvolvido para explorar conceitos de conexões persistentes, arquitetura de salas (lobbies) e sincronização de estado entre clientes.

![Status](https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow)
![Tech](https://img.shields.io/badge/Stack-Next.js_14_|_Socket.io-black)

## 🚀 Sobre o Projeto

Este projeto foge do tradicional "request/response" do HTTP. Ele utiliza **WebSockets** para criar um túnel de comunicação bidirecional, permitindo que dois jogadores interajam com latência mínima em ambientes separados.

O design segue uma estética **Flat/Minimalista**, sem sombras, focado na clareza visual e usabilidade.

### ✨ Funcionalidades Principais

- **Multiplayer em Tempo Real:** Movimentos sincronizados instantaneamente via Socket.io.
- **Sistema de Salas (Lobby):**
  - Criação dinâmica de salas (armazenadas em memória).
  - Matchmaking automático (1º a entrar é X, 2º a entrar é O).
  - Bloqueio de salas cheias (máximo 2 jogadores).
- **Resiliência:** Tratamento de desconexões e reconexões automáticas.
- **UI Responsiva:** Interface construída com Tailwind CSS.

---

## 🛠️ Tech Stack & Arquitetura

O projeto adota uma arquitetura de **Microsserviços/Monorepo**, separando o frontend (Serverless) do backend (Persistente) para otimizar a hospedagem.

### Frontend (`/`)
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Linguagem:** TypeScript
- **Gerenciador de Pacotes:** pnpm
- **Hospedagem:** Vercel

### Backend (`/server`)
- **Runtime:** [Node.js](https://nodejs.org/)
- **Comunicação:** [Socket.io](https://socket.io/) (Server)
- **Linguagem:** JavaScript (ES Modules)
- **Gerenciador de Pacotes:** npm
- **Hospedagem:** Koyeb (para suporte a WebSockets persistentes)

---

## ⚙️ Como Executar Localmente

Como o projeto é dividido em duas partes, você precisará de dois terminais abertos.

### 1. Clonar o repositório

git clone https://github.com/seu-usuario/tic-tac-toe-multiplayer.git
cd tic-tac-toe-multiplayer


### 2. Rodar o Backend (Socket Server)
O servidor deve rodar na porta 8000 por padrão.


cd server
npm install
npm start
# Output esperado: "Server running on port 8000"


### 3. Rodar o Frontend (Next.js)
Abra um **novo terminal** na raiz do projeto.


# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
# Crie um arquivo .env.local na raiz e adicione:
echo "NEXT_PUBLIC_SOCKET_URL=http://localhost:8000" > .env.local

# Rodar o projeto
pnpm dev


Acesse `http://localhost:3000` no seu navegador.

---

## 🧠 Como Funciona (Under the Hood)

### O Ciclo de Vida da Sala
Diferente de sistemas que salvam salas em banco de dados, este projeto utiliza a **Memória RAM** do servidor para gerenciar as partidas, garantindo velocidade máxima.

1.  **Criação Preguiçosa (Lazy Creation):** A sala não existe até que o Jogador 1 solicite a entrada (`join_room`).
2.  **Gerenciamento de Estado:**
    - O servidor armazena um `Set` de Socket IDs para cada sala.
    - Se `size === 0` → Cria sala, define jogador como **X**.
    - Se `size === 1` → Entra na sala, define jogador como **O** e inicia o jogo.
    - Se `size >= 2` → Rejeita a conexão (`room_full`).
3.  **Destruição:** Assim que os jogadores desconectam, a referência da sala é removida da memória automaticamente pelo Garbage Collector do Socket.io.

---

## 📂 Estrutura de Pastas


/
├── app/                 # Frontend (Next.js)
│   ├── components/      # Componentes React (Lobby, Tabuleiro)
│   ├── context/         # SocketContext (Gerenciamento Global de Estado)
│   └── page.tsx         # Página Principal
├── server/              # Backend (Node.js Isolado)
│   ├── index.js         # Lógica do Socket Server
│   └── package.json     # Dependências do Backend
├── public/              # Assets estáticos
├── tailwind.config.ts   # Configurações de Design System
└── package.json         # Dependências do Frontend


---

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir Issues ou Pull Requests para melhorar a lógica de reconexão, adicionar chat ou novas features.

---

## 📝 Licença

Este projeto está sob a licença MIT.