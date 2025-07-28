import React from "react";

export default function BlankImage({ width = 320, height = 220 }: { width?: number; height?: number }) {
  return (
    <div
      style={{
        width,
        height,
        background: "#f5f1ea",
        borderRadius: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#b97f50",
        fontSize: "1.5rem",
        border: "2px dashed #e2b97f",
      }}
    >
      Sin imagen
    </div>
  );
}
