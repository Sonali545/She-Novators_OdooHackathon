
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);


const BackButton: React.FC = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-dark-text-secondary hover:text-white font-semibold mb-6 transition-colors"
        >
            <BackIcon />
            Back
        </button>
    );
};

export default BackButton;
