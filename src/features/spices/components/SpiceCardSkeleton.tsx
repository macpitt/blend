import { Skeleton } from "@/components/ui/skeleton";

export function SpiceCardSkeleton(): JSX.Element {
  return (
    <div className="spice-card p-4">
      <div className="flex items-start justify-between mb-2">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-12" />
      </div>
      <div className="flex items-center gap-1 mt-2">
        {Array(3).fill(null).map((_, i) => (
          <Skeleton key={i} className="h-4 w-4 rounded-full" />
        ))}
      </div>
    </div>
  );
}