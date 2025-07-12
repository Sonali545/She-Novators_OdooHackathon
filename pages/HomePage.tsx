
import React, { useState, useMemo } from 'react';
import { getUsers } from '../services/userService';
import { Availability, User } from '../types';
import SkillTag from '../components/SkillTag';
import RequestSwapModal from '../components/RequestSwapModal';
import LoginPromptModal from '../components/LoginPromptModal';
import DashboardStats from '../components/DashboardStats';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import StarIcon from '../components/StarIcon';
import FeedbackCard from '../components/FeedbackCard';
import MatchSuggestions from '../components/MatchSuggestions';

const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-dark-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;


const UserCard: React.FC<{ user: User, onRequestSwap: (user: User) => void }> = ({ user, onRequestSwap }) => (
    <div className="bg-dark-card rounded-lg shadow-lg p-6 flex flex-col space-y-4 border border-dark-border hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
                <img src={user.profilePhotoUrl} alt={user.name} className="w-20 h-20 rounded-full border-4 border-dark-border" />
                <div>
                    <h3 className="text-xl font-bold text-white hover:text-primary transition-colors">
                        <Link to={`/profile/${user.id}`}>{user.name}</Link>
                    </h3>
                    <p className="text-sm text-dark-text-secondary">{user.location}</p>
                    <div className="flex items-center mt-2">
                        {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < Math.round(user.rating)} className="h-5 w-5" />)}
                        <span className="text-sm text-dark-text-secondary ml-2">{user.rating.toFixed(1)}/5 ({user.reviews} reviews)</span>
                    </div>
                </div>
            </div>
            <button
                onClick={() => onRequestSwap(user)}
                className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg transition-colors whitespace-nowrap"
            >
                Request Swap
            </button>
        </div>
        <div className="space-y-3">
            <div>
                <h4 className="text-sm font-semibold text-dark-text-secondary mb-2">Skills Offered:</h4>
                <div className="flex flex-wrap gap-2">
                    {user.skillsOffered.map(skill => <SkillTag key={skill.id} skillName={skill.name} className="bg-teal-500 text-white" />)}
                </div>
            </div>
            <div>
                <h4 className="text-sm font-semibold text-dark-text-secondary mb-2">Skills Wanted:</h4>
                <div className="flex flex-wrap gap-2">
                    {user.skillsWanted.map(skill => <SkillTag key={skill.id} skillName={skill.name} className="bg-indigo-500 text-white" />)}
                </div>
            </div>
        </div>
        {user.feedback && user.feedback.length > 0 && <FeedbackCard feedback={user.feedback[0]} />}
    </div>
);

const HomePage: React.FC = () => {
    const { user: currentUser, isAuthenticated } = useAuth();
    const allUsers = getUsers().filter(u => u.id !== currentUser?.id); // Get users synchronously

    const [searchQuery, setSearchQuery] = useState('');
    const [availabilityFilter, setAvailabilityFilter] = useState<string>('All');
    const [isRequestModalOpen, setRequestModalOpen] = useState(false);
    const [isLoginPromptOpen, setLoginPromptOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 6;

    const filteredUsers = useMemo(() => {
        return allUsers.filter(user => {
            const lowerCaseQuery = searchQuery.toLowerCase();
            const matchesSearch = user.name.toLowerCase().includes(lowerCaseQuery) ||
                (user.location && user.location.toLowerCase().includes(lowerCaseQuery)) ||
                user.skillsOffered.some(s => s.name.toLowerCase().includes(lowerCaseQuery)) ||
                user.skillsWanted.some(s => s.name.toLowerCase().includes(lowerCaseQuery));
            
            const matchesAvailability = availabilityFilter === 'All' || user.availability === availabilityFilter;

            return matchesSearch && matchesAvailability;
        });
    }, [searchQuery, availabilityFilter, allUsers]);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const currentUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

    const handleRequestSwap = (user: User) => {
        if (isAuthenticated) {
            setSelectedUser(user);
            setRequestModalOpen(true);
        } else {
            setLoginPromptOpen(true);
        }
    };
    
    const renderPagination = () => {
        if (totalPages <= 1) return null;
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`px-4 py-2 rounded-md ${currentPage === i ? 'bg-primary text-white' : 'bg-secondary text-dark-text-secondary hover:bg-dark-border'}`}
                >
                    {i}
                </button>
            );
        }
        return (
            <div className="flex justify-center items-center gap-2 mt-8">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 rounded-md bg-secondary text-dark-text-secondary hover:bg-dark-border disabled:opacity-50">&lt;</button>
                {pages}
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 rounded-md bg-secondary text-dark-text-secondary hover:bg-dark-border disabled:opacity-50">&gt;</button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <DashboardStats />
            <MatchSuggestions />

            <div className="bg-dark-card p-6 rounded-lg shadow-md border border-dark-border">
                <div className="flex flex-col md:flex-row gap-4">
                     <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                           <SearchIcon />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name, skill, or location..."
                            value={searchQuery}
                            onChange={(e) => {setSearchQuery(e.target.value); setCurrentPage(1);}}
                            className="w-full bg-secondary border border-dark-border rounded-lg p-3 pl-10 text-white focus:ring-primary focus:border-primary"
                        />
                     </div>
                    <select
                        value={availabilityFilter}
                        onChange={(e) => {setAvailabilityFilter(e.target.value); setCurrentPage(1);}}
                        className="bg-secondary border border-dark-border rounded-lg p-3 text-white focus:ring-primary focus:border-primary md:w-1/4"
                    >
                        <option value="All">All Availabilities</option>
                        {Object.values(Availability).map(avail => <option key={avail} value={avail}>{avail}</option>)}
                    </select>
                </div>
            </div>

            <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {currentUsers.length > 0 ? currentUsers.map(user => (
                        <UserCard key={user.id} user={user} onRequestSwap={handleRequestSwap} />
                    )) : (
                        <div className="lg:col-span-2 text-center py-10">
                            <p className="text-dark-text-secondary">No users found matching your criteria.</p>
                        </div>
                    )}
                </div>
                {renderPagination()}
            </>
            
            {selectedUser && (
                <RequestSwapModal
                    isOpen={isRequestModalOpen}
                    onClose={() => setRequestModalOpen(false)}
                    targetUser={selectedUser}
                />
            )}
            <LoginPromptModal
                isOpen={isLoginPromptOpen}
                onClose={() => setLoginPromptOpen(false)}
            />
        </div>
    );
};

export default HomePage;
