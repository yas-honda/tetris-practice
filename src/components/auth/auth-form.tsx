"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const GoogleIcon = () => (
  <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.022,35.139,44,30.025,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);

const AppleIcon = () => (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
        <path fill="currentColor" d="M19.62 15.65c-.27.42-.52.84-.75 1.25a3.86 3.86 0 0 1-1.32 1.3c-.63.4-1.33.62-2.12.62s-1.44-.2-2.06-.58a13.92 13.92 0 0 1-2.03-1.42c-.67-.59-1.32-1.25-1.93-2C8 13.34 7.2 11.83 6.9 10.1c.03-.6.2-1.15.5-1.65.3-.5.7-.93 1.18-1.28.5-.34 1.05-.52 1.66-.52.68 0 1.28.23 1.8.68.2.17.38.37.54.6.16.23.3.48.42.75l.12.28.1.25c.04.1.06.15.07.17h.02c.02-.06.07-.16.14-.3.16-.3.34-.58.55-.83.2-.24.44-.45.7-.62.3-.2.63-.32.98-.32.32 0 .63.07.9.2.27.13.52.3.73.5a13.06 13.06 0 0 0-1.58 2.2c-.04.06-.06.12-.07.2l-.06.2c-.03.1-.05.2-.05.28v.02c0 .03.02.08.05.15.34.68.76 1.25 1.26 1.7.5.45 1.04.8 1.63 1.02.2-.02.4-.05.58-.1.08-.02.16-.04.24-.07.03-.01.05-.02.06-.03.4-.14.74-.32.98-.55a3.17 3.17 0 0 0-2.3-3.06c-1.1-.33-2.1-.2-3.03.38-.42.27-.8.59-1.12.97-.32.37-.58.78-.77 1.22a8.53 8.53 0 0 0-.25 1.4c.03.48.13.9.28 1.25.15.35.34.66.57.92.23.27.5.5.8.68.3.18.63.28.98.28.48 0 .93-.15 1.34-.44.42-.3.78-.68 1.07-1.14.06-.1.1-.18.15-.28l.1-.2c.03-.07.06-.13.08-.2h.02c-.02.04-.04.09-.07.15zM12.23 2.9c.1-.25.14-.5.14-.77a2.7 2.7 0 0 0-2.6-2.13c-.42.02-.8.1-1.15.24-.34.14-.68.32-1.02.54-.4.26-.78.57-1.12.92a5.9 5.9 0 0 0-1.1 1.45c-.3.56-.5 1.18-.58 1.86-.09.68-.05 1.3.1 1.88.3.6.72 1.15 1.25 1.65.53.5 1.1.9 1.7 1.2.3.15.6.26.9.33.25.04.5.06.75.06.63 0 1.2-.2 1.7-.58.5-.4.92-.88 1.24-1.45.32-.56.54-1.18.64-1.85.1-.67.08-1.28-.08-1.8a4.1 4.1 0 0 0-.58-1.32 2.94 2.94 0 0 1-.3-1.03z"></path>
    </svg>
);


export function AuthForm() {
  const { login, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user, router]);
  
  return (
    <div className="grid gap-4">
      <Button variant="outline" className="w-full" onClick={() => login('google')} disabled={loading}>
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
        Sign in with Google
      </Button>
      <Button variant="outline" className="w-full" onClick={() => login('apple')} disabled={loading}>
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <AppleIcon />}
        Sign in with Apple
      </Button>
      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue as
          </span>
        </div>
      </div>
      <Button variant="secondary" className="w-full" onClick={() => login('anonymous')} disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Play as Guest
      </Button>
    </div>
  );
}
