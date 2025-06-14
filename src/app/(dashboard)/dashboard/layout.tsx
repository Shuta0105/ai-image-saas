import AuthButton from "@/components/auth/auth-button";
import DashboardNav from "@/components/dashboard/dashboard-nav";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* header */}
      <header className="flex items-center p-3.5 border-b">
        <Link href={"/"}>
          <h1 className="text-lg font-bold">AI Image Generater</h1>
        </Link>
        <div className="ml-auto">
          <AuthButton />
        </div>
      </header>

      {/* dashboard */}
      <div className="grid grid-cols-[220px_minmax(0,1fr)] px-4 gap-6 min-h-screen">
        {/* sidebar */}
        <div className="py-6 pr-4 border-r h-full">
          <DashboardNav />
        </div>
        {/* main contents */}
        <div>{children}</div>
      </div>
    </div>
  );
}
