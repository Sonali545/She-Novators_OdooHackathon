
import React from 'react';
import { Feedback } from '../types';
import StarIcon from './StarIcon';

const FeedbackCard: React.FC<{ feedback: Feedback }> = ({ feedback }) => (
    <div className="border-t border-dark-border pt-4 first:mt-0 first:border-t-0 first:pt-0">
        <div className="flex items-start gap-3">
            <img src={feedback.fromUserPhotoUrl} alt={feedback.fromUserName} className="w-10 h-10 rounded-full"/>
            <div>
                <div className="flex items-center justify-between">
                    <p className="font-semibold text-white text-sm">{feedback.fromUserName}</p>
                    <div className="flex items-center">
                         {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < feedback.rating} />)}
                    </div>
                </div>
                <p className="text-sm text-dark-text-secondary mt-1 italic">"{feedback.comment}"</p>
            </div>
        </div>
    </div>
);

export default FeedbackCard;
