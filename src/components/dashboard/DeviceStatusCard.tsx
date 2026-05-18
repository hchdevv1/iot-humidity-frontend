"use client";

import { cn } from "@/lib/utils";

import { TransactionLatestItem } from "@/types/transaction-latest";

import {
  DASHBOARD_CARD_HEIGHT,
  DASHBOARD_CARD_PADDING,
  DASHBOARD_DEVICE_SPACING,
} from "@/constants/dashboard";

type Props = {
  isLoading?: boolean;

  devices?: TransactionLatestItem[];
};

export default function DeviceStatusCard({
  isLoading = false,
  devices = [],
}: Props) {
  /**
   * loading
   */
  if (isLoading) {
    return (
      <div
        className={cn(
          "bg-card rounded-3xl border border-border shadow-sm",
          DASHBOARD_CARD_PADDING,
        )}
      >
        <div className="space-y-4">
          {[1, 2].map((item) => (
            <div
              key={item}
              className={cn(
                "rounded-2xl border border-border animate-pulse bg-muted",
                DASHBOARD_CARD_HEIGHT,
              )}
            />
          ))}
        </div>
      </div>
    );
  }

  /**
   * empty
   */
  if (devices.length === 0) {
    return (
      <div
        className={cn(
          "bg-card rounded-3xl border border-border shadow-sm",
          DASHBOARD_CARD_PADDING,
        )}
      >
        <div className="h-[220px] flex items-center justify-center text-sm text-muted-foreground">
          No device data
        </div>
      </div>
    );
  }

  return (
    <div className={DASHBOARD_DEVICE_SPACING}>
      {devices.map((device, index) => {
        const isRoom =
          device.positionTypeRowId ===
          "01";

        /**
         * transaction date
         */
        const latestDate = String(
          device.latest
            ?.transactionDate,
        ).slice(0, 10);

        /**
         * thailand current date
         */
        const thailandToday =
          new Intl.DateTimeFormat(
            "en-CA",
            {
              timeZone:
                "Asia/Bangkok",
            },
          ).format(
            new Date(),
          );

        /**
         * status
         */
        const isOffline =
          latestDate !==
          thailandToday;

        const isAlert =
          device.latest
            ?.alertFlag ===
          "Y";

        const badge =
          isOffline
            ? "offline"
            : isAlert
              ? "alert"
              : null;

        /**
         * trend icon
         */
        const getTrendArrow = (
          trend?: string,
        ) => {
          switch (trend) {
            case "UP":
              return "↑";

            case "DOWN":
              return "↓";

            default:
              return "•";
          }
        };

        return (
          <div
            key={`${device.installedRowId}-${index}`}
            className={cn(
              "bg-card rounded-3xl border shadow-sm",
              DASHBOARD_CARD_PADDING,

              isOffline
                ? "border-orange-400 bg-orange-50/30"
                : "border-border",

              DASHBOARD_CARD_HEIGHT,
            )}
          >
            {/* HEADER */}
            <div className="mb-4">
              {/* Device + datetime */}
              <div className="flex items-start justify-between gap-3">
                {/* LEFT */}
                <div className="text-base font-semibold text-foreground">
                  {
                    device.assetDeviceName
                  }
                </div>

                {/* RIGHT */}
                <div className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                  {latestDate}{" "}
                  {
                    device.latest
                      ?.transactionTime
                  }
                </div>
              </div>

              {/* Department + area */}
              <div
                className="
                  text-sm
                  font-medium
                  tracking-wide
                  text-muted-foreground
                  mt-2
                  whitespace-nowrap
                  overflow-hidden
                  text-ellipsis
                "
              >
                {
                  device.departmentName
                }{" "}
                •{" "}
                {
                  device.installationArea
                }
              </div>
            </div>

            {/* MAIN VALUE */}
            <div
              className={cn(
                "grid gap-4 py-4",
                isRoom
                  ? "grid-cols-2"
                  : "grid-cols-1",
              )}
            >
              {/* Temperature */}
              <div className="text-center">
                <div
                  className="
                    text-sm
                    font-medium
                    tracking-wide
                    text-muted-foreground
                  "
                >
                  Temperature
                </div>

                <div
                  className="
                    text-[42px]
                    leading-none
                    font-bold
                    text-sky-600
                    mt-3
                  "
                >
                  {
                    device.latest
                      ?.temperature
                  }
                  °C
                </div>

                <div
                  className="
                    text-sm
                    mt-4
                    flex
                    items-center
                    justify-center
                    gap-2
                    whitespace-nowrap
                    text-muted-foreground
                  "
                >
                  <span>
                    Temp
                  </span>

                  <span>
                    {getTrendArrow(
                      device.temperatureTrend,
                    )}
                  </span>

                  <span>
                    {
                      device.temperatureDiff
                    }
                    °C
                  </span>
                </div>
              </div>

              {/* Humidity */}
              {isRoom && (
                <div className="text-center">
                  <div
                    className="
                      text-sm
                      font-medium
                      tracking-wide
                      text-muted-foreground
                    "
                  >
                    Humidity
                  </div>

                  <div
                    className="
                      text-[42px]
                      leading-none
                      font-bold
                      text-sky-600
                      mt-3
                    "
                  >
                    {
                      device.latest
                        ?.humidity
                    }
                    %
                  </div>

                  <div
                    className="
                      text-sm
                      mt-4
                      flex
                      items-center
                      justify-center
                      gap-2
                      whitespace-nowrap
                      text-muted-foreground
                    "
                  >
                    <span>
                      Humidity
                    </span>

                    <span>
                      {getTrendArrow(
                        device.humidityTrend,
                      )}
                    </span>

                    <span>
                      {
                        device.humidityDiff
                      }
                      %
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* FOOTER */}
            <div
              className="
                mt-5
                flex
                items-center
                justify-between
                gap-3
              "
            >
              {/* LEFT */}
              <div
                className="
                  text-xs
                  text-muted-foreground
                  whitespace-nowrap
                  overflow-hidden
                  text-ellipsis
                "
              >
                Previous{" "}
                {
                  device.previous
                    ?.temperature
                }
                °C /{" "}
                {
                  device.previous
                    ?.humidity
                }
                % (
                {String(
                  device.previous
                    ?.transactionDate,
                ).slice(0, 10)}{" "}
                {
                  device.previous
                    ?.transactionTime
                }
                )
              </div>

              {/* RIGHT */}
              {badge && (
                <div
                  className={
                    badge ===
                    "offline"
                      ? `
                        inline-flex
                        items-center
                        rounded-full
                        bg-slate-200
                        text-slate-700
                        text-[11px]
                        font-semibold
                        px-2.5
                        py-1
                        shrink-0
                      `
                      : `
                        inline-flex
                        items-center
                        rounded-full
                        bg-red-100
                        text-red-700
                        text-[11px]
                        font-semibold
                        px-2.5
                        py-1
                        shrink-0
                      `
                  }
                >
                  {badge ===
                  "offline"
                    ? "Offline"
                    : "Alert"}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}