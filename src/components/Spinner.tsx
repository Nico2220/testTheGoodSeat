import React from "react";

export function Spinner({ color = "blue", tickness = "0.5", ...props }) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg viewBox="0 0 24 24" height="300" {...props}>
        <circle
          cx="12"
          cy="12"
          r="5"
          fill="none"
          stroke={color}
          strokeWidth={tickness}
          pathLength="100"
        />
      </svg>
    </div>
  );
}
