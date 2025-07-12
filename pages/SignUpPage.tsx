
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Availability, Skill } from '../types';
import SkillEditor from '../components/SkillEditor';
import { SKILLS } from '../constants';
import PasswordInput from '../components/PasswordInput';
import BackButton from '../components/BackButton';

const SignUpIllustration = () => (
    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6 h-24 w-24 text-primary">
        <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const SignUpPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [skillsOffered, setSkillsOffered] = useState<Skill[]>([]);
    const [skillsWanted, setSkillsWanted] = useState<Skill[]>([]);
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleAddSkill = (type: 'offered' | 'wanted', skillName: string) => {
        const skillList = type === 'offered' ? skillsOffered : skillsWanted;
        const setSkillList = type === 'offered' ? setSkillsOffered : setSkillsWanted;

        if (skillList.some(s => s.name.toLowerCase() === skillName.toLowerCase())) {
            return;
        }

        const existingSkill = SKILLS.find(s => s.name.toLowerCase() === skillName.toLowerCase());
        const newSkill = existingSkill || { id: `new-${Date.now()}-${Math.random()}`, name: skillName };
        
        setSkillList([...skillList, newSkill]);
    };

    const handleRemoveSkill = (type: 'offered' | 'wanted', skillId: string) => {
        const setSkillList = type === 'offered' ? setSkillsOffered : setSkillsWanted;
        setSkillList(prev => prev.filter(s => s.id !== skillId));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        
        const newUser = {
            name,
            email,
            password,
            skillsOffered,
            skillsWanted,
            availability: Availability.Flexible,
            isProfilePublic: true,
            rating: 0,
            reviews: 0,
            feedback: [],
        };
        
        const result = signup(newUser);
        if (result.success) {
            navigate('/login', { state: { successMessage: 'Account created successfully! Please log in.' } });
        } else {
             setError(result.message);
        }
    };

    return (
        <div className="max-w-lg mx-auto py-12">
            <BackButton />
            <div className="w-full bg-dark-card p-8 rounded-lg shadow-lg border border-dark-border">
                <SignUpIllustration />
                <h2 className="text-3xl font-bold text-center text-white mb-2">Create Your Account</h2>
                <p className="text-center text-dark-text-secondary mb-8">Join SkillForge and start swapping skills today!</p>
                {error && <p className="bg-red-900 border border-red-700 text-red-300 text-sm rounded-lg p-3 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-dark-text-secondary mb-1">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-secondary border border-dark-border rounded-lg p-3 text-white focus:ring-primary focus:border-primary"
                                required
                                placeholder="e.g., Priya Sharma"
                            />
                        </div>
                         <div>
                            <label htmlFor="email" className="block text-sm font-medium text-dark-text-secondary mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-secondary border border-dark-border rounded-lg p-3 text-white focus:ring-primary focus:border-primary"
                                required
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="password" className="block text-sm font-medium text-dark-text-secondary mb-1">Password</label>
                        <PasswordInput
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="At least 6 characters"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                       <SkillEditor title="Skills You Offer" skills={skillsOffered} onAdd={(skill) => handleAddSkill('offered', skill)} onRemove={(id) => handleRemoveSkill('offered', id)} />
                       <SkillEditor title="Skills You Want" skills={skillsWanted} onAdd={(skill) => handleAddSkill('wanted', skill)} onRemove={(id) => handleRemoveSkill('wanted', id)} />
                    </div>

                    <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-lg transition-colors">
                        Create Account
                    </button>
                </form>
                <p className="text-sm text-center text-dark-text-secondary mt-6">
                    Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
