import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import api from "../api";
import { EditableAccountField } from "../components/Profile/EditableAccountField";
import { RoleBadge } from "../components/Profile/RoleBadge";
import { ProfileAvatar } from "../components/Profile/ProfileAvatar";
import { ProfileBio } from "../components/Profile/ProfileBio";
import { ProfileStats } from "../components/Profile/ProfileStats";
import { ProfileMeta } from "../components/Profile/ProfileMeta";
import { TravelerBadge } from "../components/Profile/TravelerBadge";
import { TripsGallery } from "../components/Trips/TripsGallery";
import { TripThumbnailProfile } from "../components/Profile/TripThumbnailProfile";

export const ProfilePage = () => {
    const { user: tokenUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);

    useEffect(() => {
        if (!tokenUser?.id) return;
        setLoading(true);
        Promise.all([
            api.get(`/users/${tokenUser.id}`),
            api.get(`/trips/my-trips/${tokenUser.id}`),
        ])
            .then(([profileResponse, tripsResponse]) => {
                setProfile(profileResponse.data);
                setTrips(tripsResponse.data);
            })
            .catch((error) => setError(error.message || "Error cargando el perfil"))
            .finally(() => setLoading(false));
    }, [tokenUser?.id]);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("avatar", file);

        setUploadingAvatar(true);
        api.patch(`/users/${profile.id}/avatar`, formData)
            .then((response) => setProfile(response.data))
            .catch((error) => setError(error.message || "Error subiendo el avatar"))
            .finally(() => setUploadingAvatar(false));
    };

    if (loading) return <p className="text-gray-500">Cargando perfil...</p>;

    if (error) {
        return <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">{error}</div>;
    }

    if (!profile) return <p className="text-gray-500">No se ha encontrado el perfil.</p>;

    const hasTrips = trips.length > 0;
    const recentTrips = trips.slice(0, 3);

    return (
        <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Card izquierda: avatar + bio + stats */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                        <div className="relative shrink-0 w-fit mx-auto sm:mx-0">
                            <ProfileAvatar profile={profile} />
                            <label
                                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center cursor-pointer ring-4 ring-white transition"
                                title="Cambiar foto"
                            >
                                <span className="text-white text-xs">
                                    {uploadingAvatar ? "…" : "✎"}
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                    disabled={uploadingAvatar}
                                />
                            </label>
                        </div>

                        <div className="flex-1 text-center sm:text-left">
                            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {profile.fullName || profile.username}
                                </h2>
                                <TravelerBadge tripsCount={trips.length} />
                            </div>
                            <p className="text-gray-400 text-sm mt-0.5">@{profile.username}</p>

                            <ProfileBio profile={profile} onBioUpdated={setProfile} />
                        </div>
                    </div>

                    <ProfileStats trips={trips} />
                    <ProfileMeta profile={profile} onProfileUpdated={setProfile} />
                </div>

                {/* Card derecha: datos de la cuenta */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">Datos de la cuenta</h3>
                        <RoleBadge role={profile.role} />
                    </div>
                    <dl>
                        <EditableAccountField
                            profile={profile}
                            field="username"
                            label="Usuario"
                            onUpdated={setProfile}
                        />
                        <EditableAccountField
                            profile={profile}
                            field="email"
                            label="Email"
                            onUpdated={setProfile}
                        />
                        <EditableAccountField
                            profile={profile}
                            field="name"
                            label="Nombre"
                            onUpdated={setProfile}
                        />
                        <EditableAccountField
                            profile={profile}
                            field="surname"
                            label="Apellido"
                            onUpdated={setProfile}
                        />
                    </dl>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Galería de aventuras</h3>
                <TripsGallery trips={trips} />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Mis últimos viajes</h3>

                {!hasTrips && <p className="text-gray-400 text-sm">Aún no tienes viajes.</p>}

                {hasTrips && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {recentTrips.map((trip) => (
                            <div
                                key={trip.id}
                                className="rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition cursor-pointer"
                            >
                                <TripThumbnailProfile trip={trip} />
                                <div className="p-3">
                                    <p className="text-sm font-medium text-gray-900 truncate">{trip.title}</p>
                                    {trip.destination && (
                                        <p className="text-xs text-gray-400 truncate">{trip.destination}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};