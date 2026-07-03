export const StatProfile = ({ value, label }) => {
    return (
        <div className="text-center sm:text-left">
            <div className="text-2xl font-bold text-primary-500">{value}</div>
            <div className="text-xs text-gray-400">{label}</div>
        </div>
    )
}