"use client";

import { useState, useEffect, useCallback } from "react";
import { GameBoard } from "./game-board";
import { GameStats } from "./game-stats";
import { NextPiece } from "./next-piece";
import { GhostBoard } from "./ghost-board";
import { GameOverDialog } from "./game-over-dialog";
import { getGameConfig } from "@/lib/game-config";
import { useInterval } from "@/hooks/use-interval";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const createEmptyBoard = (): (number | string)[][] => Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0));

const TETROMINOS: { [key: string]: { shape: number[][]; color: number } } = {
  'I': { shape: [[1, 1, 1, 1]], color: 1 },
  'J': { shape: [[1, 0, 0], [1, 1, 1]], color: 7 },
  'L': { shape: [[0, 0, 1], [1, 1, 1]], color: 6 },
  'O': { shape: [[1, 1], [1, 1]], color: 2 },
  'S': { shape: [[0, 1, 1], [1, 1, 0]], color: 4 },
  'T': { shape: [[0, 1, 0], [1, 1, 1]], color: 3 },
  'Z': { shape: [[1, 1, 0], [0, 1, 1]], color: 5 },
};

const getRandomTetromino = () => {
    const tetrominos = 'IJLOSTZ';
    const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
    return TETROMINOS[randTetromino];
};


export default function GameArea({ gameMode }: { gameMode: "marathon" | "blitz" }) {
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [board, setBoard] = useState(createEmptyBoard());
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS['I'],
    collided: false,
  });
  const [nextPiece, setNextPiece] = useState(getRandomTetromino());
  const [isGameOver, setIsGameOver] = useState(false);
  const [ghostBoard, setGhostBoard] = useState(createEmptyBoard());
  const [dropTime, setDropTime] = useState<number | null>(null);

  const gameConfig = getGameConfig();
  
  const checkCollision = (p: typeof player, b: typeof board, { moveX, moveY }: {moveX: number, moveY: number}) => {
    for (let y = 0; y < p.tetromino.shape.length; y += 1) {
      for (let x = 0; x < p.tetromino.shape[y].length; x += 1) {
        if (p.tetromino.shape[y][x] !== 0) {
          if (
            !b[y + p.pos.y + moveY] ||
            !b[y + p.pos.y + moveY][x + p.pos.x + moveX] ||
            b[y + p.pos.y + moveY][x + p.pos.x + moveX] !== 0
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const resetPlayer = useCallback(() => {
    const newTetromino = nextPiece;
    const newPlayer = {
      pos: { x: BOARD_WIDTH / 2 - Math.floor(newTetromino.shape[0].length / 2), y: 0 },
      tetromino: newTetromino,
      collided: false,
    };

    if (checkCollision(newPlayer, board, { moveX: 0, moveY: 0 })) {
      setIsGameOver(true);
      setDropTime(null);
    } else {
      setPlayer(newPlayer);
    }
    
    setNextPiece(getRandomTetromino());
  }, [nextPiece, board]);

  const startGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setScore(0);
    setLines(0);
    setLevel(1);
    const newNextPiece = getRandomTetromino();
    const firstPiece = TETROMINOS['I']; // Always start with I for predictability
    setNextPiece(newNextPiece);
    setPlayer({
      pos: { x: BOARD_WIDTH / 2 - Math.floor(firstPiece.shape[0].length / 2), y: 0 },
      tetromino: firstPiece,
      collided: false,
    });
    setIsGameOver(false);
    setDropTime(1000);
  }, []);

  useEffect(() => {
    startGame();
  }, [startGame]);

  const updatePlayerPos = ({ x, y, collided }: { x: number; y: number; collided?: boolean; }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: prev.pos.x + x, y: prev.pos.y + y },
      collided: collided !== undefined ? collided : prev.collided,
    }));
  };

  const drop = () => {
    if (!isGameOver) {
      if (!checkCollision(player, board, { moveX: 0, moveY: 1 })) {
        updatePlayerPos({ x: 0, y: 1 });
      } else {
        if (player.pos.y < 1) {
          setIsGameOver(true);
          setDropTime(null);
          return;
        }
        updatePlayerPos({ x: 0, y: 0, collided: true });
      }
    }
  };

  const dropPlayer = () => {
    if (dropTime !== null) { // prevent multiple drops
        setDropTime(null);
        drop();
    }
  };

  const movePlayer = (dir: -1 | 1) => {
    if (!checkCollision(player, board, { moveX: dir, moveY: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const rotate = (matrix: number[][]) => {
    const rotatedTetromino = matrix.map((_, index) => matrix.map(col => col[index]));
    return rotatedTetromino.map(row => row.reverse());
  };

  const playerRotate = (b: typeof board) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino.shape = rotate(clonedPlayer.tetromino.shape);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, b, { moveX: 0, moveY: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino.shape[0].length) {
        // undo rotation by rotating back
        clonedPlayer.tetromino.shape = rotate(clonedPlayer.tetromino.shape);
        clonedPlayer.tetromino.shape = rotate(clonedPlayer.tetromino.shape);
        clonedPlayer.tetromino.shape = rotate(clonedPlayer.tetromino.shape);
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  };
  
  useEffect(() => {
    if (player.collided) {
        const newBoard = (prevBoard: typeof board) => {
            const newB = prevBoard.map(row => [...row]);
            player.tetromino.shape.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newB[y + player.pos.y][x + player.pos.x] = player.tetromino.color;
                    }
                });
            });

            // Check for cleared lines
            let clearedLines = 0;
            const unclearedRows = newB.filter(row => !row.every(cell => cell !== 0));
            
            clearedLines = BOARD_HEIGHT - unclearedRows.length;

            if(clearedLines > 0) {
              const newRows = Array.from({ length: clearedLines }, () => Array(BOARD_WIDTH).fill(0));
              const finalBoard = [...newRows, ...unclearedRows];
              
              setLines(prev => prev + clearedLines);
              // Basic scoring - 100 for 1, 300 for 2, 500 for 3, 800 for 4 (tetris)
              const linePoints = [0, 100, 300, 500, 800];
              const points = (linePoints[clearedLines] || 0) * (clearedLines === 4 ? gameConfig.score_multiplier_tetris : 1) * level;
              setScore(prev => prev + points);
              return finalBoard;
            }
            return newB;
        };

        setBoard(newBoard);
        resetPlayer();
    }
  }, [player.collided, resetPlayer, gameConfig.score_multiplier_tetris, level]);

  useEffect(() => {
    if (!isGameOver) {
      const newLevel = Math.floor(lines / gameConfig.level_up_speed) + 1;
      if (newLevel > level) {
        setLevel(newLevel);
        setDropTime(Math.max(1000 / newLevel, 100)); // Ensure drop time doesn't get too fast
      } else if (dropTime === null) {
        setDropTime(Math.max(1000 / level, 100));
      }
    }
  }, [lines, level, gameConfig.level_up_speed, isGameOver, dropTime]);


  useInterval(() => {
    drop();
  }, dropTime);


  const move = ({ keyCode }: { keyCode: number; }) => {
    if (!isGameOver) {
      if (keyCode === 37) { // left arrow
        movePlayer(-1);
      } else if (keyCode === 39) { // right arrow
        movePlayer(1);
      } else if (keyCode === 40) { // down arrow
        dropPlayer();
      } else if (keyCode === 38) { // up arrow (rotate)
        playerRotate(board);
      } else if (keyCode === 32) { // space bar (hard drop)
        let tempPlayer = JSON.parse(JSON.stringify(player));
        while(!checkCollision(tempPlayer, board, { moveX: 0, moveY: 1 })) {
          tempPlayer.pos.y += 1;
        }
        updatePlayerPos({x: 0, y: tempPlayer.pos.y - player.pos.y, collided: true });
        setDropTime(null);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        // prevent page scroll
        if ([32, 37, 38, 39, 40].includes(event.keyCode)) {
            event.preventDefault();
        }
        move({ keyCode: event.keyCode });
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [board, player, isGameOver, playerRotate]);

  useEffect(() => {
      const newBoard = createEmptyBoard();
      player.tetromino.shape.forEach((row, y) => {
          row.forEach((value, x) => {
              if(value !== 0) {
                  if(newBoard[y+player.pos.y] && newBoard[y+player.pos.y][x+player.pos.x] !== undefined)
                    newBoard[y+player.pos.y][x+player.pos.x] = player.tetromino.color;
              }
          });
      });
      const tempBoard = board.map((row, y) => row.map((cell, x) => cell !== 0 ? 8 : (newBoard[y][x] !== 0 ? newBoard[y][x] : 0)));
      setGhostBoard(tempBoard);

  }, [player, board]);

  
  // Game over timer for blitz mode
  useEffect(() => {
      if (gameMode === 'blitz' && !isGameOver) {
        const duration = 120000; // 2 min for blitz
        const endTimer = setTimeout(() => setIsGameOver(true), duration);
        return () => clearTimeout(endTimer);
      }
  }, [gameMode, isGameOver, startGame]);

  const handleRestart = useCallback(() => {
    startGame();
  }, [startGame]);

  // Combine player and board for rendering
  const displayBoard = createEmptyBoard();
  // Draw the board
  board.forEach((row, y) => {
      row.forEach((cell, x) => {
          if (cell !== 0) {
              displayBoard[y][x] = cell;
          }
      });
  });
  // Draw the hard drop shadow
    let shadowPlayer = JSON.parse(JSON.stringify(player));
    while(!checkCollision(shadowPlayer, board, { moveX: 0, moveY: 1 })) {
      shadowPlayer.pos.y += 1;
    }
    shadowPlayer.tetromino.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          const boardY = y + shadowPlayer.pos.y;
          const boardX = x + shadowPlayer.pos.x;
          if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH && displayBoard[boardY][boardX] === 0) {
            displayBoard[boardY][boardX] = "ghost";
          }
        }
      });
    });

  // Draw the player piece
  player.tetromino.shape.forEach((row, y) => {
      row.forEach((value, x) => {
          if (value !== 0) {
              const boardY = y + player.pos.y;
              const boardX = x + player.pos.x;
              if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
                displayBoard[boardY][boardX] = player.tetromino.color;
              }
          }
      });
  });


  return (
    <div className="flex items-center justify-center w-full h-full p-4 md:p-8" role="button" tabIndex={0} onKeyDown={(e) => move({ keyCode: e.keyCode })}>
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
            <GameBoard board={displayBoard} />
        </div>

        {/* Right Panel: Stats */}
        <div className="flex flex-col gap-6">
          <GameStats score={score} lines={lines} level={level} />
          <NextPiece piece={nextPiece.shape.map(row => row.map(cell => cell * nextPiece.color))} />
        </div>
      </div>
    </div>
  );
}
