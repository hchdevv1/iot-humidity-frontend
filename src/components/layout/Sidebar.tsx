"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import Image from "next/image";

import {
  BellRing,
  ClipboardList,
  LayoutDashboard,
  TriangleAlert,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { useOfflineDevices } from "@/hooks/useOfflineDevices";

const menus = [
  {
    name: "Dashboard",

    href: "/dashboard",

    icon: LayoutDashboard,
  },

  {
    name: "Transactions",

    href: "/transactions",

    icon: ClipboardList,
  },

  {
    name: "Offline Devices",

    href: "/offline-devices",

    icon: TriangleAlert,
  },

  {
    name: "Alert Channels",

    href: "/alert-channels",

    icon: BellRing,
  },


];

export default function Sidebar() {
  const pathname =
    usePathname();

  /**
   * offline devices
   */
  const {
    data:
      offlineDevices = [],
  } = useOfflineDevices();

  const offlineCount =
    offlineDevices.length;

  return (
    <aside className="w-[200px] min-h-screen bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border shadow-sm">
      {/* LOGO */}
      <div className="h-[180px] flex flex-col items-center justify-center border-b border-sidebar-border px-6 py-6">
        <div className="flex items-center justify-center transition-all duration-300 hover:scale-[1.02]">
          <Image
            src="/images/HCH_IoT.png"
            alt="Hospital Logo"
            width={120}
            height={120}
            priority
            className="object-contain rounded-[28px] drop-shadow-[0_10px_20px_rgba(0,0,0,0.18)]"
          />
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menus.map((menu) => {
          const Icon =
            menu.icon;

          const isActive =
            pathname ===
            menu.href;

          const isOfflineMenu =
            menu.href ===
            "/offline-devices";

          return (
            <Link
              key={menu.name}
              href={menu.href}
              className={cn(
                "group flex items-center justify-between gap-3 px-4 py-3 rounded-2xl transition-all duration-200 font-medium",

                isActive
                  ? "bg-sidebar-accent text-sidebar-foreground shadow-md backdrop-blur-sm"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground"
              )}
            >
              {/* LEFT */}
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  size={20}
                  className="transition-transform duration-200 group-hover:scale-105 shrink-0"
                />

                <span className="truncate">
                  {menu.name}
                </span>
              </div>

              {/* BADGE */}
              {isOfflineMenu &&
                offlineCount >
                  0 && (
                  <div
                    className=" shrink-0  min-w-[24px]  h-[24px]  px-2  rounded-full  bg-orange-500  text-white text-xs font-semibold flex  items-center  justify-center shadow-sm"
                  >
                    {
                      offlineCount
                    }
                  </div>
                )}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="px-5 py-4 border-t border-sidebar-border">
        <div className="text-sm font-medium text-sidebar-foreground/90">
          Hospital Environment
        </div>

        <div className="text-xs text-sidebar-foreground/60 mt-1">
          Monitoring Dashboard
        </div>
      </div>
    </aside>
  );
}