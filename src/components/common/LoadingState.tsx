type Props = {
  title?: string;
};

export default function LoadingState({
  title = "Loading...",
}: Props) {
  return (
    <div
      className=" rounded-3xl border border-border  bg-card p-6  shadow-sm "
    >
      <div className="space-y-4 animate-pulse">
        <div className="h-5 w-40 bg-muted rounded-xl" />

        <div className="h-[180px] bg-muted rounded-2xl" />

        <div className="space-y-2">
          <div className="h-4 bg-muted rounded-lg" />
          <div className="h-4 w-3/4 bg-muted rounded-lg" />
        </div>
      </div>

      <div className="mt-5 text-sm text-muted-foreground">
        {title}
      </div>
    </div>
  );
}