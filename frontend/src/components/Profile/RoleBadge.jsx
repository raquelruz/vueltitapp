export const RoleBadge = ({ role }) => {
    const isAdmin = role === "admin";

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide shrink-0 ${
                isAdmin ? "bg-indigo-950 text-white" : "bg-gray-100 text-gray-600"
            }`}
            title={isAdmin ? "Administrador" : "Usuario"}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${isAdmin ? "bg-indigo-400" : "bg-gray-400"}`} />
            {isAdmin ? "Admin" : "User"}
        </span>
    );
};