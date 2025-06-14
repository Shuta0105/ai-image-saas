import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { navItems } from "@/config/dashboard-nav";
import { getUserCredits } from "@/lib/credits";
import { Loader2, Lock } from "lucide-react";
import Upgrade from "./upgrade";
import { currentUser } from "@clerk/nextjs/server";

const DashboardNav = async () => {
  const user = await currentUser();
  const credits = await getUserCredits();

  return (
    <div className="grid gap-3">
      {navItems.map((item) => (
        <Button
          asChild
          key={item.title}
          variant={"secondary"}
          className="justify-start"
        >
          <Link href={item.href} className="flex items-center">
            <item.icon className="mr-2" />
            {item.title}
          </Link>
        </Button>
      ))}

      <div className="p-4">
        <Suspense
          fallback={
            <div className="rounded-lg border p-2">
              <div className="text-sm text-muted-foreground">
                残りクレジット
              </div>
              <div className="flex items-center mt-2">
                <Loader2 className="animate-spin" />
                <span>読み込み中...</span>
              </div>
            </div>
          }
        >
          <div className="rounded-lg border p-2">
            <div className="text-sm text-muted-foreground">残りクレジット</div>
            {user ? (
              <div className="mt-2">{credits}</div>
            ) : (
              <div className="flex items-center mt-2">
                <Lock />
                <span className="text-sm text-muted-foreground text-center">
                  ログインが必要です
                </span>
              </div>
            )}
          </div>
        </Suspense>
      </div>

      <Upgrade />
    </div>
  );
};

export default DashboardNav;
