import { TRIP_PHASES } from "../../utils/tripPhase";

const TABS = [
    { key: "all", label: "Todos" },
    { key: "ongoing", label: "En Curso" },
    { key: "upcoming", label: "Próximos viajes" },
    { key: "past", label: "Pasados" },
];

export const TripsFilterTabs = ({ active, onChange, counts }) => (
    <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => {
            const isActive = active === tab.key;
            const count = counts[tab.key] ?? 0;
            const isEmpty = count === 0;

            return (
                <button
                    key={tab.key}
                    onClick={() => onChange(tab.key)}
                    disabled={isEmpty && !isActive}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                        isActive
                            ? "bg-primary text-text-primary border-primary shadow-sm"
                            : isEmpty ? "border-border text-text-muted opacity-50 cursor-default" : "border-border text-text-secondary hover:text-text-primary hover:bg-bg-secondary"
                    }`}
                >
                    {tab.label}
                    <span className={`ml-1.5 ${isActive ? "text-text-primary/70" : "text-text-muted"}`}>{count}</span>
                </button>
            );
        })}
    </div>
);
