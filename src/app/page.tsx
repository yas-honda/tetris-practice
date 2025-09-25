import { Button } from '@/components/ui/button';
import { Gamepad2 } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 flex flex-col items-center justify-center h-full text-center py-16">
      <h1 className="font-headline text-7xl md:text-9xl font-bold text-glow mb-4 tracking-tighter">
        TETRABLAZE
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl">
        The classic block puzzle game, reimagined with a cyber-neon aesthetic, real-time leaderboards, and ghost battles.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <Link href="/play?mode=marathon" passHref>
          <Button
            variant="default"
            size="lg"
            className="w-full h-24 text-2xl font-headline transition-all duration-300 hover:neon-box-shadow hover:scale-105"
          >
            Marathon
          </Button>
        </Link>
        <Link href="/play?mode=blitz" passHref>
          <Button
            variant="outline"
            size="lg"
            className="w-full h-24 text-2xl font-headline border-accent text-accent transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:neon-box-shadow-accent hover:scale-105"
          >
            Blitz
          </Button>
        </Link>
        <Link href="/leaderboard" passHref>
          <Button
            variant="secondary"
            size="lg"
            className="w-full h-24 text-2xl font-headline transition-all duration-300 hover:scale-105 md:col-span-3"
          >
            Leaderboards
          </Button>
        </Link>
      </div>

      <div className="mt-16 flex items-center justify-center gap-2 text-muted-foreground">
        <Gamepad2 className="w-5 h-5" />
        <p className="font-code text-sm">Ready Player One</p>
      </div>
    </div>
  );
}
