import { HeroSection } from "../../sections/HeroSection";
import { Navbar } from "../components/Navbar";

export const HomePage = () => {
    return (
        <>
        <div >
            <Navbar />
        </div>

        <div>
            <HeroSection />
        </div>

        </>
    );
};
