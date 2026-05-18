"use client";

import QRCode from "react-qr-code";

import { Button } from "@/components/ui/button";

import { AlertChannel } from "@/types/alert-channel";

type Props = {
  item: AlertChannel;
};

export default function AlertChannelCard({
  item,
}: Props) {
  /**
   * open discord
   */
  const handleOpenDiscord =
    () => {
      window.open(
        item.groupLink,
        "_blank"
      );
    };

  return (
    <div
      className=" rounded-3xl  border  border-border bg-card  shadow-sm p-5 h-full "
    >
      <div
        className="flex items-center gap-5  "
      >
        {/* LEFT */}
        <div
          className="shrink-0 rounded-2xl border  border-border​ bg-white p-3 "
        >
          <QRCode
            value={
              item.groupLink
            }
            size={100}
          />
        </div>

        {/* RIGHT */}
        <div className="min-w-0 flex-1">
          {/* GROUP NAME */}
          <div
            className=" text-lg font-semibold text-foreground leading-tight "
          >
            {item.groupName}
          </div>

          {/* DESCRIPTION */}
          <div
            className=" mt-2 text-sm  text-muted-foreground leading-relaxed
            "
          >
            {
              item.groupDescription
            }
          </div>

          {/* BUTTON */}
          <div className="mt-4">
            <Button
              size="sm"
              className="rounded-2xl"
              onClick={
                handleOpenDiscord
              }
            >
              Open Discord
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}