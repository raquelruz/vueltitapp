import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCompass, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../auth/AuthContext";

export const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const from = location.state?.from?.pathname || "/";

    const submit = async (event) => {
        event.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await login(form.email, form.password);
            navigate(from, { replace: true });
        } catch (error) {
            setError(error.message || "Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-xl">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-8 md:p-10 border border-gray-100">
                    {/* Logo Section */}
                    <div className="text-center mb-10">
                        <Link to="/" className="flex items-center justify-center gap-2 mb-6">
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                                style={{
                                    background: "linear-gradient(135deg, #0047AB 0%, #00D2FF 100%)",
                                }}
                            >
                                <FaRegCompass className="text-2xl" />
                            </div>
                            <span className="text-lg font-semibold text-primary">VueltitApp</span>
                        </Link>

                        <h2 className=" font-bold text-gray-900">Bienvenido de nuevo</h2>
                        <p className="text-gray-600 text-sm">La aventura te espera. Ingresa tus datos.</p>

                        {error && <div className="text-error text-sm pb-3 mb-4">{error}</div>}
                    </div>

                    {/* Form */}
                    <form onSubmit={submit} className="grid gap-3">
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[var(--color-primary)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 transition-all text-sm"
                                required
                            />
                        </div>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Contraseña"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[var(--color-primary)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 transition-all text-sm"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <div className="flex justify-center items-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-4 rounded-lg font-semibold text-white text-sm transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg transform hover:-translate-y-0.5 mt-6"
                                style={{
                                    background: "linear-gradient(135deg, #0047AB 0%, #00D2FF 100%)",
                                }}
                            >
                                {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-6 pt-6 border-t border-gray-100">
                        <p className="text-sm text-gray-600">
                            ¿No tienes cuenta?{" "}
                            <Link
                                to="/register"
                                className="text-primary font-semibold hover:opacity-80 transition-opacity"
                            >
                                Regístrate
                            </Link>
                        </p>
                    </div>
                </div>

                <p className="text-center text-xs text-gray-500 mt-6">
                    La aventura te espera. Ingresa tus datos para continuar.
                </p>
            </div>
        </div>
    );
};
