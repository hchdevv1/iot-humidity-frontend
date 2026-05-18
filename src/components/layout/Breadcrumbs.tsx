"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter(Boolean);

  return (
    <div className="flex items-center text-sm text-gray-500">
      <Link
        href="/dashboard"
        className="hover:text-blue-600"
      >
        Dashboard
      </Link>

      {segments.map((segment, index) => {
        const href =
          "/" +
          segments
            .slice(0, index + 1)
            .join("/");

        return (
          <div
            key={href}
            className="flex items-center"
          >
            <ChevronRight
              size={16}
              className="mx-2"
            />

            <Link
              href={href}
              className="capitalize hover:text-blue-600"
            >
              {segment.replace("-", " ")}
            </Link>
          </div>
        );
      })}
    </div>
  );
}