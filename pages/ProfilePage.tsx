
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Availability, Skill } from '../types';
import { SKILLS } from '../constants';
import SkillTag from '../components/SkillTag';
import { useNavigate } from 'react-router-dom';
import SkillEditor from '../components/SkillEditor';
import BackButton from '../components/BackButton';

const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-dark-text-secondary" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 20l-4.95-5.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-dark-text-secondary" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>;

const ProfilePage: React.FC = () => {
    const { user, updateUser } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user) {
            setProfile(JSON.parse(JSON.stringify(user))); // Deep copy
        }
    }, [user]);
    
    if (!profile) {
        return <div className="text-center text-xl">Loading profile...</div>;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(p => p ? { ...p, [name]: value } : null);
        if (!isEditing) setIsEditing(true);
    };

    const handleSkillChange = (type: 'skillsOffered' | 'skillsWanted', newSkills: Skill[]) => {
        setProfile(p => p ? { ...p, [type]: newSkills } : null);
        if (!isEditing) setIsEditing(true);
    };

    const handleAddSkill = (type: 'skillsOffered' | 'skillsWanted', skillName: string) => {
        const existingSkill = SKILLS.find(s => s.name.toLowerCase() === skillName.toLowerCase());
        const newSkill = existingSkill || { id: `new-${Date.now()}`, name: skillName };
        if (skillName && !profile[type].some(s => s.name === skillName)) {
            handleSkillChange(type, [...profile[type], newSkill]);
        }
    };
    
    const handleRemoveSkill = (type: 'skillsOffered' | 'skillsWanted', skillId: string) => {
        handleSkillChange(type, profile[type].filter(s => s.id !== skillId));
    };
    
    const handleSave = () => {
        if (profile) {
            updateUser(profile);
            setIsEditing(false);
            alert("Profile saved successfully!");
        }
    };
    
    const handleDiscard = () => {
        if (user) {
            setProfile(JSON.parse(JSON.stringify(user)));
            setIsEditing(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <BackButton />
            <div className="bg-dark-card p-8 rounded-lg shadow-lg border border-dark-border">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white">Your Profile</h1>
                    <div>
                    {isEditing && (
                        <>
                            <button onClick={handleDiscard} className="text-dark-text-secondary hover:text-white font-semibold py-2 px-4 rounded-lg mr-2">Discard</button>
                            <button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Save Changes</button>
                        </>
                    )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1 flex flex-col items-center">
                        <img src={profile.profilePhotoUrl} alt={profile.name} className="w-40 h-40 rounded-full border-4 border-primary shadow-md" />
                        <div className="mt-4 flex gap-2">
                            <button className="text-sm text-primary hover:underline">Add/Edit</button>
                            <button className="text-sm text-red-500 hover:underline">Remove</button>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-dark-text-secondary mb-1">Name</label>
                            <input type="text" name="name" value={profile.name} onChange={handleInputChange} className="w-full bg-secondary border border-dark-border rounded-lg p-2.5 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-dark-text-secondary mb-1">Location</label>
                            <div className="relative">
                               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><LocationIcon /></div>
                               <input type="text" name="location" value={profile.location || ''} onChange={handleInputChange} className="w-full bg-secondary border border-dark-border rounded-lg p-2.5 pl-10 text-white" placeholder="e.g., Mumbai, India" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-dark-text-secondary mb-1">Availability</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><CalendarIcon /></div>
                                <select name="availability" value={profile.availability} onChange={handleInputChange} className="w-full bg-secondary border border-dark-border rounded-lg p-2.5 pl-10 text-white appearance-none">
                                    {Object.values(Availability).map(avail => <option key={avail} value={avail}>{avail}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <SkillEditor title="Skills Offered" skills={profile.skillsOffered} onAdd={(skill) => handleAddSkill('skillsOffered', skill)} onRemove={(id) => handleRemoveSkill('skillsOffered', id)} />
                            <SkillEditor title="Skills Wanted" skills={profile.skillsWanted} onAdd={(skill) => handleAddSkill('skillsWanted', skill)} onRemove={(id) => handleRemoveSkill('skillsWanted', id)} />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-dark-text-secondary">Profile Visibility</label>
                            <div className="mt-2 flex items-center">
                                <button onClick={() => { setProfile(p => p ? {...p, isProfilePublic: !p.isProfilePublic} : null); if (!isEditing) setIsEditing(true);}} className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${profile.isProfilePublic ? 'bg-primary' : 'bg-gray-400'}`}>
                                    <span className={`inline-block w-5 h-5 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 ${profile.isProfilePublic ? 'translate-x-5' : 'translate-x-0'}`}/>
                                </button>
                                <span className="ml-3 text-sm text-white">{profile.isProfilePublic ? 'Public' : 'Private'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
