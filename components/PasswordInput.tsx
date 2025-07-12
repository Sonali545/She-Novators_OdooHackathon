import React, { useState } from 'react';

const EyeIcon = ({ closed }: { closed: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {closed ? (
            <>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-1.29-1.29m-2.276 2.275L5.186 9.186A9.97 9.97 0 0112 5c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.563 3.029m-2.275 2.275l-1.29 1.29" />
            </>
        ) : (
            <>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </>
        )}
    </svg>
);


interface PasswordInputProps {
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ id, value, onChange, placeholder, required }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="relative">
            <input
                type={isVisible ? 'text' : 'password'}
                id={id}
                value={value}
                onChange={onChange}
                className="w-full bg-secondary border border-dark-border rounded-lg p-3 pr-10 text-white focus:ring-primary focus:border-primary"
                required={required}
                placeholder={placeholder}
            />
            <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label={isVisible ? 'Hide password' : 'Show password'}
            >
                <EyeIcon closed={!isVisible} />
            </button>
        </div>
    );
};

export default PasswordInput;
