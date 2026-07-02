import { getTripPhase } from "./tripPhase";

export const getTripDurationInDays = (trip) => {
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);

    if (isNaN(start) || isNaN(end)) return 0;

    return Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
};

export const getTripCounts = (trips) => ({
    all: trips.length,
    upcoming: trips.filter((trip) => getTripPhase(trip) === "upcoming").length,
    ongoing: trips.filter((trip) => getTripPhase(trip) === "ongoing").length,
    past: trips.filter((trip) => getTripPhase(trip) === "past").length,
});

export const getDestinationCount = (trips) => new Set(trips.map((trip) => trip.city)).size;

export const getTotalDays = (trips) => trips.reduce((sum, trip) => sum + getTripDurationInDays(trip), 0);

export const getRecentPastTrips = (trips, limit = 3) => {
    return trips
        .filter((trip) => getTripPhase(trip) === "past")
        .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
        .slice(0, limit);
};