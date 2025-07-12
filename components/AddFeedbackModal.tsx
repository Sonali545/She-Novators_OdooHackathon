
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Feedback } from '../types';
import Modal from './Modal';
import StarIcon from './StarIcon';
import { updateUserInStorage } from '../services/userService';

interface AddFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUser: User;
  onFeedbackAdded: (updatedUser: User) => void;
}

const AddFeedbackModal: React.FC<AddFeedbackModalProps> = ({ isOpen, onClose, targetUser, onFeedbackAdded }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || rating === 0) {
      alert("Please provide a rating.");
      return;
    }

    const newFeedback: Feedback = {
        id: `fb-${Date.now()}`,
        fromUserName: user.name,
        fromUserPhotoUrl: user.profilePhotoUrl,
        rating,
        comment,
    };
    
    // Calculate new average rating
    const totalRatingPoints = (targetUser.rating * targetUser.reviews) + rating;
    const newReviewsCount = targetUser.reviews + 1;
    const newAverageRating = totalRatingPoints / newReviewsCount;

    const updatedTargetUser: User = {
        ...targetUser,
        rating: newAverageRating,
        reviews: newReviewsCount,
        feedback: [newFeedback, ...(targetUser.feedback || [])], // Add new feedback to the top
    };
    
    // Persist changes
    updateUserInStorage(updatedTargetUser);

    // Notify parent component to update state
    onFeedbackAdded(updatedTargetUser);
    
    // Reset and close
    setRating(0);
    setComment('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Leave Feedback for ${targetUser.name}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-dark-text-secondary mb-2">Your Rating</label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <StarIcon
                  filled={(hoverRating || rating) >= star}
                  className="h-8 w-8 cursor-pointer transition-transform transform hover:scale-125"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-dark-text-secondary mb-1">Comment (optional)</label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-secondary border border-dark-border rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
            placeholder="Share your experience with this user..."
          />
        </div>
        <div className="flex justify-end gap-4">
          <button type="button" onClick={onClose} className="bg-secondary hover:bg-dark-border text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Cancel
          </button>
          <button type="submit" className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50" disabled={rating === 0}>
            Submit Feedback
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddFeedbackModal;
