import { useState } from "react";
import { CreateTripForm } from "./CreateTripForm";
import { MdFlightTakeoff } from "react-icons/md";

export const CreateNewTripCard = ({ onSuccess }) => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="w-full max-w-xl">
            {!showForm && (
                <div className="flex flex-col items-center text-center gap-4 border-2 border-dashed border-border rounded-2xl bg-primary-50/50 p-10">
                    <div className="w-16 h-16 rounded-full bg-primary-500/10 flex items-center justify-center">
                        <MdFlightTakeoff className="text-primary-500 text-2xl -rotate-10" />
                    </div>

                    <div>
                        <p className="text-text-primary text-xl font-medium">¿Ya sabes dónde será tu próxima aventura?</p>
                        <p className="text-text-secondary text-sm mt-2 max-w-sm">
                            Comienza a organizar tu próximo viaje hoy mismo. Añade vuelos, hoteles y actividades para
                            tener todo en un solo lugar.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowForm(true)}
                        className="w-full max-w-xs bg-primary-600 hover:bg-blue-950 text-white px-6 py-4 rounded-xl text-sm font-semibold leading-tight transition-colors duration-200"
                    >
                        Crear nuevo viaje
                    </button>
                </div>
            )}

            {showForm && (
                <div className="w-full">
                    <div className="flex justify-end mb-2">
                        <button
                            onClick={() => setShowForm(false)}
                            className="text-sm text-text-secondary hover:text-text"
                        >
                            ✕ Cancelar
                        </button>
                    </div>

                    <CreateTripForm
                        onSuccess={() => {
                            setShowForm(false);
                            if (onSuccess) {
                                onSuccess();
                            }
                        }}
                    />
                </div>
            )}
        </div>
    );
};