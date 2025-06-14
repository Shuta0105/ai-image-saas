"use client";

import { getUserCredits } from "@/lib/credits";
import React, { useEffect, useState } from "react";

const CreditsDisplay = () => {
  const [credits, setCredits] = useState<number | null | undefined>(null);

  useEffect(() => {
    fetch("/api/user-credits")
      .then((res) => res.json())
      .then((data) => setCredits(data.credits))
      .catch(() => setCredits(null));
  }, []);

  return <div className="mt-2">{credits}</div>;
};

export default CreditsDisplay;
