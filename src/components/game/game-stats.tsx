"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GameStatsProps {
  score: number;
  lines: number;
  level: number;
}

export const GameStats = ({ score, lines, level }: GameStatsProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-center">Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-lg">
        <div className="flex justify-between items-baseline">
          <span className="text-muted-foreground">Score</span>
          <span className="font-code text-primary text-2xl">{score.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-muted-foreground">Lines</span>
          <span className="font-code text-accent">{lines.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-muted-foreground">Level</span>
          <span className="font-code">{level.toLocaleString()}</span>
        </div>
      </CardContent>
    </Card>
  );
};
