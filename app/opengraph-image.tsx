import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 1200,
};
export const contentType = "image/png";
export const alt = "Jogo da Velha";

const gameXColor = "#f43f5e";
const gameOColor = "#06b6d4";
const gridColor = "#334155";
const bgColor = "#0f172a";

const cellStyle = {
  width: 300,
  height: 300,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const svgSize = 180;

const PieceX = () => (
  <div style={{ ...cellStyle, color: gameXColor }}>
    <svg width={svgSize} height={svgSize} viewBox="0 0 100 100">
      <path
        d="M 25 25 L 75 75 M 75 25 L 25 75"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        fill="transparent"
      />
    </svg>
  </div>
);

const PieceO = () => (
  <div style={{ ...cellStyle, color: gameOColor }}>
    <svg width={svgSize} height={svgSize} viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="30"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        fill="transparent"
      />
    </svg>
  </div>
);

const EmptySquare = () => <div style={cellStyle} />;

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: bgColor,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 900,
          height: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          viewBox="0 0 300 300"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <g stroke={gridColor} strokeWidth="10" strokeLinecap="round">
            <line x1="100" y1="10" x2="100" y2="290" />
            <line x1="200" y1="10" x2="200" y2="290" />
            <line x1="10" y1="100" x2="290" y2="100" />
            <line x1="10" y1="200" x2="290" y2="200" />
          </g>
        </svg>

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 900,
            height: 900,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <PieceX />
          <EmptySquare />
          <PieceO />

          <EmptySquare />
          <PieceX />
          <EmptySquare />

          <PieceO />
          <EmptySquare />
          <EmptySquare />
        </div>
      </div>
    </div>,
    { ...size },
  );
}
