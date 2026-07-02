import { TripCard } from "./TripCard";
import { TripsEmptyState } from "./TripsEmptyState";

export const MyTripsContent = ({ trips, filteredTrips, onDelete }) => {
    if (trips.length === 0) {
        return <TripsEmptyState variant="none" />;
    }

    if (filteredTrips.length === 0) {
        return <TripsEmptyState variant="filtered" />;
    }

    return <TripCard trips={filteredTrips} onDelete={onDelete} showPhase />;
};