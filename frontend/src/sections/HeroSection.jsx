import heroBg from "../assets/images/hero-bg.jpg";
import { Link } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";

export const HeroSection = ({ setTrips }) => {
    return (
        <section className="relative min-h-screen overflow-hidden">

            {/* BACKGROUND */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${heroBg})`,
                    backgroundAttachment: "fixed",
                }}
            />

            {/* OVERLAYS */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/70 to-black/40" />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-black/60" />

            {/* CONTENT */}
            <div className="relative max-w-7xl mx-auto px-4 md:px-8 min-h-screen flex flex-col items-center justify-center">

                {/* BADGE */}
                <div className="mb-8 inline-block">
                    <div className="px-4 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md">
                        <span className="text-sm font-semibold text-white">
                            ✨ Explora nuevos destinos
                        </span>
                    </div>
                </div>

                {/* TITLE */}
                <div className="text-center mb-8 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-2">
                        Conecta con tu próxima aventura
                    </h1>

                    <p className="text-md text-gray-200 max-w-2xl mx-auto">
                        Descubre destinos increíbles, conoce viajeros del mundo y crea recuerdos inolvidables.
                    </p>
                </div>

                {/* SEARCH */}
                <SearchBar onSearch={setTrips} />

                {/* CTA (ARREGLADO - dentro del hero) */}
                <div className="mt-6 flex flex-col items-center gap-3">
                    <Link
                        to="/explore"
                        className="text-white font-medium underline underline-offset-4 hover:text-white/80 transition"
                    >
                        Ver todos los viajes →
                    </Link>

                    <p className="text-xs text-white/60">
                        o explora destinos populares sin buscar
                    </p>
                </div>

            </div>

            {/* SCROLL INDICATOR */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>

        </section>
    );
};