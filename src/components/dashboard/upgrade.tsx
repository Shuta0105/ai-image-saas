import React from "react";
import { getUserSubscriptionStatus } from "@/lib/users";
import { Button } from "../ui/button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const Upgrade = async () => {
  const { user } = useUser();

  if (!user) {
    return;
  }

  const response = await getUserSubscriptionStatus(user.id);
  const { subscriptionStatus } = await response.json();

  return (
    <>
      {subscriptionStatus === "FREE" ? (
        <Button variant={"premium"}>
          <Link href={"/dashboard/plan"}>アップグレード</Link>
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};

export default Upgrade;
