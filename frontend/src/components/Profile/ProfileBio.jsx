import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import api from "../../api";

export const ProfileBio = ({ profile, onBioUpdated }) => {
    const [editing, setEditing] = useState(false);
    const [bioDraft, setBioDraft] = useState(profile.bio || "");
    const [saving, setSaving] = useState(false);

    const handleSave = () => {
        setSaving(true);
        api.put(`/users/${profile.id}`, { ...profile, bio: bioDraft })
            .then((response) => {
                onBioUpdated(response.data);
                setEditing(false);
            })
            .finally(() => setSaving(false));
    };

    if (editing) {
        return (
            <div className="mt-4">
                <textarea
                    value={bioDraft}
                    onChange={(event) => setBioDraft(event.target.value)}
                    placeholder="Cuéntanos algo sobre ti..."
                    rows={4}
                    autoFocus
                    className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition"
                />
                <div className="flex gap-4 mt-2">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                        {saving ? "Guardando..." : "Guardar"}
                    </button>
                    <button
                        onClick={() => setEditing(false)}
                        className="text-xs text-gray-400 hover:text-gray-600"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        );
    }

    if (profile.bio) {
        return (
            <div className="mt-4">
                <p className="text-sm text-gray-600 leading-relaxed">{profile.bio}</p>
                <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-1 mt-1.5 text-xs font-medium text-primary-600 hover:text-primary-700"
                >
                    <FiEdit2 size={12} />
                    Editar biografía
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={() => setEditing(true)}
            className="mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
            + Añadir biografía
        </button>
    );
};