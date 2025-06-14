"use server";

import { decrementCredits, getUserCredits } from "@/lib/credits";
import { GenerateImageState } from "@/types/type";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const generateImage = async (
  _state: GenerateImageState,
  formData: FormData
) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("認証が必要です");
  }

  const credits = await getUserCredits();
  if (credits == null || credits < 1) {
    redirect("/dashboard/plan?reason=insufficient_credits");
  }

  const keyword = formData.get("keyword");

  const res = await axios.post(`${process.env.BASE_URL}/api/generate-image`, {
    keyword,
  });

  decrementCredits(user.id);
  revalidatePath("/dashboard");

  return {
    imageUrl: res.data.image,
    keyword: keyword?.toString(),
  };
};



export const removeBackground = async (
  _state: RemoveBackgroundState,
  formData: FormData
): Promise<RemoveBackgroundState> => {
  const user = await currentUser();
  if (!user) {
    throw new Error("認証が必要です");
  }

  const credits = await getUserCredits();
  if (credits == null || credits < 1) {
    redirect("/dashboard/plan?reason=insufficient_credits");
  }

  const file = formData.get("file") as File;

  const newForm = new FormData();
  newForm.append("file", file);

  const res = await axios.post(
    `${process.env.BASE_URL}/api/remove-background`,
    newForm
  );

  decrementCredits(user.id);
  revalidatePath("/dashboard");

  return {
    processedImage: res.data.image,
  };
};

export type RemoveBackgroundState = {
  processedImage: string;
};
