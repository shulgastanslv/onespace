"use client";

import { Switch } from "@nextui-org/react";
import { MoonIcon } from "lucide-react";
import { SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      defaultSelected={theme === "dark"}
      size="sm"
      color="warning"
      startContent={<SunIcon className="h-4 w-4" />}
      endContent={<MoonIcon className="h-4 w-4" />}
      onValueChange={(isSelected) => setTheme(isSelected ? "dark" : "light")}
      aria-label="Change theme"
    />
  );
}