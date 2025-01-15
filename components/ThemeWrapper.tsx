'use client';

import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen w-full bg-white dark:bg-slate-950"></div>;
  }

  return (
    <div className="relative min-h-screen w-full">
      <div className={`pointer-events-none absolute inset-0 ${theme === 'dark' ? 'absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]' : 'absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]'}`}></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}