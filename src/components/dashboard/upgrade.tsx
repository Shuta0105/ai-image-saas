"use client";

import React, { useEffect, useState } from "react";
import { getUserSubscriptionStatus } from "@/lib/users";
import { Button } from "../ui/button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const Upgrade = async () => {
  const { user } = useUser();
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>("");

  if (!user) {
    return;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await getUserSubscriptionStatus(user.id);
      const { subscriptionStatus } = await response.json();
      setSubscriptionStatus(subscriptionStatus);
    };
    fetchUserData();
  }, []);

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
