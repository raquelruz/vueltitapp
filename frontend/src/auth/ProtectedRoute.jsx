import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const ProtectedRoute = ({ children, roles }) => {
    const { isAuthenticated, hasRole } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (roles && !hasRole(roles)) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-6 text-center">
                <h2 className="text-lg font-semibold mb-2">🚫 Acceso denegado</h2>
                <p className="text-sm">No tienes los permisos necesarios para ver esta página.</p>
            </div>
        );
    }

    return children;
}
