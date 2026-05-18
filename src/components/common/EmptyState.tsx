type Props = {
  title?: string;

  description?: string;
};

export default function EmptyState({
  title = "No data",
  description = "No records found",
}: Props) {
  return (
    <div
      className="rounded-3xl border border-border  bg-card p-10 shadow-sm text-center"
    >
      <div className="text-lg font-semibold">
        {title}
      </div>

      <div className="text-sm text-muted-foreground mt-2">
        {description}
      </div>
    </div>
  );
}