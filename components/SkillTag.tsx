
import React from 'react';

interface SkillTagProps {
  skillName: string;
  onRemove?: () => void;
  className?: string;
}

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const SkillTag: React.FC<SkillTagProps> = ({ skillName, onRemove, className }) => {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${className}`}>
      {skillName}
      {onRemove && (
        <button onClick={onRemove} className="ml-2 -mr-1 flex-shrink-0 p-1 rounded-full inline-flex items-center justify-center text-indigo-200 hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span className="sr-only">Remove {skillName}</span>
          <CloseIcon />
        </button>
      )}
    </span>
  );
};

export default SkillTag;
