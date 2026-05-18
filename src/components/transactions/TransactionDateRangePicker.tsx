"use client";

import * as React from "react";

import { format } from "date-fns";

import { DateRange } from "react-day-picker";

import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  value?: DateRange;

  onChange: (value?: DateRange) => void;
};

export default function TransactionDateRangePicker({ value, onChange }: Props) {
  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[280px] justify-start text-left font-normal rounded-2xl",
              !value && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />

            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "yyyy-MM-dd")} -{" "}
                  {format(value.to, "yyyy-MM-dd")}
                </>
              ) : (
                format(value.from, "yyyy-MM-dd")
              )
            ) : (
              <span>Pick date range</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
