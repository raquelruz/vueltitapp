export const Field = ({ label, value, mono = false }) => {
    return (
        <div>
            <dt className="text-xs uppercase text-gray-400">{label}</dt>
            <dd className={`text-gray-800 ${mono ? "font-mono text-xs break-all" : ""}`}>{value}</dd>
        </div>
    );
};