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
  TransactionRangeDevice,
  TransactionRangeDaySeries,
} from "@/types/transaction-range";

type Props = {
  device: TransactionRangeDevice;

  day: TransactionRangeDaySeries;
};

export default function TransactionDateChartCard({
  device,
  day,
}: Props) {
  const isRoom =
    device.positionTypeRowId ===
    "01";

  /**
   * sorted temperature
   */
  const sortedTemperature =
    [
      ...day.temperatureSeries,
    ].sort(
      (a, b) =>
        a.minutes - b.minutes
    );

  /**
   * sorted humidity
   */
  const sortedHumidity = [
    ...day.humiditySeries,
  ].sort(
    (a, b) =>
      a.minutes - b.minutes
  );

  return (
    <div
      className="
        rounded-3xl
        border
        border-border
        bg-card
        p-5
        shadow-sm
      "
    >
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4 mb-5">
        {/* LEFT */}
        <div className="min-w-0">
          <div className="text-base font-semibold text-foreground">
            {
              device.assetDeviceName
            }
          </div>

          <div
            className="
              text-sm
              text-muted-foreground
              mt-1
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

        {/* RIGHT */}
        <div className="text-sm text-muted-foreground whitespace-nowrap">
          {day.date}
        </div>
      </div>

      {/* Threshold */}
      <div
        className="
          inline-flex
          items-center
          rounded-full
          bg-sky-100
          text-sky-700
          text-xs
          font-medium
          px-3
          py-1
          mb-5
        "
      >
        {
          device.threshold
            .description.normal
        }
      </div>

      {/* CHARTS */}
      <div className="space-y-4">
        {/* TEMPERATURE */}
        <div
          className="
            min-w-0
            rounded-2xl
            border
            border-border
            bg-background/60
            p-4
          "
        >
          <div className="text-sm font-medium mb-3">
            Temperature
          </div>

          <ResponsiveContainer
            width="100%"
            height={340}
          >
            <LineChart
              data={
                sortedTemperature
              }
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 20,
              }}
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

              <ReferenceArea
                y1={Number(
                  device.threshold
                    .temperature.low
                )}
                y2={Number(
                  device.threshold
                    .temperature.high
                )}
                fill="#e0f2fe"
                fillOpacity={0.4}
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

        {/* HUMIDITY */}
        {isRoom && (
          <div
            className="
              min-w-0
              rounded-2xl
              border
              border-border
              bg-background/60
              p-4
            "
          >
            <div className="text-sm font-medium mb-3">
              Humidity
            </div>

            <ResponsiveContainer
              width="100%"
              height={340}
            >
              <LineChart
                data={
                  sortedHumidity
                }
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 20,
                }}
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

                <ReferenceArea
                  y1={Number(
                    device.threshold
                      .humidity.low
                  )}
                  y2={Number(
                    device.threshold
                      .humidity.high
                  )}
                  fill="#ecfeff"
                  fillOpacity={0.4}
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
        )}
      </div>
    </div>
  );
}