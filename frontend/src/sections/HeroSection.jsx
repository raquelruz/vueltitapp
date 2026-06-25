import heroBg from "../assets/images/hero-bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";

export const HeroSection = () => {
        const navigate = useNavigate();

    const handleSearch = ({ search, date }) => {
    const params = new URLSearchParams();

    if (search?.trim()) {
        params.append("search", search);
    }

    if (date) {
        params.append("date", date);
    }

    navigate(`/explore?${params.toString()}`);
};

    return (
        <section className="relative min-h-screen overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${heroBg})`,
                    backgroundAttachment: "fixed",
                }}
            />

            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/70 to-black/40" />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-black/60" />

            {/* CONTENT */}
            <div className="relative max-w-7xl mx-auto px-4 md:px-8 min-h-screen flex flex-col items-center justify-center">
                <div className="mb-8 inline-block">
                    <div className="px-4 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md">
                        <span className="text-sm font-semibold text-white">
                            ✨ Explora nuevos destinos
                        </span>
                    </div>
                </div>

                <div className="text-center mb-8 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-2">
                        Conecta con tu próxima aventura
                    </h1>

                    <p className="text-md text-gray-200 max-w-2xl mx-auto">
                        Descubre destinos increíbles, conoce viajeros del mundo y crea recuerdos inolvidables.
                    </p>
                </div>

                {/* SEARCH */}
                <SearchBar onSearch={handleSearch} />
            </div>

            <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>

        </section>
    );
};