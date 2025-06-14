import {
  Image,
  Layers,
  LayoutDashboard,
  LucideProps,
  Settings,
} from "lucide-react";

export const navItems: NavItem[] = [
  {
    title: "ダッシュボード",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "画像生成",
    href: "/dashboard/tools/generate-image",
    icon: Image,
  },
  {
    title: "背景削除",
    href: "/dashboard/tools/remove-background",
    icon: Layers,
  },
  {
    title: "設定",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export type NavItem = {
  title: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};
