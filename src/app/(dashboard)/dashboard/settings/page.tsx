import ProfileSection from "@/components/dashboard/settings/profile-section";
import SubscriptionSettingsForm from "@/components/dashboard/settings/subscription-settings-form";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const SubscriptionSettingsPage = async () => {
  const user = await currentUser();

  if (!user) {
    return <div>ログインしてください</div>;
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
    include: { subscriptions: true },
  });

  if (!dbUser) {
    throw new Error("user not found");
  }

  return (
    <div className="p-5 mt-4">
      <div>
        <h1 className="text-3xl font-bold">設定</h1>
        <span className="text-muted-foreground">
          アカウントの確認とサブスクリプションの設定を管理します
        </span>
      </div>
      {/* アカウントの確認 */}
      <div className="py-4 max-w-2xl">
        <ProfileSection
          email={dbUser?.email}
          subscribePlan={dbUser?.subscriptionStatus}
          nextBillingDate={dbUser.subscriptions?.stripeCurrentPeriodEnd}
          isCanceled={dbUser.isCancelAtPeriodEnd}
        />
      </div>

      {/* サブスクリプション管理用のフォーム・ボタン */}
      <div className="py-4 max-w-2xl">
        <SubscriptionSettingsForm user={dbUser} />
      </div>
    </div>
  );
};

export default SubscriptionSettingsPage;
