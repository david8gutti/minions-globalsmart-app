"use client";

import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Button
      onPress={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-full text-2xl"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </Button>
  );
}
