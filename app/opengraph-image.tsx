import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "Tic Tac Toe - Jogue agora com seus amigos";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#0f172a",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -100,
          left: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "#fbbf24",
          opacity: 0.1,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -50,
          right: -50,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "#94a3b8",
          opacity: 0.1,
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            fontSize: 130,
            color: "#fbbf24",
            fontWeight: "bold",
            lineHeight: 1,
            textShadow: "0 4px 0 #d97706",
          }}
        >
          X
        </div>

        <div
          style={{
            width: 4,
            height: 100,
            background: "#334155",
            borderRadius: 4,
          }}
        />

        <div
          style={{
            fontSize: 130,
            color: "#f1f5f9",
            fontWeight: "bold",
            lineHeight: 1,
            textShadow: "0 4px 0 #64748b",
          }}
        >
          O
        </div>
      </div>

      <div
        style={{
          fontSize: 60,
          color: "white",
          fontWeight: 900,
          letterSpacing: "-2px",
          textTransform: "uppercase",
        }}
      >
        Jogo da Velha
      </div>

      <div
        style={{
          marginTop: 20,
          fontSize: 30,
          color: "#94a3b8",
          fontWeight: 600,
        }}
      >
        Jogue agora com seus amigos
      </div>
    </div>,

    {
      ...size,
    },
  );
}
