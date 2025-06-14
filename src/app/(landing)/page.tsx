import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Button>
        <Link href={"/dashboard"}>ダッシュボードに移動する</Link>
      </Button>
    </div>
  );
};

export default LandingPage;
