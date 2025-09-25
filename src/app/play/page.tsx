import GameArea from "@/components/game/game-area";
import { Suspense } from "react";

function PlayContent({ mode }: { mode: "marathon" | "blitz" }) {
    return <GameArea gameMode={mode} />;
}


export default function PlayPage({ searchParams }: { searchParams: { mode?: string } }) {
  const mode = searchParams.mode === 'blitz' ? 'blitz' : 'marathon';

  return (
    <div className="w-full h-full flex-1 overflow-hidden">
        <Suspense fallback={<div>Loading Game...</div>}>
            <PlayContent mode={mode} />
        </Suspense>
    </div>
  );
}
