"use server";

import { z } from "zod";

const scoreSchema = z.object({
  score: z.number().min(0),
  mode: z.enum(["marathon", "blitz"]),
  replayData: z.string(),
});

export async function submitScore(data: {
  score: number;
  mode: 'marathon' | 'blitz';
  replayData: string;
}) {
  const validation = scoreSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, error: "Invalid score data." };
  }

  const { score, mode, replayData } = validation.data;

  // Here you would call the `onScoreSubmit` Cloud Function
  // For example:
  // const functions = getFunctions();
  // const onScoreSubmit = httpsCallable(functions, 'onScoreSubmit');
  // await onScoreSubmit({ score, mode, replayData });

  // Simulate a delay for the backend call
  await new Promise(res => setTimeout(res, 500));

  console.log("Score submitted to backend:", { score, mode, replayDataLength: replayData.length });

  // In a real scenario, the Cloud Function would handle all database operations.
  // This server action acts as a secure gateway to the function.

  return { success: true, message: "Score submitted successfully!" };
}
