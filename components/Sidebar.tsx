"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

//Hooks
import usePlayer from "@/hooks/usePlayer";

// Components
import Box from "./Box";
import Library from "./Library";
import SidebarItem from "./SidebarItem";

// Icons
import { Song } from "@/types";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
}

export default function Sidebar({ children, songs }: SidebarProps) {
  const pathName = usePathname();
  const player = usePlayer();
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Accueil",
        active: pathName !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Rechercher",
        active: pathName === "search",
        href: "/search",
      },
    ],
    [pathName]
  );

  return (
    <div
      className={twMerge(
        `flex h-full`,
        player.activeId && "h-[calc(100%-80px)]"
      )}
    >
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item}></SidebarItem>
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
}
