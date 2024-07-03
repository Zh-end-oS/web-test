import { NavLink, useLocation } from "react-router-dom";
import { cn } from "./ui/lib/cn";

export default function Header() {
  const location = useLocation();

  return (
    <header className="flex gap-4 justify-end items-center w-full px-4 h-12 z-40 absolute">
      <NavLink
        className={cn(
          "manrope select-none underline transition-all duration-1000 ease-in-out",
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
          "manrope select-none underline transition-all duration-1000 ease-in-out",
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
