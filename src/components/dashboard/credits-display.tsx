"use client";

import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CreditsDisplay = () => {
  const { data } = useSWR("/api/user-credits", fetcher);

  return <div className="mt-2">{data.credits}</div>;
};

export default CreditsDisplay;
