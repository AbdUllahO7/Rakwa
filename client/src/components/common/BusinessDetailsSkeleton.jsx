// BusinessDetailsSkeleton.js
import { Skeleton } from "@/components/ui/skeleton";

function BusinessDetailsSkeleton() {
    return (
        <div className="flex-col gap-1 items-center justify-center w-[500px]">
            <Skeleton className="h-10 w-2/3 mb-2" /> {/* Skeleton for title */}
            <Skeleton className="h-6 w-1/2 mb-2" /> {/* Skeleton for category */}
            <Skeleton className="h-6 w-1/3 mb-2" /> {/* Skeleton for country */}
            <Skeleton className="h-6 w-1/4 mb-2" /> {/* Skeleton for state */}
            <Skeleton className="h-6 w-1/4 mb-2" /> {/* Skeleton for city */}
        </div>
    );
}

export default BusinessDetailsSkeleton;
