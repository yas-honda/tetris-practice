import { AuthForm } from "@/components/auth/auth-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2 } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="container flex h-full items-center justify-center py-12">
      <Card className="w-full max-w-md mx-auto border-primary/20 shadow-lg neon-box-shadow">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Gamepad2 className="w-12 h-12 text-primary text-glow"/>
          </div>
          <CardTitle className="text-3xl font-headline text-glow">Get in the Game</CardTitle>
          <CardDescription>Choose a provider to start your journey.</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm />
        </CardContent>
      </Card>
    </div>
  );
}
