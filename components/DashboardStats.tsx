
import React, { useState, useEffect } from 'react';
import { getUsers } from '../services/userService';
import { getSwapRequests } from '../services/swapRequestService';
import { SwapStatus } from '../types';

const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.274-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.274.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const SkillsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
const SwapsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>;

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: number | string }> = ({ icon, label, value }) => (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6 flex items-center gap-6 flex-1 min-w-[200px]">
        {icon}
        <div>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-dark-text-secondary">{label}</p>
        </div>
    </div>
);


const DashboardStats: React.FC = () => {
    // Data is now fetched synchronously
    const users = getUsers();
    const requests = getSwapRequests();
    
    const totalUsers = users.length;
    const uniqueSkills = new Set(users.flatMap(u => [...u.skillsOffered, ...u.skillsWanted]).map(s => s.name));
    const availableSkills = uniqueSkills.size;
    const completedSwaps = requests.filter(r => r.status === SwapStatus.Accepted).length;

    return (
        <div className="mb-8">
            <div className="flex flex-wrap gap-6">
                <StatCard icon={<UsersIcon />} label="Total Users" value={totalUsers} />
                <StatCard icon={<SkillsIcon />} label="Available Skills" value={availableSkills} />
                <StatCard icon={<SwapsIcon />} label="Completed Swaps" value={completedSwaps} />
            </div>
        </div>
    );
};

export default DashboardStats;