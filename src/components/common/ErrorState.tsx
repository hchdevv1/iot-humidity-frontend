"use client";

import { Button } from "@/components/ui/button";

type Props = {
  title?: string;

  description?: string;

  onRetry?: () => void;
};

export default function ErrorState({
  title = "Something went wrong",
  description = "Failed to load data",
  onRetry,
}: Props) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-red-200
        bg-red-50/40
        p-6
        shadow-sm
      "
    >
      <div className="text-lg font-semibold text-red-700">
        {title}
      </div>

      <div className="text-sm text-red-600 mt-2">
        {description}
      </div>

      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="mt-5 rounded-2xl"
        >
          Retry
        </Button>
      )}
    </div>
  );
}