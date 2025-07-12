
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginPromptModal: React.FC<LoginPromptModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate('/login');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Login Required">
      <div className="text-center">
        <p className="text-dark-text-secondary mb-6">You need to be logged in to send a swap request.</p>
        <div className="flex justify-center gap-4">
          <button onClick={onClose} className="bg-secondary hover:bg-dark-border text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Cancel
          </button>
          <button onClick={handleLogin} className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Login
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginPromptModal;
