import {ArrowRight} from "lucide-react";
import {Link} from "react-router-dom";

const HeroSection = () => {
    return (
        <section className="text-center py-20 md:py-32">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                    Master Your Money, Master Your Life
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-500">
                    Financial freedom isn't about how much you make; it’s about how well you manage what you have. Our intuitive platform gives you the clarity to track every rupee, the wisdom to save more, and the power to design the life you’ve always dreamed of.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Link
                        to="/signup"
                        className="w-full sm:w-auto bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-all shadow-md"
                    >
                        Sign Up
                    </Link>
                    <Link
                        to="/login"
                        className="w-full sm:w-auto bg-gray-100 text-gray-800 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                    >
                        Loginm <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;