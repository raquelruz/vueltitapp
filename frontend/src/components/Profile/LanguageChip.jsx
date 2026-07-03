import { FiX } from "react-icons/fi";

export const LanguageChip = ({ language, saving, onRemove }) => {
    return (
        <span className="flex items-center gap-1.5 text-xs font-medium bg-gray-100 text-gray-600 pl-2.5 pr-1.5 py-1 rounded-full">
            {language}
            <button onClick={onRemove} disabled={saving} className="text-gray-400 hover:text-red-500 transition">
                <FiX size={12} />
            </button>
        </span>
    );
};