"use client";

import React, { useActionState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Download, Image, Layers2, Loader2 } from "lucide-react";
import { removeBackground, RemoveBackgroundState } from "@/actions/action";
import { SignInButton, useUser } from "@clerk/nextjs";

const initialState: RemoveBackgroundState = {
  processedImage: "",
};

const RemoveBackground = () => {
  const { isSignedIn } = useUser();
  const [state, formAction, isPending] = useActionState(
    removeBackground,
    initialState
  );

  const handleDownload = () => {
    if (!state.processedImage) return;

    const link = document.createElement("a");
    link.href = state.processedImage;
    link.download = `background-removed.png`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  return (
    <div>
      <form action={formAction} className="space-y-3">
        <Label>ファイルをアップロード</Label>
        <Input type="file" name="file" className="w-full" />
        {isSignedIn ? (
          <Button type="submit" className="w-full">
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Layers2 />
                背景を削除
              </>
            )}
          </Button>
        ) : (
          <SignInButton mode="modal">
            <Button type="button" className="w-full">
              <Image />
              ログインして背景を削除
            </Button>
          </SignInButton>
        )}
      </form>

      {state.processedImage && (
        <div className="space-y-3 mt-3">
          <div className="overflow-hidden rounded-lg border">
            <div className="aspect-video">
              <img src={state.processedImage} className=" w-full h-full" />
            </div>
          </div>

          <div>
            <Button
              variant={"outline"}
              className="w-full"
              onClick={handleDownload}
            >
              <Download />
              ダウンロード
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RemoveBackground;
