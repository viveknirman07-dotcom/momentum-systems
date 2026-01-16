import { Skeleton } from "@/components/ui/skeleton";

export const HeroSkeleton = () => (
  <div className="container-narrow">
    <Skeleton className="h-16 w-full max-w-[800px] mb-4" />
    <Skeleton className="h-16 w-3/4 mb-6" />
    <Skeleton className="h-7 w-full max-w-[600px] mb-4" />
    <Skeleton className="h-7 w-1/2 mb-12" />
    <div className="flex gap-4">
      <Skeleton className="h-12 w-32" />
      <Skeleton className="h-12 w-24" />
    </div>
  </div>
);

export const ServiceCardSkeleton = () => (
  <div className="border rounded-xl p-6 bg-[hsl(var(--card))] border-[hsl(var(--line-hair))] h-full">
    <div className="flex items-start justify-between mb-4">
      <Skeleton className="w-8 h-8 rounded" />
    </div>
    <Skeleton className="h-7 w-3/4 mb-3" />
    <Skeleton className="h-5 w-full mb-2" />
    <Skeleton className="h-5 w-2/3 mb-4" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-3/5" />
    </div>
  </div>
);

export const ServicesGridSkeleton = () => (
  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" style={{
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
  }}>
    {Array.from({ length: 6 }).map((_, i) => (
      <ServiceCardSkeleton key={i} />
    ))}
  </div>
);

export const TestimonialSkeleton = () => (
  <div className="border border-[hsl(var(--line-hair))] rounded-xl p-6 bg-[hsl(var(--card))] h-full">
    <Skeleton className="h-5 w-full mb-2" />
    <Skeleton className="h-5 w-4/5 mb-2" />
    <Skeleton className="h-5 w-3/4 mb-6" />
    <div>
      <Skeleton className="h-4 w-24 mb-1" />
      <Skeleton className="h-3 w-32" />
    </div>
  </div>
);

export const PillarSkeleton = () => (
  <div>
    <Skeleton className="h-8 w-3/4 mb-4" />
    <Skeleton className="h-5 w-full mb-2" />
    <Skeleton className="h-5 w-4/5" />
  </div>
);
