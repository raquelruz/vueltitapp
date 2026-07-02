import { useState } from "react";
import api from "../../api";

const emptyForm = {
    title: "",
    country: "",
    city: "",
    startDate: "",
    endDate: "",
    description: "",
    visibility: "public",
};

export const CreateTripForm = ({ onSuccess }) => {
    const [form, setForm] = useState(emptyForm);
    const [imageFile, setImageFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const create = async (event) => {
        event.preventDefault();
        setSubmitting(true);

        try {
            const data = new FormData();
            Object.entries(form).forEach(([key, value]) => data.append(key, value));

            if (imageFile) {
                data.append("image", imageFile);
            }

            await api.post("/trips", data);

            setForm(emptyForm);
            setImageFile(null);

            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            alert("Error al crear el viaje");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={create}
            className="bg-bg-card rounded-lg shadow p-6 mb-6 grid gap-4 md:grid-cols-2 border border-border"
        >
            <input
                type="text"
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                placeholder="Título del viaje *"
                className="border border-border rounded px-4 py-2 text-sm bg-bg-secondary text-text placeholder-text-muted"
                required
                minLength="3"
            />

            <input
                type="text"
                value={form.country}
                onChange={(event) => setForm({ ...form, country: event.target.value })}
                placeholder="País *"
                className="border border-border rounded px-4 py-2 text-sm bg-bg-secondary text-text placeholder-text-muted"
                required
            />

            <input
                type="text"
                value={form.city}
                onChange={(event) => setForm({ ...form, city: event.target.value })}
                placeholder="Ciudad *"
                className="border border-border rounded px-4 py-2 text-sm bg-bg-secondary text-text-muted placeholder-text-muted"
                required
            />

            <input
                type="date"
                value={form.startDate}
                onChange={(event) => setForm({ ...form, startDate: event.target.value })}
                className="border border-border rounded px-4 py-2 text-sm bg-bg-secondary text-text-muted"
                required
            />

            <input
                type="date"
                value={form.endDate}
                onChange={(event) => setForm({ ...form, endDate: event.target.value })}
                className="border border-border rounded px-4 py-2 text-sm bg-bg-secondary text-text-muted"
                required
            />

            <select
                value={form.visibility}
                onChange={(event) => setForm({ ...form, visibility: event.target.value })}
                className="border border-border rounded px-4 py-2 text-sm bg-bg-secondary text-text-muted"
            >
                <option value="public">Público</option>
                <option value="private">Privado</option>
            </select>

            <textarea
                value={form.description}
                onChange={(event) => setForm({ ...form, description: event.target.value })}
                placeholder="Descripción"
                className="border border-border rounded px-4 py-2 text-sm bg-bg-secondary text-text placeholder-text-muted md:col-span-2 resize-none"
                rows="3"
            />

            <label className="text-sm text-text-secondary md:col-span-2">
                Imagen (opcional)
                <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => setImageFile(event.target.files[0] || null)}
                    className="block mt-1 w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
            </label>

            <div className="md:col-span-2 flex justify-center">
                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-success-500 hover:bg-success-600 text-white px-12 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
                >
                    {submitting && "Creando viaje..."}
                    {!submitting && "Crear viaje"}
                </button>
            </div>
        </form>
    );
};
