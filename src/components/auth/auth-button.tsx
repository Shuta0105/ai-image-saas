"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";

const AuthButton = () => {
  const { user } = useUser();

  if (user) {
    return (
      <div className="mr-5">
        <UserButton appearance={{ elements: { avatarBox: "!h-12 !w-12" } }} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <SignInButton
          mode="modal"
          forceRedirectUrl={"/dashboard"}
          fallbackRedirectUrl={"/dashboard"}
        >
          <Button variant={"outline"}>サインイン</Button>
        </SignInButton>
        <SignUpButton
          mode="modal"
          forceRedirectUrl={"/dashboard"}
          fallbackRedirectUrl={"/dashboard"}
        >
          <Button variant={"outline"}>サインアップ</Button>
        </SignUpButton>
      </div>
    </div>
  );
};

export default AuthButton;
