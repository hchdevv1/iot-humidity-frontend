"use client";

import {
  useState,
} from "react";

import Link from "next/link";

import Image from "next/image";

import {
  usePathname,
} from "next/navigation";

import {
  BellRing,
  ChevronLeft,
  ChevronRight,
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
   * collapse state
   */
  const [
    collapsed,
    setCollapsed,
  ] = useState(false);

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
    <aside
      className={cn(
        ` min-h-screen bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border shadow-sm transition-all  duration-300`,

        collapsed
          ? "w-[90px]"
          : "w-[220px]",
      )}
    >
      {/* LOGO */}
      <div
        className={cn(
          `relative border-b border-sidebar-border flex flex-col items-center justify-center  transition-all   duration-300`,

          collapsed
            ? "h-[110px] px-2 py-4"
            : "h-[180px] px-6 py-6",
        )}
      >
        {/* TOGGLE */}
        <button
          onClick={() =>
            setCollapsed(
              !collapsed,
            )
          }
          className="absolute -right-3 top-1/2  -translate-y-1/2 z-50 h-7  w-7 rounded-full border border-border bg-sky-600  shadow-md  flex items-center justify-center  hover:bg-orange-500 transition"
        >
          {collapsed ? (
            <ChevronRight
              size={16}
            />
          ) : (
            <ChevronLeft
              size={16}
            />
          )}
        </button>

        {/* LOGO */}
        <div className="flex items-center justify-center transition-all duration-300 hover:scale-[1.02]">
          <Image
            src="/images/HCH_IoT.png"
            alt="Hospital Logo"
            width={
              collapsed
                ? 56
                : 120
            }
            height={
              collapsed
                ? 56
                : 120
            }
            priority
            className="object-contain rounded-[28px]  drop-shadow-[0_10px_20px_rgba(0,0,0,0.18)] transition-all duration-300 "
          />
        </div>

      </div>

      {/* MENU */}
      <nav
        className={cn(
          "flex-1 py-6 space-y-2",
          collapsed
            ? "px-2"
            : "px-4",
        )}
      >
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
                `group flex items-center  rounded-2xl transition-all  duration-200 font-medium`,

                collapsed
                  ? `justify-center  px-2 py-3 `
                  : `justify-between gap-3 px-4  py-3 `,

                isActive
                  ? `bg-sidebar-accent  text-sidebar-foreground shadow-md  backdrop-blur-sm`
                  : `text-sidebar-foreground/80  hover:bg-sidebar-accent/70  hover:text-sidebar-foreground`,
              )}
            >
              {/* LEFT */}
              <div
                className={cn(
                  `flex  items-center  min-w-0 `,

                  collapsed
                    ? "justify-center"
                    : "gap-3",
                )}
              >
                <Icon
                  size={20}
                  className="transition-transform duration-200  group-hover:scale-105 shrink-0  "
                />

                {!collapsed && (
                  <span className="truncate">
                    {menu.name}
                  </span>
                )}
              </div>

              {/* BADGE */}
              {isOfflineMenu &&
                offlineCount >
                  0 && (
                  <div
                    className={cn(
                      `shrink-0 rounded-full  bg-orange-500  text-white text-xs font-semibold flex items-center justify-center  shadow-sm `,

                      collapsed
                        ? `absolute ml-7  mt-[-18px]  min-w-[18px]  h-[18px]  text-[10px]  px-1  `
                        : `min-w-[24px]  h-[24px]  px-2​`,
                    )}
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
      <div
        className={cn(
          ` border-t border-sidebar-border `,

          collapsed
            ? ` px-2   py-4 `
            : ` px-5  py-4`,
        )}
      >
        {collapsed ? (
          <div
            className="flex  justify-center  text-xs text-sidebar-foreground/60"
          >
            IoT
          </div>
        ) : (
          <>
            <div className="text-sm font-medium text-sidebar-foreground/90">
              Huachiew hospital
            </div>
            <div className="text-xs text-sidebar-foreground/60 mt-1">
              Temperature  Humidity Monitoring
            </div>
          </>
        )}
      </div>
    </aside>
  );
}