import Header from "@/components/layout/Header";
import "@/app/globals.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-dvh">
      <Header />
      <main className="mx-auto w-full max-w-[800px] px-4 pb-30 flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}
