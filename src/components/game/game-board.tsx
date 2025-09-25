"use client";

import { cn } from "@/lib/utils";

const COLORS = [
  "transparent",
  "hsl(187 72% 60%)", // I (cyan)
  "hsl(60 100% 50%)", // O (yellow)
  "hsl(289 84% 55%)", // T (purple)
  "hsl(120 100% 40%)", // S (green)
  "hsl(0 100% 50%)",   // Z (red)
  "hsl(39 100% 50%)",  // L (orange)
  "hsl(240 100% 60%)", // J (blue)
  "hsl(var(--muted-foreground))" // Ghost color
];

const Cell = ({ type }: { type: number | string }) => {
  const isGhost = type === 'ghost';
  const color = isGhost ? "hsl(var(--primary) / 0.1)" : COLORS[Number(type)] || "transparent";
  const borderColor = isGhost ? "hsl(var(--primary) / 0.3)" : `1px solid ${color}`;
  
  return (
    <div
      className="aspect-square w-full h-full"
      style={{
        backgroundColor: type === 0 ? "hsl(var(--background) / 0.1)" : color,
        boxShadow: type !== 0 && !isGhost ? `0 0 2px ${color}, 0 0 5px ${color}, 0 0 8px ${color} inset` : "none",
        border: type === 0 ? "1px solid hsl(var(--border) / 0.1)" : borderColor,
        borderStyle: isGhost ? 'dashed' : 'solid',
        borderWidth: isGhost ? '1px' : '1px',
        borderRadius: "2px",
      }}
    />
  );
};

export const GameBoard = ({ board }: { board: (number | string)[][] }) => {
  return (
    <div className="grid grid-cols-10 gap-px p-2 bg-card border-2 border-primary neon-box-shadow rounded-lg w-full max-w-sm aspect-[10/20]">
      {board.map((row, y) =>
        row.map((cell, x) => <Cell key={`${y}-${x}`} type={cell} />)
      )}
    </div>
  );
};
