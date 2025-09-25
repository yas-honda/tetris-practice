"use client";

const COLORS = [
    "transparent",
    "hsl(187 72% 60%)",
    "hsl(60 100% 50%)",
    "hsl(289 84% 55%)",
    "hsl(120 100% 40%)",
    "hsl(0 100% 50%)",
    "hsl(39 100% 50%)",
    "hsl(240 100% 60%)",
    "hsl(var(--muted-foreground))"
  ];

const GhostCell = ({ type }: { type: number | string }) => {
    const color = COLORS[Number(type)] || "transparent";
    return (
      <div
        className="aspect-square w-full h-full"
        style={{
          backgroundColor: type === 0 ? "transparent" : color,
          opacity: 0.5,
          border: type === 0 ? "1px solid hsl(var(--border) / 0.05)" : `1px solid ${color}`,
          borderRadius: "1px",
        }}
      />
    );
  };
  

export const GhostBoard = ({ board }: { board: (number | string)[][] }) => {
  return (
    <div className="grid grid-cols-10 gap-px p-1 bg-background/20 border border-secondary rounded w-full max-w-[150px] aspect-[10/20] opacity-70">
      {board.map((row, y) =>
        row.map((cell, x) => <GhostCell key={`${y}-${x}`} type={cell} />)
      )}
    </div>
  );
};
