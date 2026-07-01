const SkeletonCard = () => (
    <div className="rounded-3xl overflow-hidden bg-bg-card animate-pulse">
        <div className="h-52 bg-bg-secondary" />
        <div className="p-5 space-y-3">
            <div className="h-4 w-3/4 rounded bg-bg-secondary" />
            <div className="h-3 w-1/2 rounded bg-bg-secondary" />
            <div className="h-3 w-1/3 rounded bg-bg-secondary" />
        </div>
    </div>
);

export const TripsSkeletonGrid = ({ count = 3 }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-12 px-4">
        {Array.from({ length: count }).map((_, index) => (
            <SkeletonCard key={index} />
        ))}
    </div>
);
