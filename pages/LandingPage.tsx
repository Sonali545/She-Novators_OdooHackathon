
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LandingDashboard from '../components/LandingDashboard';
import HeroIllustration from '../components/HeroIllustration';


export default function LandingPage() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="space-y-20 pb-10">
            {/* Hero Section */}
            <section className="text-center pt-16">
                <h1 className="text-5xl md:text-6xl font-extrabold text-white">
                    Unlock Your Potential with <span className="text-primary">SkillForge</span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-dark-text-secondary max-w-2xl mx-auto">
                    A community-driven platform where you can exchange skills, learn new things, and grow your expertise without spending a dime.
                </p>
                <div className="mt-10">
                    <button onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')} className="bg-primary hover:bg-primary-hover text-white font-bold py-4 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
                        Get Started
                    </button>
                </div>
            </section>
            
            {/* New Chart.js Dashboard Section */}
            <section>
                <h2 className="text-4xl font-bold text-center text-white mb-12">Live Skill Trends</h2>
                <LandingDashboard />
            </section>

            {/* How It Works Section Replaced with Hero Illustration */}
            <section>
                <h2 className="text-4xl font-bold text-center text-white mb-4">A Hub of Collaborative Learning</h2>
                <p className="text-lg text-dark-text-secondary text-center max-w-3xl mx-auto mb-8">
                    SkillForge is more than a platform; it's a vibrant community. Visualize a space where developers, designers, and managers converge to share knowledge, tackle challenges, and accelerate their growth together.
                </p>
                <HeroIllustration />
            </section>
        </div>
    );
}
