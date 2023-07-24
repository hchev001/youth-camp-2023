"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16 font-mono bg-amber-700">
      <div className="flex flex-col gap-4">
        <Button onClick={() => router.push("/KingOfHill")} variant="success">
          King of Hill
        </Button>
        <Button onClick={() => router.push("/point-battle")} variant="primary">
          Point Battle
        </Button>
        <Button variant="secondary">Settings</Button>
      </div>
    </main>
  );
}
