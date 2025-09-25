"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import placeholderImageData from '@/lib/placeholder-images.json';
import { BarChart, Gamepad2, Hash, Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const { placeholderImages } = placeholderImageData;

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-6">
          <Skeleton className="h-32 w-32 rounded-full" />
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  const avatar = placeholderImages.find(img => img.id === user.avatarId) ?? placeholderImages.find(img => img.id === 'anonymous');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center gap-4 text-center">
        <Avatar className="h-32 w-32 border-4 border-primary neon-box-shadow">
          <AvatarImage src={avatar?.imageUrl} alt={user.displayName} data-ai-hint={avatar?.imageHint}/>
          <AvatarFallback className="text-4xl">{user.displayName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-4xl font-headline font-bold">{user.displayName}</h1>
          <p className="text-muted-foreground">
            Joined {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-headline font-semibold mb-6 text-center">Player Stats</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Marathon High Score</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-code text-primary">{user.stats.highScore_marathon.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blitz High Score</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-code text-accent-foreground dark:text-accent">{user.stats.highScore_blitz.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Lines Cleared</CardTitle>
              <Hash className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-code">{user.stats.totalLinesCleared.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Games Played</CardTitle>
              <Gamepad2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-code">{user.stats.gamesPlayed.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
