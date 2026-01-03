import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-10 w-20 rounded-full glass" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative h-10 w-20 rounded-full p-1 transition-all duration-500",
        "glass hover:shadow-lg",
        "group"
      )}
    >
      {/* Slider */}
      <div
        className={cn(
          "absolute top-1 h-8 w-8 rounded-full transition-all duration-500",
          "bg-gradient-to-br shadow-lg",
          isDark
            ? "left-11 from-indigo-500 to-purple-600"
            : "left-1 from-amber-400 to-orange-500"
        )}
      >
        {isDark ? (
          <Moon className="h-4 w-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
        ) : (
          <Sun className="h-4 w-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
        )}
      </div>

      {/* Icons in background */}
      <div className="relative h-full flex items-center justify-between px-2">
        <Sun className={cn(
          "h-4 w-4 transition-all duration-500",
          !isDark ? "opacity-0" : "opacity-40"
        )} />
        <Moon className={cn(
          "h-4 w-4 transition-all duration-500",
          isDark ? "opacity-0" : "opacity-40"
        )} />
      </div>
    </button>
  );
}
