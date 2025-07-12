
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUserInStorage } from '../services/userService';
import { User, Feedback } from '../types';
import { useAuth } from '../contexts/AuthContext';
import SkillTag from '../components/SkillTag';
import FeedbackCard from '../components/FeedbackCard';
import StarIcon from '../components/StarIcon';
import RequestSwapModal from '../components/RequestSwapModal';
import LoginPromptModal from '../components/LoginPromptModal';
import AddFeedbackModal from '../components/AddFeedbackModal';
import BackButton from '../components/BackButton';


const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-dark-text-secondary" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 20l-4.95-5.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-dark-text-secondary" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>;
const PrivateIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);


const UserProfilePage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const { user: currentUser, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [profile, setProfile] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRequestModalOpen, setRequestModalOpen] = useState(false);
    const [isLoginPromptOpen, setLoginPromptOpen] = useState(false);
    const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);

    useEffect(() => {
        if (!userId) {
            setIsLoading(false);
            return;
        };

        if (currentUser?.id === userId) {
            navigate('/profile', { replace: true });
            return;
        }

        const fetchedUser = getUserById(userId);
        setProfile(fetchedUser || null);
        setIsLoading(false);
        
    }, [userId, currentUser, navigate]);
    

    const handleRequestSwap = () => {
        if (isAuthenticated) {
            setRequestModalOpen(true);
        } else {
            setLoginPromptOpen(true);
        }
    };
    
    const handleFeedbackAdded = (updatedProfile: User) => {
        setProfile(updatedProfile);
        setFeedbackModalOpen(false);
    };

    if (isLoading) {
        return <div className="text-center text-xl">Loading profile...</div>;
    }
    if (!profile) {
        return <div className="text-center text-xl">User not found.</div>;
    }
    
    const isPublic = profile.isProfilePublic;

    // --- Private Profile View ---
    if (!isPublic) {
        return (
            <div className="max-w-4xl mx-auto">
                <BackButton />
                <div className="bg-dark-card p-8 rounded-lg shadow-lg border border-dark-border">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                         <div className="flex items-center gap-6">
                            <img src={profile.profilePhotoUrl} alt={profile.name} className="w-24 h-24 rounded-full border-4 border-primary" />
                            <div>
                                <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
                            </div>
                        </div>
                         <button
                            onClick={handleRequestSwap}
                            className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-6 rounded-lg transition-colors whitespace-nowrap w-full md:w-auto"
                        >
                            Request Swap
                        </button>
                    </div>
                    <div className="bg-secondary p-4 rounded-lg text-center my-6 flex items-center justify-center">
                        <PrivateIcon />
                        <span className="text-dark-text-secondary font-semibold">This profile is private.</span>
                    </div>
                     <div>
                        <h3 className="text-xl font-semibold text-white mb-3">Skills Offered</h3>
                        <div className="flex flex-wrap gap-2">
                            {profile.skillsOffered.map(skill => <SkillTag key={skill.id} skillName={skill.name} className="bg-teal-500 text-white" />)}
                        </div>
                    </div>
                    
                     {/* Modals for private view */}
                     <RequestSwapModal isOpen={isRequestModalOpen} onClose={() => setRequestModalOpen(false)} targetUser={profile} />
                     <LoginPromptModal isOpen={isLoginPromptOpen} onClose={() => setLoginPromptOpen(false)} />
                </div>
            </div>
        )
    }

    // --- Public Profile View ---
    return (
        <div className="max-w-4xl mx-auto">
            <BackButton />
            <div className="bg-dark-card p-8 rounded-lg shadow-lg border border-dark-border">
                <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                    <div className="flex items-center gap-6">
                        <img src={profile.profilePhotoUrl} alt={profile.name} className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-primary shadow-md" />
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white">{profile.name}</h1>
                            <p className="flex items-center text-dark-text-secondary mt-2"><LocationIcon/> <span className="ml-2">{profile.location}</span></p>
                             <div className="flex items-center mt-3">
                                {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < Math.round(profile.rating)} className="h-5 w-5" />)}
                                <span className="text-sm text-dark-text-secondary ml-2">{profile.rating.toFixed(1)}/5 ({profile.reviews} reviews)</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-auto">
                        <button
                            onClick={handleRequestSwap}
                            className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-6 rounded-lg transition-colors whitespace-nowrap"
                        >
                            Request Swap
                        </button>
                        <button
                            onClick={() => isAuthenticated ? setFeedbackModalOpen(true) : setLoginPromptOpen(true) }
                            className="bg-secondary hover:bg-dark-border text-white font-bold py-2 px-6 rounded-lg transition-colors whitespace-nowrap"
                        >
                            Leave Feedback
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     <div className="lg:col-span-2 space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-3">Skills Offered</h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.skillsOffered.map(skill => <SkillTag key={skill.id} skillName={skill.name} className="bg-teal-500 text-white" />)}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-3">Skills Wanted</h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.skillsWanted.map(skill => <SkillTag key={skill.id} skillName={skill.name} className="bg-indigo-500 text-white" />)}
                            </div>
                        </div>
                        
                        {profile.feedback && profile.feedback.length > 0 ? (
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-3">Feedback & Reviews</h3>
                                <div className="space-y-4">
                                    {profile.feedback.map(fb => <FeedbackCard key={fb.id} feedback={fb} />)}
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-3">Feedback & Reviews</h3>
                                <p className="text-dark-text-secondary">No feedback yet. Be the first to leave a review!</p>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-1 bg-secondary p-4 rounded-lg border border-dark-border self-start">
                        <h3 className="text-lg font-semibold text-white mb-3">Availability</h3>
                        <p className="flex items-center text-dark-text">
                           <CalendarIcon />
                           <span className="ml-2">{profile.availability}</span>
                        </p>
                    </div>
                </div>
                
                {/* Modals for public view */}
                <RequestSwapModal isOpen={isRequestModalOpen} onClose={() => setRequestModalOpen(false)} targetUser={profile} />
                <AddFeedbackModal isOpen={isFeedbackModalOpen} onClose={() => setFeedbackModalOpen(false)} targetUser={profile} onFeedbackAdded={handleFeedbackAdded} />
                <LoginPromptModal isOpen={isLoginPromptOpen} onClose={() => setLoginPromptOpen(false)} />
            </div>
        </div>
    );
};

export default UserProfilePage;