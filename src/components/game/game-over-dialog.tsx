"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { submitScore } from "@/app/actions";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface GameOverDialogProps {
  isOpen: boolean;
  score: number;
  mode: 'marathon' | 'blitz';
  onRestart: () => void;
}

export function GameOverDialog({ isOpen, score, mode, onRestart }: GameOverDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Mock replay data
    const replayData = JSON.stringify({
      finalScore: score,
      timestamp: Date.now(),
      moves: [],
    });

    const result = await submitScore({ score, mode, replayData });

    if (result.success) {
      toast({
        title: "Score Submitted!",
        description: `Your score of ${score.toLocaleString()} has been saved.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: result.error || "Could not save your score.",
      });
    }
    setIsSubmitting(false);
    onRestart(); // Close dialog and restart game
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl font-headline text-center text-glow">Game Over</AlertDialogTitle>
          <AlertDialogDescription className="text-center text-lg">
            Your final score is:
            <p className="font-code text-4xl text-primary font-bold my-4">
              {score.toLocaleString()}
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogCancel onClick={onRestart}>Restart</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Score
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
