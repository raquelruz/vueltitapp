import { useState } from "react";
import { FiEdit2, FiX } from "react-icons/fi";
import api from "../../api";

export const EditableAccountField = ({ profile, field, label, onUpdated }) => {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(profile[field] || "");
    const [saving, setSaving] = useState(false);
    const [fieldError, setFieldError] = useState(null);

    const handleSave = () => {
        setSaving(true);
        setFieldError(null);
        api.put(`/users/${profile.id}`, { ...profile, [field]: draft })
            .then((response) => {
                onUpdated(response.data);
                setEditing(false);
            })
            .catch((error) => {
                setFieldError(error.response?.data?.message || "Ese valor ya está en uso");
            })
            .finally(() => setSaving(false));
    };

    const handleCancel = () => {
        setDraft(profile[field] || "");
        setFieldError(null);
        setEditing(false);
    };

    if (editing) {
        return (
            <div className="py-2.5">
                <dt className="text-sm font-semibold text-gray-900 mb-1.5">{label}</dt>
                <div className="relative">
                    <input
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        autoFocus
                        className="w-full text-sm text-gray-800 border border-gray-200 rounded-lg pl-3 pr-9 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition"
                    />
                    {draft && (
                        <button
                            onClick={() => setDraft("")}
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-gray-300 hover:text-gray-500 transition"
                            title="Vaciar"
                        >
                            <FiX size={14} />
                        </button>
                    )}
                </div>
                {fieldError && <p className="text-xs text-red-500 mt-1.5">{fieldError}</p>}
                <div className="flex gap-4 mt-2">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                        {saving ? "Guardando..." : "Guardar"}
                    </button>
                    <button onClick={handleCancel} className="text-xs text-gray-400 hover:text-gray-600">
                        Cancelar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="py-2.5">
            <dt className="text-sm font-semibold text-gray-900 mb-1.5">{label}</dt>
            <div className="flex items-center gap-3">
                <dd className="flex-1 bg-gray-100 rounded-lg px-4 py-2.5 text-sm text-gray-700">
                    {profile[field] || "—"}
                </dd>
                <button
                    onClick={() => setEditing(true)}
                    className="shrink-0 flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700"
                    title={`Editar ${label.toLowerCase()}`}
                >
                    <FiEdit2 size={12} />
                    Editar
                </button>
            </div>
        </div>
    );
};