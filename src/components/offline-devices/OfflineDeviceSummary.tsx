type Props = {
  total: number;
};

export default function OfflineDeviceSummary({
  total,
}: Props) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-border
        bg-card
        shadow-sm
        p-6
      "
    >
      <div className="text-sm text-muted-foreground">
        Total Offline Devices
      </div>

      <div
        className="
          mt-2
          text-4xl
          font-bold
          text-orange-600
        "
      >
        {total}
      </div>
    </div>
  );
}