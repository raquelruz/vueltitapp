export const LogoutButton = ({ baseClass, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`${baseClass} text-white border border-error-500/30 bg-error-500 hover:bg-error-600`}
        >
            Cerrar sesión
        </button>
    );
}