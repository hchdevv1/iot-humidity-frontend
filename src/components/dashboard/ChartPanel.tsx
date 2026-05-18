"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  DASHBOARD_CARD_PADDING,
  DASHBOARD_CHART_HEIGHT,
} from "@/constants/dashboard";

import { cn } from "@/lib/utils";

import { TransactionChart } from "@/types/transaction-chart";

type Props = {
  isLoading?: boolean;

  charts?: TransactionChart[];
};

export default function ChartPanel({
  isLoading = false,
  charts = [],
}: Props) {
  /**
   * loading
   */
  if (isLoading) {
    return (
      <div
        className={cn(
          "bg-card rounded-3xl border border-border shadow-sm animate-pulse",
          DASHBOARD_CARD_PADDING
        )}
      >
        <div className="h-[220px] bg-muted rounded-2xl" />
      </div>
    );
  }

  /**
   * empty
   */
  if (charts.length === 0) {
    return (
      <div
        className={cn(
          "bg-card rounded-3xl border border-border shadow-sm",
          DASHBOARD_CARD_PADDING
        )}
      >
        <div className="h-[220px] flex items-center justify-center text-sm text-muted-foreground">
          No chart data
        </div>
      </div>
    );
  }

  return (
    <>
      {charts.map((device) => {
        const isRoom =
          device.positionTypeRowId ===
          "01";

        const sortedTemperature =
          [
            ...device.temperatureSeries,
          ].sort(
            (a, b) =>
              a.minutes - b.minutes
          );

        const sortedHumidity = [
          ...device.humiditySeries,
        ].sort(
          (a, b) =>
            a.minutes - b.minutes
        );

        return (
          <div
            key={
              device.installedRowId
            }
            className={cn(
              "bg-card rounded-3xl border border-border shadow-sm",
              DASHBOARD_CARD_PADDING
            )}
          >
            {/* HEADER */}
            <div className="flex items-start justify-between gap-4 mb-5">
              {/* LEFT */}
              <div className="flex items-center flex-wrap gap-3">
                <div className="text-base font-semibold text-foreground">
                  {
                    device.assetDeviceName
                  }
                </div>

                <div className="text-sm text-muted-foreground">
                  {
                    device.departmentName
                  }{" "}
                  •{" "}
                  {
                    device.installationArea
                  }
                </div>

                <div
                  className="
                    rounded-full
                    bg-sky-100
                    text-sky-700
                    text-xs
                    font-medium
                    px-3
                    py-1
                  "
                >
                  {
                    device.threshold
                      .description
                      .normal
                  }
                </div>
              </div>

              {/* RIGHT */}
              <div className="text-sm text-muted-foreground whitespace-nowrap">
                {/*
                    device.date
                  */}
              </div>
            </div>

            {/* CHARTS */}
            <div
              className={cn(
                "grid gap-4",
                isRoom
                  ? "grid-cols-1 xl:grid-cols-2"
                  : "grid-cols-1"
              )}
            >
              {/* TEMP */}
              <div className="rounded-2xl border border-border bg-background/60 p-3">
                <div className="text-sm font-medium text-foreground mb-2">
                  Temperature
                </div>

                <div
                  className={
                    DASHBOARD_CHART_HEIGHT
                  }
                >
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <LineChart
                      data={
                        sortedTemperature
                      }
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e5e7eb"
                      />

                      <XAxis
                        dataKey="time"
                        tick={{
                          fontSize: 11,
                        }}
                      />

                      <YAxis
                        tick={{
                          fontSize: 11,
                        }}
                      />

                      <Tooltip />

                      {/* threshold */}
                      <ReferenceArea
                        y1={Number(
                          device.threshold
                            .temperature
                            .low
                        )}
                        y2={Number(
                          device.threshold
                            .temperature
                            .high
                        )}
                        fill="#e0f2fe"
                        fillOpacity={0.5}
                      />

                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#0ea5e9"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* HUMIDITY */}
              {isRoom && (
                <div className="rounded-2xl border border-border bg-background/60 p-3">
                  <div className="text-sm font-medium text-foreground mb-2">
                    Humidity
                  </div>

                  <div
                    className={
                      DASHBOARD_CHART_HEIGHT
                    }
                  >
                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >
                      <LineChart
                        data={
                          sortedHumidity
                        }
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#e5e7eb"
                        />

                        <XAxis
                          dataKey="time"
                          tick={{
                            fontSize: 11,
                          }}
                        />

                        <YAxis
                          tick={{
                            fontSize: 11,
                          }}
                        />

                        <Tooltip />

                        {/* threshold */}
                        <ReferenceArea
                          y1={Number(
                            device.threshold
                              .humidity
                              .low
                          )}
                          y2={Number(
                            device.threshold
                              .humidity
                              .high
                          )}
                          fill="#ecfeff"
                          fillOpacity={0.5}
                        />

                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#06b6d4"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}