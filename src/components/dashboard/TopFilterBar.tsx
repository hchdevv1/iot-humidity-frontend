"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { useState } from "react";

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

import { cn } from "@/lib/utils";

import { useDepartments } from "@/hooks/useDepartments";

import { usePositionTypesByDepartment } from "@/hooks/usePositionTypesByDepartment";

type Props = {
  departmentRowId?: number;

  positionTypeRowId?: string;

  onDepartmentChange: (value?: number) => void;

  onPositionTypeChange: (value: string) => void;
};

export default function TopFilterBar({
  departmentRowId,

  positionTypeRowId,

  onDepartmentChange,

  onPositionTypeChange,
}: Props) {
  /**
   * popover states
   */
  const [departmentOpen, setDepartmentOpen] = useState(false);

  const [positionOpen, setPositionOpen] = useState(false);

  /**
   * departments
   */
  const { data: departments = [] } = useDepartments();

  /**
   * position types
   */
  const { data: positionTypes = [], isLoading: isPositionTypesLoading } =
    usePositionTypesByDepartment(departmentRowId);

  return (
    <div
      className=" rounded-3xl border  border-border  bg-card  shadow-sm  px-5  py-5  "
    >
      <div  className="  flex flex-wrap  items-end gap-4 " >
        {/* DEPARTMENT */}
        <div className="w-[260px]">
          <div
            className=" mb-2  text-sm  font-medium  text-muted-foreground "
          >
            Department
          </div>

          <Popover open={departmentOpen} onOpenChange={setDepartmentOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className=" w-full  h-12  rounded-2xl  justify-between font-normal "
              >
                {departmentRowId
                  ? departments.find(
                      (d) => d.departmentRowId === departmentRowId,
                    )?.departmentName
                  : "Select Department"}

                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className="
                w-[260px]
                p-0
              "
            >
              <Command>
                <CommandInput placeholder="Search department..." />

                <CommandList>
                  <CommandEmpty>No department found.</CommandEmpty>

                  <CommandGroup>
                    <CommandItem
                      value="ALL"
                      onSelect={() => {
                        onDepartmentChange(undefined);

                        setPositionOpen(false);

                        setDepartmentOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          !departmentRowId ? "opacity-100" : "opacity-0",
                        )}
                      />
                      Select Departments
                    </CommandItem>

                    {departments.map((department) => (
                      <CommandItem
                        key={department.departmentRowId}
                        value={department.departmentName}
                        onSelect={() => {
                          onDepartmentChange(department.departmentRowId);

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

        {/* POSITION TYPE */}
        <div className="w-[260px]">
          <div
            className="mb-2  text-sm font-medium text-muted-foreground "
          >
            Position Type
          </div>

          <Popover open={positionOpen} onOpenChange={setPositionOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                disabled={
                  departmentRowId === undefined || isPositionTypesLoading
                }
                className="w-full h-12 rounded-2xl justify-between font-normal"
              >
                {positionTypeRowId && positionTypeRowId !== "ALL"
                  ? positionTypes.find(
                      (p) => p.positionTypeRowId === positionTypeRowId,
                    )?.positionTypeName
                  : "Select Position"}

                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className="
                w-[260px]
                p-0
              "
            >
              <Command>
                <CommandInput placeholder="Search position type..." />

                <CommandList>
                  <CommandEmpty>No position type found.</CommandEmpty>

                  <CommandGroup>
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
                      Select Position
                    </CommandItem>

                    {positionTypes.map((positionType, index) => (
                      <CommandItem
                        key={`${positionType.positionTypeRowId}-${index}`}
                        value={positionType.positionTypeName}
                        onSelect={() => {
                          onPositionTypeChange(positionType.positionTypeRowId);

                          setPositionOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            positionTypeRowId === positionType.positionTypeRowId
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />

                        {positionType.positionTypeName}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
