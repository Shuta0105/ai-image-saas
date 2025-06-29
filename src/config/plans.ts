import { Crown, Rocket, Sparkles } from "lucide-react";

export const plans = [
  {
    name: "Starter",
    icon: Sparkles,
    price: "￥1,000",
    description: "個人利用に最適なエントリープラン",
    features: ["月50クレジット付与", "基本的な画像生成", "メールサポート"],
    buttonText: "Starterプランを選択",
    priceId: "price_1RYOSqGgefN37N2wiM3eMhZZ",
  },
  {
    name: "Pro",
    icon: Rocket,
    price: "￥2,000",
    description: "プロフェッショナルな制作活動に",
    features: [
      "月120クレジット付与",
      "優先サポート",
      "商用利用可能",
      "メールサポート",
    ],
    popular: true,
    buttonText: "Proプランを選択",
    priceId: "price_1RYOTHGgefN37N2wYPMaK9er",
  },
  {
    name: "Enterprise",
    icon: Crown,
    price: "￥5,000",
    description: "ビジネス向けの完全なソリューション",
    features: [
      "月300クレジット付与",
      "24時間優先サポート",
      "API利用可能",
      "メールサポート",
      "カスタマイズ可能",
    ],
    buttonText: "Enterpriseプランを選択",
    priceId: "price_1RYOThGgefN37N2w3BDxePTz",
  },
];
