"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = [
  "transparent",
  "hsl(187 72% 60%)", // I (cyan)
  "hsl(60 100% 50%)", // O (yellow)
  "hsl(289 84% 55%)", // T (purple)
  "hsl(120 100% 40%)", // S (green)
  "hsl(0 100% 50%)",   // Z (red)
  "hsl(39 100% 50%)",  // L (orange)
  "hsl(240 100% 60%)", // J (blue)
];

export const NextPiece = ({ piece }: { piece: number[][] }) => {
  const size = Math.max(piece.length, piece[0]?.length || 0, 2);

  const gridCells = Array.from({ length: size * size }).map((_, i) => {
    const y = Math.floor(i / size);
    const x = i % size;
    // center the piece
    const pieceY = y - Math.floor((size - piece.length) / 2);
    const pieceX = x - Math.floor((size - (piece[0]?.length || 0)) / 2);
    
    const cellType = piece[pieceY]?.[pieceX] || 0;
    const color = COLORS[cellType] || 'transparent';

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
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-center">Next</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center h-24">
        <div
          className="grid gap-px"
          style={{
            gridTemplateColumns: `repeat(${size}, 1fr)`,
            width: `${size * 1.25}rem`,
            height: `${size * 1.25}rem`,
          }}
        >
          {gridCells}
        </div>
      </CardContent>
    </Card>
  );
};
