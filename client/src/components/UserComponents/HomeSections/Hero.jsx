import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import logo2 from '../../../../src/assets/dalil-high-resolution-logo.png'

function Hero() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
        <img 
            src={logo2}
            alt="Banner" 
            className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center w-full">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4 flex flex-col justify-center items-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-center font-extrabold text-title pb-2">
                Welcome to Dalil
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-center font-extrabold text-description pb-5">
                Browse and search for Arab businesses and services in all of Türkiye
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center w-full max-w-[700px] gap-4">
                <Input 
                type="text" 
                placeholder="Search..." 
                className="w-full sm:w-auto flex-grow hover:underline-none hover:border-none" 
                />
                <Button className="text-primary font-medium text-lg sm:text-xl bg-secondary w-full sm:w-[200px] flex items-center gap-1"> 
                Search
                <Search />
                </Button>
            </div>
            </div>
        </div>
        </div>
    );
}

export default Hero;
