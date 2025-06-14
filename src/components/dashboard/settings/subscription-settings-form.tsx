"use client";

import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

type SubscriptionSettingsFormProps = {
  user: User;
};

const SubscriptionSettingsForm = ({
  user,
}: SubscriptionSettingsFormProps) => {
  const router = useRouter();

  const handleSubscription = async () => {
    try {
      const response = await fetch("/api/create-portal-session", {
        method: "POST",
      });

      const data = await response.json();
      router.push(data.url);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div>
      {user.subscriptionStatus !== "FREE" ? (
        <Button onClick={handleSubscription} className="w-full">
          サブスクリプションの管理
        </Button>
      ) : (
        <Button variant={"outline"} className="w-full">
          まだサブスクリプションに登録していません
        </Button>
      )}
    </div>
  );
};

export default SubscriptionSettingsForm;
