"use client";

import React, { useActionState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Download, Image, Loader2 } from "lucide-react";
import { generateImage } from "@/actions/action";
import { SignInButton, useUser } from "@clerk/nextjs";

const initialState = {
  imageUrl: undefined,
  keyword: undefined,
};

const ImageGenerator = () => {
  const { isSignedIn } = useUser();

  const [state, formAction, isPending] = useActionState(
    generateImage,
    initialState
  );

  const handleDownload = () => {
    if (!state.imageUrl) return;

    const link = document.createElement("a");
    link.href = state.imageUrl;
    if (state.keyword) {
      link.download = `${state.keyword}.png`;
    }
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  return (
    <div>
      <form action={formAction}>
        <div className="space-y-3">
          <Label>キーワード</Label>
          <Input
            type="text"
            name="keyword"
            placeholder="作成したい画像のキーワードを入力(例： 海、 山、 都会、 自然)"
          />
          {isSignedIn ? (
            <Button type="submit" className="w-full">
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Image />
                  画像を生成
                </>
              )}
            </Button>
          ) : (
            <SignInButton mode="modal">
              <Button type="button" className="w-full">
                <Image />
                ログインして画像を生成
              </Button>
            </SignInButton>
          )}
        </div>
      </form>

      {state.imageUrl && (
        <div className="space-y-3 mt-3">
          <div className="overflow-hidden rounded-lg border">
            <div className="aspect-video">
              <img src={state.imageUrl} className=" w-full h-full" />
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

export default ImageGenerator;
