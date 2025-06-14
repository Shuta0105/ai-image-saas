"use client";

import { getUserCredits } from "@/lib/credits";
import React, { useEffect, useState } from "react";

const CreditsDisplay = () => {
  const [credits, setCredits] = useState<number | null | undefined>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await getUserCredits();
      setCredits(response);
    };
    fetchUserData();
  }, [credits]);

  return <div className="mt-2">{credits}</div>;
};

export default CreditsDisplay;
