
import { ReactNode } from "react";
import Navbar from "./Navbar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className={cn("container py-6 px-4 mx-auto", className)}>
        {children}
      </main>
    </div>
  );
}
