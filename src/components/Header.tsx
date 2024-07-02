import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "./ui/lib/cn";

export default function Header() {
  const location = useLocation();
  const [isFading, setIsFading] = useState(false);
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setIsFading(true);
    const fadeOutTimeout = setTimeout(() => {
      setCurrentPath(location.pathname);
      setIsFading(false);
    }, 300); // Длительность анимации fade-out
    return () => clearTimeout(fadeOutTimeout);
  }, [location.pathname]);

  return (
    <header className="flex gap-4 justify-end items-center w-full px-4 h-12 z-40 absolute">
      <NavLink
        className={cn(
          "manrope select-none underline transition-all duration-300 ease-in-out",
          location.pathname === "/"
            ? "text-white decoration-white"
            : "text-white/80 decoration-white/0"
        )}
        to="/"
      >
        О приложении
      </NavLink>
      <NavLink
        className={cn(
          "manrope select-none underline transition-all duration-300 ease-in-out",
          location.pathname === "/Quotations"
            ? "text-white decoration-white"
            : "text-white/80 decoration-white/0"
        )}
        to="/Quotations"
      >
        Котировки
      </NavLink>
    </header>
  );
}
