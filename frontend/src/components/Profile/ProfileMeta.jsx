import { useState, useRef } from "react";
import api from "../../api";
import { LanguageChip } from "./LanguageChip";
import { AddLanguageControl } from "./AddLanguageControl";

export const ProfileMeta = ({ profile, onProfileUpdated }) => {
    const [adding, setAdding] = useState(false);
    const [newLanguage, setNewLanguage] = useState("");
    const [saving, setSaving] = useState(false);
    const hasSubmitted = useRef(false);

    const languages = profile.languages || [];

    const memberSince = profile.createdAt
        ? new Date(profile.createdAt).toLocaleDateString("es-ES", { month: "long", year: "numeric" })
        : null;

    const saveLanguages = (updatedLanguages) => {
        setSaving(true);
        api.put(`/users/${profile.id}`, { ...profile, languages: updatedLanguages })
            .then((response) => onProfileUpdated(response.data))
            .finally(() => setSaving(false));
    };

    const handleStartAdding = () => {
        hasSubmitted.current = false;
        setAdding(true);
    };

    const handleAddLanguage = () => {
        if (hasSubmitted.current) return;
        hasSubmitted.current = true;

        const trimmed = newLanguage.trim();
        setNewLanguage("");
        setAdding(false);

        if (!trimmed || languages.includes(trimmed)) return;

        saveLanguages([...languages, trimmed]);
    };

    const handleRemoveLanguage = (language) => {
        saveLanguages(languages.filter((item) => item !== language));
    };

    return (
        <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-2">Idiomas</p>
            <div className="flex flex-wrap items-center gap-2">
                {languages.map((language) => (
                    <LanguageChip
                        key={language}
                        language={language}
                        saving={saving}
                        onRemove={() => handleRemoveLanguage(language)}
                    />
                ))}

                <AddLanguageControl
                    adding={adding}
                    newLanguage={newLanguage}
                    onStartAdding={handleStartAdding}
                    onChangeLanguage={setNewLanguage}
                    onConfirm={handleAddLanguage}
                />
            </div>

            {memberSince && (
                <p className="text-xs text-gray-400 mt-3">Miembro desde {memberSince}</p>
            )}
        </div>
    );
};