import React from "react";

type ProfileSectionProps = {
  email: string;
  subscribePlan: string;
  nextBillingDate?: Date;
  isCanceled: boolean;
};

const ProfileSection = ({
  email,
  subscribePlan,
  nextBillingDate,
  isCanceled,
}: ProfileSectionProps) => {
  return (
    <div>
      <h2 className="text-lg font-semibold">プロフィール</h2>
      <div className="py-2">
        <div className="border rounded-lg p-4 grid gap-2">
          <div className="grid gap-1">
            <div className="text-sm font-medium">メールアドレス</div>
            <div className="text-muted-foreground">{email}</div>
          </div>
          <div className="grid gap-1">
            <div className="text-sm font-medium">現在プラン</div>
            <div className="text-muted-foreground">{subscribePlan}プラン</div>
          </div>
          <div className="grid gap-1">
            {isCanceled ? (
              <>
                <div className="text-red-500 text-sm font-medium">有効期限</div>
                <div className="text-muted-foreground">
                  {nextBillingDate?.toLocaleDateString("ja-JP")}
                </div>
              </>
            ) : (
              <>
                <div className="text-sm font-medium">次回の更新日</div>
                <div className="text-muted-foreground">
                  {nextBillingDate?.toLocaleDateString("ja-JP")}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
