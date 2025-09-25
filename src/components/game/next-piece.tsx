"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = [
  "transparent",
  "hsl(187 72% 60%)",
  "hsl(60 100% 50%)",
  "hsl(289 84% 55%)",
  "hsl(120 100% 40%)",
  "hsl(0 100% 50%)",
  "hsl(39 100% 50%)",
  "hsl(240 100% 60%)",
];

export const NextPiece = ({ piece }: { piece: number[][] }) => {
  const size = Math.max(piece.length, piece[0]?.length || 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-center">Next</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <div
          className="grid gap-px"
          style={{
            gridTemplateColumns: `repeat(${size}, 1fr)`,
            width: `${size * 1.5}rem`,
            height: `${size * 1.5}rem`,
          }}
        >
          {Array.from({ length: size * size }).map((_, i) => {
            const y = Math.floor(i / size);
            const x = i % size;
            const cellType = piece[y]?.[x] || 0;
            const color = COLORS[cellType];

            return (
              <div
                key={i}
                style={{
                  backgroundColor: cellType === 0 ? "transparent" : color,
                  boxShadow: cellType !== 0 ? `0 0 2px ${color}, 0 0 4px ${color}` : "none",
                  borderRadius: "2px",
                }}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
