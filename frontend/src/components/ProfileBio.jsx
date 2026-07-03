import { useState } from "react";
import api from "../api";

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
            <div className="mt-3">
                <textarea
                    value={bioDraft}
                    onChange={(event) => setBioDraft(event.target.value)}
                    placeholder="Cuéntanos algo sobre ti..."
                    rows={3}
                    className="w-full text-sm text-gray-600 border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
                <div className="flex gap-2 mt-2 justify-center sm:justify-start">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded"
                    >
                        {saving ? "Guardando..." : "Guardar"}
                    </button>
                    <button
                        onClick={() => setEditing(false)}
                        className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        );
    }

    if (profile.bio) {
        return (
            <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                {profile.bio}
                <button
                    onClick={() => setEditing(true)}
                    className="ml-2 text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                >
                    Editar
                </button>
            </p>
        );
    }

    return (
        <button
            onClick={() => setEditing(true)}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium mt-3"
        >
            + Añadir biografía
        </button>
    );
};