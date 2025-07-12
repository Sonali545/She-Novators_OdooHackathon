
import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUsers } from '../services/userService';
import { getMatchSuggestions } from '../services/matchingService';
import { Link } from 'react-router-dom';
import { MatchSuggestion } from '../types';

const SuggestionCard: React.FC<{ suggestion: MatchSuggestion }> = ({ suggestion }) => (
    <div className="bg-secondary p-4 rounded-lg border border-dark-border flex-1 min-w-[280px] flex flex-col justify-between">
        <div>
            <div className="flex items-center gap-4 mb-3">
                <img src={suggestion.user.profilePhotoUrl} alt={suggestion.user.name} className="w-12 h-12 rounded-full" />
                <div>
                    <h4 className="font-bold text-white hover:text-primary transition-colors">
                        <Link to={`/profile/${suggestion.user.id}`}>{suggestion.user.name}</Link>
                    </h4>
                    <p className="text-xs text-dark-text-secondary">{suggestion.reason}</p>
                </div>
            </div>
        </div>
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold text-primary">Match Score</span>
                <span className="text-sm font-bold text-white">{suggestion.score}%</span>
            </div>
            <div className="w-full bg-dark-border rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${suggestion.score}%` }}></div>
            </div>
        </div>
    </div>
);

const MatchSuggestions: React.FC = () => {
    const { user } = useAuth();

    const suggestions = useMemo(() => {
        if (!user) return [];
        const allUsers = getUsers();
        return getMatchSuggestions(user, allUsers).slice(0, 5);
    }, [user]);

    if (!user || suggestions.length === 0) {
        return null;
    }

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">✨ AI-Powered Suggestions</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
                {suggestions.map(suggestion => (
                    <SuggestionCard key={suggestion.user.id} suggestion={suggestion} />
                ))}
            </div>
        </div>
    );
};

export default MatchSuggestions;