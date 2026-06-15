import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import http from "../api";

const AuthContext = createContext(null);

const TOKEN_KEY = "token";
const USER_KEY = "user";

function readStoredUser() {
    try {
        const raw = localStorage.getItem(USER_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
    const [user, setUser] = useState(() => readStoredUser());

    // Si la API detecta un 401 dispara este evento → limpiamos el estado local
    useEffect(() => {
        const onLogout = () => {
            setToken(null);
            setUser(null);
        };
        window.addEventListener("auth:logout", onLogout);
        return () => window.removeEventListener("auth:logout", onLogout);
    }, []);

    const persistSession = useCallback((newToken, newUser) => {
        localStorage.setItem(TOKEN_KEY, newToken);
        localStorage.setItem(USER_KEY, JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
    }, []);

    const login = useCallback(
        async (email, password) => {
            const response = await http.post("/auth/login", { email, password });
            const { token: newToken, user: newUser } = response.data;
            persistSession(newToken, newUser);
            return newUser;
        },
        [persistSession]
    );

    const register = useCallback(
        async (payload) => {
            const response = await http.post("/auth/register", payload);
            const { token: newToken, user: newUser } = response.data;
            persistSession(newToken, newUser);
            return newUser;
        },
        [persistSession]
    );

    const logout = useCallback(() => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
    }, []);

    const hasRole = useCallback(
        (roles) => {
            if (!user) return false;
            const allowed = Array.isArray(roles) ? roles : [roles];
            return allowed.includes(user.role);
        },
        [user]
    );

    const value = useMemo(
        () => ({ token, user, isAuthenticated: !!token, login, register, logout, hasRole }),
        [token, user, login, register, logout, hasRole]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
    return context;
}
