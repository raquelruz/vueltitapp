import { TRIP_PHASES } from "../../utils/tripPhase";

const TABS = [
    { key: "all", label: "Todos" },
    { key: "upcoming", label: TRIP_PHASES.upcoming.label },
    { key: "ongoing", label: TRIP_PHASES.ongoing.label },
    { key: "past", label: TRIP_PHASES.past.label },
];

export const TripsFilterTabs = ({ active, onChange, counts }) => (
    <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => {
            const isActive = active === tab.key;
            const count = counts[tab.key] ?? 0;

            return (
                <button
                    key={tab.key}
                    onClick={() => onChange(tab.key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                        isActive
                            ? "bg-primary text-text-primary border-primary shadow-sm"
                            : "border-border text-text-secondary hover:text-text-primary hover:bg-bg-secondary"
                    }`}
                >
                    {tab.label}
                    <span className={`ml-1.5 ${isActive ? "text-text-primary/70" : "text-text-muted"}`}>{count}</span>
                </button>
            );
        })}
    </div>
);
