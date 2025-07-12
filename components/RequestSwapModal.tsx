
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Skill, SwapRequest, SwapStatus } from '../types';
import Modal from './Modal';
import { addSwapRequest } from '../services/swapRequestService';

interface RequestSwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUser: User;
}

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
)

const RequestSwapModal: React.FC<RequestSwapModalProps> = ({ isOpen, onClose, targetUser }) => {
  const { user } = useAuth();
  const [offeredSkillId, setOfferedSkillId] = useState<string>('');
  const [wantedSkillId, setWantedSkillId] = useState<string>('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !offeredSkillId || !wantedSkillId) {
      alert("Please select both skills.");
      return;
    }
    
    const fromUser = user;
    const toUser = targetUser;

    const offeredSkill = fromUser.skillsOffered.find(s => s.id === offeredSkillId);
    const wantedSkill = toUser.skillsOffered.find(s => s.id === wantedSkillId);

    if (!offeredSkill || !wantedSkill) {
        alert("An error occurred selecting skills. Please try again.");
        return;
    }

    const newRequest: Omit<SwapRequest, 'id' | 'createdAt'> = {
        fromUser,
        toUser,
        offeredSkill,
        wantedSkill,
        message,
        status: SwapStatus.Pending,
    };
    
    addSwapRequest(newRequest);

    alert(`Swap request sent to ${targetUser.name}!`);
    onClose();
  };

  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Send Swap Request to ${targetUser.name}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="offeredSkill" className="block text-sm font-medium text-dark-text-secondary mb-1">Select one of your offered skills</label>
          <select
            id="offeredSkill"
            value={offeredSkillId}
            onChange={(e) => setOfferedSkillId(e.target.value)}
            className="w-full bg-secondary border border-dark-border rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
            required
          >
            <option value="" disabled>Choose a skill you offer</option>
            {user.skillsOffered.map((skill) => (
              <option key={skill.id} value={skill.id}>{skill.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="wantedSkill" className="block text-sm font-medium text-dark-text-secondary mb-1">Select a skill they offer</label>
          <select
            id="wantedSkill"
            value={wantedSkillId}
            onChange={(e) => setWantedSkillId(e.target.value)}
            className="w-full bg-secondary border border-dark-border rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
            required
          >
            <option value="" disabled>Choose a skill they offer</option>
            {targetUser.skillsOffered.map((skill) => (
              <option key={skill.id} value={skill.id}>{skill.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-dark-text-secondary mb-1">Message</label>
          <textarea
            id="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-secondary border border-dark-border rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
            placeholder="Introduce yourself and explain why you'd like to swap skills..."
          />
        </div>
        <div className="flex justify-end gap-4">
          <button type="button" onClick={onClose} className="bg-secondary hover:bg-dark-border text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Cancel
          </button>
          <button type="submit" className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
            <SendIcon/>
            Send Request
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RequestSwapModal;