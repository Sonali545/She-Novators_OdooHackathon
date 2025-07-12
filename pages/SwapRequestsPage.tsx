

import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getSwapRequests, updateSwapRequest } from '../services/swapRequestService';
import { SwapRequest, SwapStatus } from '../types';
import SkillTag from '../components/SkillTag';
import BackButton from '../components/BackButton';

const StatusBadge: React.FC<{ status: SwapStatus }> = ({ status }) => {
    const baseClasses = 'px-3 py-1 text-xs font-bold rounded-full text-white';
    const statusClasses = {
        [SwapStatus.Pending]: 'bg-yellow-500',
        [SwapStatus.Accepted]: 'bg-green-500',
        [SwapStatus.Rejected]: 'bg-red-500',
        [SwapStatus.Cancelled]: 'bg-gray-500',
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
}

const AcceptIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>;
const RejectIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
const SwapArrowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-dark-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>;

const FeedbackButton: React.FC<{ onRequestId: string }> = ({ onRequestId }) => {
    const [submitted, setSubmitted] = useState(false);

    const handleClick = () => {
        // In a real app, this would open a feedback modal.
        // For this demo, we'll just simulate the submission.
        setSubmitted(true);
        alert(`Feedback submitted for request ${onRequestId}`);
    };

    if (submitted) {
        return <button className="bg-gray-600 text-dark-text-secondary font-semibold py-1 px-3 rounded-lg text-sm cursor-not-allowed" disabled>Feedback Submitted</button>;
    }

    return <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-lg text-sm">Leave Feedback</button>;
}

const RequestCard: React.FC<{ request: SwapRequest, isIncoming: boolean, onAction: (id: string, action: 'accept' | 'reject') => void }> = ({ request, isIncoming, onAction }) => {
    const otherUser = isIncoming ? request.fromUser : request.toUser;
    
    return (
        <div className="bg-dark-card rounded-lg shadow-md p-5 border border-dark-border">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex items-center gap-4 flex-shrink-0">
                    <img src={otherUser.profilePhotoUrl} alt={otherUser.name} className="w-16 h-16 rounded-full"/>
                    <div>
                        <h4 className="font-bold text-lg text-white">{otherUser.name}</h4>
                        <p className="text-sm text-dark-text-secondary">{new Date(request.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                    <p className="text-sm text-dark-text-secondary mb-2">{isIncoming ? `${otherUser.name} wants to swap:` : 'You requested to swap:'}</p>
                    <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
                        <SkillTag skillName={request.offeredSkill.name} className="bg-teal-600 text-white"/>
                        <SwapArrowIcon />
                        <SkillTag skillName={request.wantedSkill.name} className="bg-indigo-600 text-white"/>
                    </div>
                </div>
                <div className="w-full md:w-auto flex flex-col items-center gap-2">
                    <StatusBadge status={request.status} />
                    {isIncoming && request.status === SwapStatus.Pending && (
                        <div className="flex gap-2 mt-2">
                            <button onClick={() => onAction(request.id, 'accept')} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded-lg text-sm flex items-center gap-1"><AcceptIcon /> Accept</button>
                            <button onClick={() => onAction(request.id, 'reject')} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-lg text-sm flex items-center gap-1"><RejectIcon /> Reject</button>
                        </div>
                    )}
                    {request.status === SwapStatus.Accepted && (
                         <div className="mt-2">
                            <FeedbackButton onRequestId={request.id} />
                         </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const SwapRequestsPage: React.FC = () => {
    const { user } = useAuth();
    const [requests, setRequests] = useState<SwapRequest[]>(() => getSwapRequests()); // Load initial data
    const [filter, setFilter] = useState<string>('All');
    
    const incomingRequests = useMemo(() => {
        return requests.filter(r => r.toUser.id === user?.id && (filter === 'All' || r.status === filter));
    }, [requests, user, filter]);

    const outgoingRequests = useMemo(() => {
        return requests.filter(r => r.fromUser.id === user?.id && (filter === 'All' || r.status === filter));
    }, [requests, user, filter]);

    const handleAction = (id: string, action: 'accept' | 'reject') => {
        const requestToUpdate = requests.find(r => r.id === id);
        if (requestToUpdate) {
            const updatedRequest = { ...requestToUpdate, status: action === 'accept' ? SwapStatus.Accepted : SwapStatus.Rejected };
            updateSwapRequest(updatedRequest);
            setRequests(getSwapRequests()); // Re-fetch from localStorage to update state
            alert(`Request has been ${action}ed.`);
        }
    };

    if (!user) return null;

    return (
        <div className="space-y-8">
            <BackButton />
            <h1 className="text-3xl font-bold text-white">Swap Requests</h1>
            
            <div className="bg-dark-card p-4 rounded-lg flex items-center gap-2 flex-wrap">
                <span className="text-dark-text-secondary pr-2">Filter by status:</span>
                {['All', ...Object.values(SwapStatus)].map(status => (
                    <button key={status} onClick={() => setFilter(status)} className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${filter === status ? 'bg-primary text-white' : 'bg-secondary text-dark-text-secondary hover:bg-dark-border'}`}>
                        {status}
                    </button>
                ))}
            </div>

            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-semibold text-white mb-4">Incoming Requests ({incomingRequests.length})</h2>
                    <div className="space-y-4">
                        {incomingRequests.length > 0 ? (
                            incomingRequests.map(req => <RequestCard key={req.id} request={req} isIncoming={true} onAction={handleAction} />)
                        ) : (
                            <div className="bg-dark-card p-6 rounded-lg text-center text-dark-text-secondary">No incoming requests matching the filter.</div>
                        )}
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-white mb-4">Outgoing Requests ({outgoingRequests.length})</h2>
                    <div className="space-y-4">
                        {outgoingRequests.length > 0 ? (
                            outgoingRequests.map(req => <RequestCard key={req.id} request={req} isIncoming={false} onAction={handleAction}/>)
                        ) : (
                            <div className="bg-dark-card p-6 rounded-lg text-center text-dark-text-secondary">No outgoing requests matching the filter.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SwapRequestsPage;