export const CreateTripForm = ({ form, setForm, onSubmit, submitting }) => {
    return (
        <form
            onSubmit={onSubmit}
            className="bg-bg-card rounded-lg shadow p-6 mb-6 grid gap-4 md:grid-cols-2 border border-border"
        >
            <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Título del viaje *"
                className="border border-border rounded px-4 py-2 text-sm bg-bg-secondary text-text placeholder-text-muted"
                required
                minLength="3"
            />

            <input
                type="text"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                placeholder="País *"
                className="border border-border rounded px-4 py-2 text-sm bg-bg-secondary text-text placeholder-text-muted"
                required
            />

            <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="Ciudad *"
                className="border border-border rounded px-4 py-2 text-sm bg-bg-secondary text-text placeholder-text-muted"
                required
            />

            <input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="border border-border rounded px-4 py-2 text-sm bg-bg-secondary text-text"
                required
            />

            <input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="border border-border rounded px-4 py-2 text-sm bg-bg-secondary text-text"
                required
            />

            <select
                value={form.visibility}
                onChange={(e) => setForm({ ...form, visibility: e.target.value })}
                className="border border-border rounded px-4 py-2 text-sm bg-bg-secondary text-text"
            >
                <option value="public">Público</option>
                <option value="private">Privado</option>
            </select>

            <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Descripción"
                className="border border-border rounded px-4 py-2 text-sm bg-bg-secondary text-text placeholder-text-muted md:col-span-2 resize-none"
                rows="3"
            />

            <button
                type="submit"
                disabled={submitting}
                className="bg-color-success text-white px-4 py-2 rounded text-sm hover:bg-green-600 disabled:opacity-60 md:col-span-2 font-medium transition"
            >
                {submitting ? "Creando viaje..." : "Crear viaje"}
            </button>
        </form>
    );
};
