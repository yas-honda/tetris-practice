"use client";

import { useState, useEffect, useCallback } from "react";
import { GameBoard } from "./game-board";
import { GameStats } from "./game-stats";
import { NextPiece } from "./next-piece";
import { GhostBoard } from "./ghost-board";
import { GameOverDialog } from "./game-over-dialog";
import { getGameConfig } from "@/lib/game-config";

// --- Mock Game Logic ---
// In a real game, this would be a complex engine.
const MOCK_BOARD_WIDTH = 10;
const MOCK_BOARD_HEIGHT = 20;

const createEmptyBoard = () => Array.from({ length: MOCK_BOARD_HEIGHT }, () => Array(MOCK_BOARD_WIDTH).fill(0));

// Some mock tetromino shapes for visual flair
const mockPieces = [
    [[2, 2], [2, 2]], // O
    [[0, 3, 0], [3, 3, 3], [0, 0, 0]], // T
    [[4, 4, 0], [0, 4, 4], [0, 0, 0]], // Z
    [[0, 5, 5], [5, 5, 0], [0, 0, 0]], // S
    [[6, 6, 6, 6]], // I
    [[7, 0, 0], [7, 7, 7], [0, 0, 0]], // J
    [[0, 0, 1], [1, 1, 1], [0, 0, 0]], // L
];

const getRandomPiece = () => mockPieces[Math.floor(Math.random() * mockPieces.length)];

export default function GameArea({ gameMode }: { gameMode: "marathon" | "blitz" }) {
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [board, setBoard] = useState(createEmptyBoard());
  const [nextPiece, setNextPiece] = useState(getRandomPiece());
  const [isGameOver, setIsGameOver] = useState(false);
  const [ghostBoard, setGhostBoard] = useState(createEmptyBoard());

  const gameConfig = getGameConfig();

  // Mock game loop
  useEffect(() => {
    const gameTimer = setInterval(() => {
      if (isGameOver) {
        clearInterval(gameTimer);
        return;
      }
      setScore((s) => s + 13 * level);

      // Randomly "clear" a line
      if (Math.random() > 0.9) {
        setLines((l) => {
          const newLines = l + 1;
          if (newLines % gameConfig.level_up_speed === 0) {
            setLevel((lvl) => lvl + 1);
          }
          return newLines;
        });
      }
      
      // Update board with random blocks for visual effect
      setBoard(prevBoard => {
          const newBoard = prevBoard.map(row => [...row]);
          const x = Math.floor(Math.random() * MOCK_BOARD_WIDTH);
          const y = Math.floor(Math.random() * MOCK_BOARD_HEIGHT);
          if(newBoard[y][x] === 0) {
            newBoard[y][x] = Math.floor(Math.random() * 7) + 1;
          }
          return newBoard;
      });

      // Update ghost board
      setGhostBoard(prevBoard => {
        const newBoard = prevBoard.map(row => [...row]);
        if (Math.random() > 0.5) {
            const x = Math.floor(Math.random() * MOCK_BOARD_WIDTH);
            const y = MOCK_BOARD_HEIGHT - 1 - Math.floor(Math.random() * 5);
            if(newBoard[y][x] === 0) {
              newBoard[y][x] = Math.floor(Math.random() * 7) + 1;
            }
        }
        return newBoard;
    });

    }, 1000 / level);

    return () => clearInterval(gameTimer);
  }, [level, isGameOver, gameConfig.level_up_speed]);
  
  // Game over timer
  useEffect(() => {
      const duration = gameMode === 'blitz' ? 120000 : 300000; // 2 min for blitz, 5 for marathon
      const endTimer = setTimeout(() => setIsGameOver(true), duration);
      return () => clearTimeout(endTimer);
  }, [gameMode]);
  
  const handleRestart = useCallback(() => {
    setScore(0);
    setLines(0);
    setLevel(1);
    setBoard(createEmptyBoard());
    setNextPiece(getRandomPiece());
    setIsGameOver(false);
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full p-4 md:p-8">
      <GameOverDialog
        isOpen={isGameOver}
        score={score}
        mode={gameMode}
        onRestart={handleRestart}
      />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-start max-w-7xl mx-auto">
        {/* Left Panel: Ghost */}
        <div className="hidden md:flex flex-col items-center gap-4">
          <h2 className="font-headline text-2xl text-muted-foreground">Ghost Battle</h2>
          <GhostBoard board={ghostBoard} />
          <div className="text-center">
            <p className="text-muted-foreground">Opponent</p>
            <p className="font-code text-lg text-accent">GridGlider</p>
          </div>
        </div>

        {/* Center Panel: Main Game */}
        <div className="flex flex-col items-center">
            <h2 className="font-headline text-3xl uppercase text-glow mb-4 tracking-widest">{gameMode}</h2>
            <GameBoard board={board} />
        </div>

        {/* Right Panel: Stats */}
        <div className="flex flex-col gap-6">
          <GameStats score={score} lines={lines} level={level} />
          <NextPiece piece={nextPiece} />
        </div>
      </div>
    </div>
  );
}
