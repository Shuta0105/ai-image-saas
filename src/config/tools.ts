import ImageGenerator from "@/components/dashboard/ImageGenerator";
import RemoveBackground from "@/components/dashboard/remove-background";

export const tools = {
  "generate-image": {
    title: "画像生成",
    description: "AIを使用してお好みの画像を生成",
    component: ImageGenerator,
  },
  "remove-background": {
    title: "背景削除",
    description: "画像から背景を自動で削除",
    component: RemoveBackground,
  },
};

export type ToolType = keyof typeof tools;
