import { FiPlus } from "react-icons/fi";

export const AddLanguageControl = ({ adding, newLanguage, onStartAdding, onChangeLanguage, onConfirm }) => {
    if (adding) {
        return (
            <input
                value={newLanguage}
                onChange={(event) => onChangeLanguage(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && onConfirm()}
                onBlur={onConfirm}
                autoFocus
                placeholder="Idioma..."
                className="text-xs w-24 border border-gray-200 rounded-full px-2.5 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
        );
    }

    return (
        <button
            onClick={onStartAdding}
            className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700 pl-2.5 pr-3 py-1 rounded-full border border-dashed border-indigo-200"
        >
            <FiPlus size={12} />
            Añadir
        </button>
    );
};