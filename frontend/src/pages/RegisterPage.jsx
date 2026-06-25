import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegCompass, FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { LuUser } from "react-icons/lu";
import { useAuth } from "../auth/AuthContext";


export const RegisterPage = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
        surname: "",
        role: "user",
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const submit = async (event) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await register(form);
            navigate("/", { replace: true });
        } catch (requestError) {
            setError(requestError.message || "Error al crear cuenta");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-xl">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 md:p-10 border border-gray-100">
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

                        <h2 className=" font-bold text-gray-900">Únete a la aventura</h2>
                        <p className="text-gray-600 text-sm">Regístrate para empezar a conectar</p>

                        {error && <div className="text-error text-sm pb-3 mb-4">{error}</div>}
                    </div>

                    {/* Form */}
                    <form onSubmit={submit} className="grid gap-3">
                        <label className="text-sm font-semibold text-gray-700 block mb-2">Nombre de usuario</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <FaRegUser />
                            </span>

                            <input
                                type="text"
                                placeholder="juanperez"
                                value={form.username}
                                onChange={(event) => setForm({ ...form, username: event.target.value })}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-text-primary-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 transition-all text-sm"
                                required
                            />
                        </div>

                        <label className="text-sm font-semibold text-gray-700 block mb-2">Email</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <MdOutlineEmail />
                            </span>

                            <input
                                type="email"
                                placeholder="juanperez@gmail.com"
                                value={form.email}
                                onChange={(event) => setForm({ ...form, email: event.target.value })}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-text-primary-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 transition-all text-sm"
                                required
                            />
                        </div>

                        <label className="text-sm font-semibold text-gray-700 block mb-2">Contraseña</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <RiLockPasswordLine />
                            </span>

                            <input
                                type="password"
                                placeholder="*******"
                                value={form.password}
                                onChange={(event) => setForm({ ...form, password: event.target.value })}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-text-primary-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 transition-all text-sm"
                                required
                            />
                        </div>

                        <label className="text-sm font-semibold text-gray-700 block mb-2">Nombre</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <LuUser />
                            </span>

                            <input
                                type="text"
                                placeholder="Juan"
                                value={form.name}
                                onChange={(event) => setForm({ ...form, name: event.target.value })}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-text-primary-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 transition-all text-sm"
                                required
                            />
                        </div>

                        <label className="text-sm font-semibold text-gray-700 block mb-2">Apellidos</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <LuUser />
                            </span>

                            <input
                                type="text"
                                placeholder="Pérez"
                                value={form.surname}
                                onChange={(event) => setForm({ ...form, surname: event.target.value })}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-text-primary-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 transition-all text-sm"
                                required
                            />
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
                                {loading ? "Creando cuenta..." : "Crear cuenta"}
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-6 pt-6 border-t border-gray-100">
                        <p className="text-sm text-gray-600">
                            ¿Ya tienes cuenta?{" "}
                            <Link
                                to="/login"
                                className="font-semibold hover:opacity-80 transition-opacity"
                                style={{ color: "var(--color-primary)" }}
                            >
                                Inicia sesión
                            </Link>
                        </p>
                    </div>
                </div>
                <p className="text-center text-xs text-gray-500 mt-6">Regístrate ahora y sé parte de la comunidad</p>
            </div>
        </div>
    );
};
