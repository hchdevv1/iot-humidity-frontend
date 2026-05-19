"use client";

import * as React from "react";

import { DateRange } from "react-day-picker";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useDepartments } from "@/hooks/useDepartments";

import { usePositionTypesByDepartment } from "@/hooks/usePositionTypesByDepartment";

import { useAssetInstalled } from "@/hooks/useAssetInstalled";

import TransactionDateRangePicker from "./TransactionDateRangePicker";

type Props = {
  departmentRowId?: number;

  positionTypeRowId?: string;

  registerRowId?: string;

  dateRange?: DateRange;

  onDepartmentChange: (value?: number) => void;

  onPositionTypeChange: (value: string) => void;

  onRegisterRowIdChange: (value: string) => void;

  onDateRangeChange: (value?: DateRange) => void;

  onSubmit: () => void;
};

export default function TransactionFilterBar({
  departmentRowId,
  positionTypeRowId,
  registerRowId,
  dateRange,
  onDepartmentChange,
  onPositionTypeChange,
  onRegisterRowIdChange,
  onDateRangeChange,
  onSubmit,
}: Props) {
  /**
   * queries
   */
  const { data: departments = [] } = useDepartments();

  /**
   * relation position types
   */
  const { data: positionTypes = [], isLoading: isPositionTypesLoading } =
    usePositionTypesByDepartment(departmentRowId);

  /**
   * devices
   */
  const { data: devices = [] } = useAssetInstalled({
    departmentRowId,

    positionTypeRowId:
      positionTypeRowId === "ALL" ? undefined : positionTypeRowId,
  });

  /**
   * popovers
   */
  const [departmentOpen, setDepartmentOpen] = React.useState(false);

  const [positionOpen, setPositionOpen] = React.useState(false);

  const [deviceOpen, setDeviceOpen] = React.useState(false);

  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-end gap-4">
        {/* Department */}
        <div className="w-full xl:w-[260px]">
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            Department
          </label>

          <Popover open={departmentOpen} onOpenChange={setDepartmentOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-12 w-full justify-between rounded-2xl"
              >
                {departmentRowId
                  ? departments.find(
                      (d) => d.departmentRowId === departmentRowId,
                    )?.departmentName
                  : "Select Departments"}

                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[260px] p-0">
              <Command>
                <CommandInput placeholder="Search Department..." />

                <CommandList>
                  <CommandEmpty>No department found.</CommandEmpty>

                  <CommandGroup>
                    {/* ALL */}
                    <CommandItem
                      value="ALL"
                      onSelect={() => {
                        onDepartmentChange(undefined);

                        onPositionTypeChange("ALL");

                        setDepartmentOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          !departmentRowId ? "opacity-100" : "opacity-0",
                        )}
                      />
                      All Departments
                    </CommandItem>

                    {departments.map((department) => (
                      <CommandItem
                        key={department.departmentRowId}
                        value={department.departmentName}
                        onSelect={() => {
                          /**
                           * relation reset
                           */
                          onDepartmentChange(department.departmentRowId);

                          onPositionTypeChange("ALL");

                          setDepartmentOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            departmentRowId === department.departmentRowId
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />

                        {department.departmentName}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Position */}
        <div className="w-full xl:w-[240px]">
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            Position Type
          </label>

          <Popover open={positionOpen} onOpenChange={setPositionOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                disabled={
                  departmentRowId === undefined || isPositionTypesLoading
                }
                className="h-12 w-full justify-between rounded-2xl"
              >
                {positionTypeRowId && positionTypeRowId !== "ALL"
                  ? positionTypes.find(
                      (p) => p.positionTypeRowId === positionTypeRowId,
                    )?.positionTypeName
                  : "Select Position"}

                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[240px] p-0">
              <Command>
                <CommandInput placeholder="Search Position..." />

                <CommandList>
                  <CommandEmpty>No position found.</CommandEmpty>

                  <CommandGroup>
                    {/* ALL */}
                    <CommandItem
                      value="ALL"
                      onSelect={() => {
                        onPositionTypeChange("ALL");

                        setPositionOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          !positionTypeRowId || positionTypeRowId === "ALL"
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      All Position Types
                    </CommandItem>

                    {positionTypes.map((position, index) => (
                      <CommandItem
                        key={`${position.positionTypeRowId}-${index}`}
                        value={position.positionTypeName}
                        onSelect={() => {
                          onPositionTypeChange(position.positionTypeRowId);

                          setPositionOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            positionTypeRowId === position.positionTypeRowId
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />

                        {position.positionTypeName}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Device */}
        <div className="w-full xl:w-[260px]">
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            Device
          </label>

          <Popover open={deviceOpen} onOpenChange={setDeviceOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-12 w-full justify-between rounded-2xl"
              >
                {registerRowId
                  ? devices.find((d) => d.registerRowId === registerRowId)
                      ?.assetDeviceName
                  : "Select Device"}

                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[260px] p-0">
              <Command>
                <CommandInput placeholder="Search Device..." />

                <CommandList>
                  <CommandEmpty>No device found.</CommandEmpty>

                  <CommandGroup>
                    {devices.map((device) => (
                      <CommandItem
                        key={device.registerRowId}
                        value={device.assetDeviceName}
                        onSelect={() => {
                          onRegisterRowIdChange(device.registerRowId);

                          setDeviceOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            registerRowId === device.registerRowId
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />

                        {device.assetDeviceName}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          
        </div>

        {/* Date */}
        <div>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            Date Range
          </label>

          <TransactionDateRangePicker 
            value={dateRange}
            onChange={onDateRangeChange}
          />
        </div>

        {/* Submit */}
        <Button onClick={onSubmit} className="h-12 rounded-2xl px-8">
          Search
        </Button>
      </div>
    </div>
  );
}
