import type { ReactNode } from "react";
import ThemeToggle from "../layout/ThemeToogle";
import AuthBanner from "./AuthBanner";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative">

      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <AuthBanner />
      <div className="flex-1 flex items-center justify-center bg-[var(--bg-primary)] px-4 sm:px-6 lg:p-6 py-10">
        {children}
      </div>

    </div>
  );
}