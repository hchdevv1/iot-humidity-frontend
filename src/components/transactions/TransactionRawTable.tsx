"use client";

import {
  RefObject,
  useMemo,
  useState,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import LoadingState from "@/components/common/LoadingState";

import ErrorState from "@/components/common/ErrorState";

import EmptyState from "@/components/common/EmptyState";

import { exportCsv } from "@/utils/export/exportCsv";

import { exportPdf } from "@/utils/export/exportPdf";

import { TransactionRangeDevice } from "@/types/transaction-range";

type Props = {
  chartRef?: RefObject<HTMLDivElement | null>;

  data?: TransactionRangeDevice[];

  isLoading?: boolean;

  isError?: boolean;

  onRetry?: () => void;
};

type TableRow = {
  date: string;

  time: string;

  temperature?: number;

  humidity?: number;
};

export default function TransactionRawTable({
  chartRef,
  data = [],
  isLoading = false,
  isError = false,
  onRetry,
}: Props) {
  /**
   * pagination
   */
  const [currentPage, setCurrentPage] =
    useState(1);

  const [pageSize, setPageSize] =
    useState(20);

  /**
   * safe device
   */
  const device = data[0];

  /**
   * room
   */
  const isRoom =
    device?.positionTypeRowId ===
    "01";

  /**
   * flatten rows
   */
  const rows = useMemo(() => {
    if (!device) {
      return [];
    }

    const result: TableRow[] = [];

    device.series.forEach(
      (daySeries) => {
        daySeries.temperatureSeries.forEach(
          (temp, index) => {
            const humidity =
              daySeries
                .humiditySeries?.[
                index
              ];

            result.push({
              date:
                daySeries.date,

              time: temp.time,

              temperature:
                temp.value,

              humidity:
                humidity?.value,
            });
          }
        );
      }
    );

    return result;
  }, [device]);

  /**
   * total pages
   */
  const totalPages =
    Math.ceil(
      rows.length / pageSize
    );

  /**
   * paginated rows
   */
  const paginatedRows =
    rows.slice(
      (currentPage - 1) *
        pageSize,

      currentPage * pageSize
    );

  /**
   * export rows
   */
  const exportRows = rows.map(
    (row) => ({
      Date: row.date,

      Time: row.time,

      Temperature:
        row.temperature,

      Humidity:
        isRoom
          ? row.humidity
          : undefined,
    })
  );

  /**
   * loading
   */
  if (isLoading) {
    return (
      <LoadingState title="Loading raw transactions..." />
    );
  }

  /**
   * error
   */
  if (isError) {
    return (
      <ErrorState
        title="Raw Data Error"
        description="Failed to load transaction table"
        onRetry={onRetry}
      />
    );
  }

  /**
   * empty
   */
  if (
    !device ||
    data.length === 0
  ) {
    return (
      <EmptyState
        title="No transaction data"
        description="No records found for selected date range"
      />
    );
  }

  return (
    <div
      className="
        rounded-3xl
        border
        border-border
        bg-card
        shadow-sm
        overflow-hidden
      "
    >
      {/* HEADER */}
      <div
        className="
          p-6
          border-b
          border-border
          flex
          items-start
          justify-between
          gap-4
        "
      >
        {/* LEFT */}
        <div>
          <div className="text-lg font-semibold">
            Raw Transaction Data
          </div>

          <div className="text-sm text-muted-foreground mt-1">
            {
              device.assetDeviceName
            }{" "}
            •{" "}
            {
              device.departmentName
            }
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          {/* CSV */}
          <Button
            variant="outline"
            className="rounded-2xl"
            onClick={() =>
              exportCsv(
                exportRows,
                `${device.assetDeviceName}-${Date.now()}.csv`
              )
            }
          >
            <Download className="h-4 w-4 mr-2" />

            Export CSV
          </Button>

          {/* PDF */}
          <Button
            className="rounded-2xl"
            onClick={async () => {
              if (
                !chartRef?.current
              ) {
                return;
              }

              await exportPdf({
                device,

                chartElement:
                  chartRef.current,

                rows,
              });
            }}
          >
            <FileText className="h-4 w-4 mr-2" />

            Export PDF
          </Button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-auto max-h-[700px]">
        <table className="w-full text-sm">
          <thead
            className=" sticky top-0 z-10  bg-muted/80 backdrop-blur-sm "
          >
            <tr className="border-b border-border">
              <th className="text-left px-4 py-3 font-medium whitespace-nowrap">
                Date
              </th>

              <th className="text-left px-4 py-3 font-medium whitespace-nowrap">
                Time
              </th>

              <th className="text-right px-4 py-3 font-medium whitespace-nowrap">
                Temperature
              </th>

              {isRoom && (
                <th className="text-right px-4 py-3 font-medium whitespace-nowrap">
                  Humidity
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {paginatedRows.map(
              (
                row,
                index
              ) => (
                <tr
                  key={`${row.date}-${row.time}-${index}`}
                  className=" border-b  border-border/50  hover:bg-muted/30 transition-colors  "
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.date}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.time}
                  </td>

                  <td
                    className="  px-4  py-3 text-right  whitespace-nowrap  font-medium  text-sky-600  "
                  >
                    {
                      row.temperature
                    }
                    °C
                  </td>

                  {isRoom && (
                    <td
                      className="  px-4  py-3  text-right whitespace-nowrap  font-medium  text-cyan-600 "
                    >
                      {
                        row.humidity
                      }
                      %
                    </td>
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div
        className="px-6 py-4 border-t border-border flex items-center justify-between gap-4 "
      >
        {/* LEFT */}
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          {(currentPage - 1) *
            pageSize +
            1}{" "}
          -
          {Math.min(
            currentPage *
              pageSize,
            rows.length
          )}{" "}
          of {rows.length} rows
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* PAGE SIZE */}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(
                Number(
                  e.target.value
                )
              );

              setCurrentPage(1);
            }}
            className=" h-9 rounded-xl  border border-border  bg-background px-3 text-sm"
          >
            <option value={20}>
              20
            </option>

            <option value={50}>
              50
            </option>

            <option value={100}>
              100
            </option>
          </select>

          {/* PREV */}
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl"
            disabled={
              currentPage === 1
            }
            onClick={() =>
              setCurrentPage(
                (prev) =>
                  prev - 1
              )
            }
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* PAGE */}
          <div className="text-sm font-medium min-w-[90px] text-center">
            Page {currentPage} /{" "}
            {totalPages || 1}
          </div>

          {/* NEXT */}
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl"
            disabled={
              currentPage ===
                totalPages ||
              totalPages === 0
            }
            onClick={() =>
              setCurrentPage(
                (prev) =>
                  prev + 1
              )
            }
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}