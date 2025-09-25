import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockLeaderboard_blitz, mockLeaderboard_marathon } from "@/lib/mock-data";
import { Crown, Trophy } from "lucide-react";
import placeholderImageData from '@/lib/placeholder-images.json';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { LeaderboardScore } from "@/types";

const { placeholderImages } = placeholderImageData;

function getRankIcon(rank: number) {
  if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
  if (rank === 2) return <Crown className="w-5 h-5 text-slate-400" />;
  if (rank === 3) return <Crown className="w-5 h-5 text-amber-600" />;
  return <span className="text-muted-foreground font-medium">{rank}</span>;
}

function LeaderboardTable({ scores }: { scores: LeaderboardScore[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px] text-center">Rank</TableHead>
          <TableHead>Player</TableHead>
          <TableHead className="text-right">Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scores.map((entry, index) => {
          const rank = index + 1;
          const avatar = placeholderImages.find(img => img.id === entry.avatarId) ?? placeholderImages.find(img => img.id === 'anonymous');
          return (
            <TableRow key={entry.uid} className={cn(rank <=3 && "bg-secondary/50")}>
              <TableCell className="text-center">
                <div className="flex justify-center items-center h-full">
                  {getRankIcon(rank)}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={avatar?.imageUrl} alt={entry.displayName} data-ai-hint={avatar?.imageHint}/>
                    <AvatarFallback>{entry.displayName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{entry.displayName}</span>
                </div>
              </TableCell>
              <TableCell className="text-right font-code text-lg text-primary">{entry.score.toLocaleString()}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center mb-8">
        <Trophy className="w-16 h-16 text-primary text-glow mb-4" />
        <h1 className="text-5xl font-headline font-bold">Leaderboards</h1>
        <p className="text-muted-foreground mt-2">See who's on top of the grid.</p>
      </div>

      <Tabs defaultValue="marathon" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="marathon">Marathon</TabsTrigger>
          <TabsTrigger value="blitz">Blitz</TabsTrigger>
        </TabsList>
        <TabsContent value="marathon">
          <LeaderboardTable scores={mockLeaderboard_marathon} />
        </TabsContent>
        <TabsContent value="blitz">
          <LeaderboardTable scores={mockLeaderboard_blitz} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
