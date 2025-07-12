
import React from 'react';

const HeroIllustration: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <svg viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
            <radialGradient id="lampGlow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="rgba(255, 255, 220, 0.5)" />
                <stop offset="100%" stopColor="rgba(255, 255, 220, 0)" />
            </radialGradient>
        </defs>
      
        {/* Background shapes */}
        <path d="M-10,350 Q250,250 510,350 L510,400 L-10,400 Z" fill="#121212" />
        <path d="M-10,350 Q250,280 510,350" fill="none" stroke="#27272a" strokeWidth="1" />
        
        {/* Desk Lamp */}
        <g transform="translate(100 80) scale(0.8)">
            <path d="M50,150 L60,150 L60,100 L120,40" stroke="#9ca3af" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M120,40 L160,80" stroke="#9ca3af" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M160 80 Q180 100 160 120 L120 120 Q100 100 120 80 Z" fill="#4f46e5"/>
            <circle cx="60" cy="150" r="10" fill="#27272a"/>
            <path d="M110,130 L200,300" fill="url(#lampGlow)" transform="rotate(20, 140, 100)" />
        </g>

        {/* Laptop */}
        <g>
          <rect x="150" y="150" width="200" height="120" rx="10" fill="#1e1e1e" stroke="#27272a" strokeWidth="2"/>
          <rect x="140" y="270" width="220" height="10" rx="5" fill="#121212"/>
          <rect x="175" y="280" width="150" height="5" rx="2.5" fill="#27272a"/>

          {/* Chatbot on screen */}
          <g transform="translate(180, 180)">
              <path d="M25 13V22C25 22.5304 24.7893 23.0391 24.4142 23.4142C24.0391 23.7893 23.5304 24 23 24H9C8.46957 24 7.96086 23.7893 7.58579 23.4142C7.21071 23.0391 7 22.5304 7 22V13C7 10.925 7.82375 8.9375 9.27125 7.45625C10.7187 5.975 12.6525 5 14.625 5H17.375C19.3475 5 21.2812 5.975 22.7288 7.45625C24.1763 8.9375 25 10.925 25 13Z" fill="#4f46e5" transform="scale(1.5)"/>
              <circle cx="12.5" cy="11.5" r="2" fill="white" transform="translate(5, 5) scale(1.5)"/>
              <circle cx="19.5" cy="11.5" r="2" fill="white" transform="translate(5, 5) scale(1.5)"/>
          </g>
          <rect x="230" y="190" width="80" height="8" rx="2" fill="#27272a" />
          <rect x="230" y="205" width="60" height="8" rx="2" fill="#27272a" />
        </g>
        
        {/* Character 1 (sitting) */}
        <g transform="translate(380 235)">
            <circle cx="0" cy="-15" r="10" fill="#e5e7eb" />
            <path d="M-15,0 C-15,20 15,20 15,0 Z" fill="#4338ca" />
            <rect x="-10" y="15" width="20" height="5" rx="2" fill="#1e1e1e" />
        </g>
        
        {/* Character 2 (on top) */}
        <g transform="translate(280 100)">
            <rect x="-20" y="10" width="30" height="15" rx="5" fill="#1e1e1e"/>
            <path d="M-25,0 L15,0 L10,20 L-30,20 Z" fill="#ef4444" />
            <circle cx="10" cy="-5" r="8" fill="#e5e7eb"/>
        </g>

        {/* Other decorative elements */}
        <g opacity="0.8">
            <path d="M400,100 C420,80 440,120 420,140" fill="none" stroke="#059669" strokeWidth="4" strokeLinecap="round"/>
            <path d="M80,250 C100,230 120,270 100,290" fill="none" stroke="#d97706" strokeWidth="4" strokeLinecap="round"/>
            <path d="M420,180 h 30" stroke="#e5e7eb" strokeWidth="3" strokeLinecap="round"/>
            <path d="M425,190 h 20" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round"/>
        </g>
      </svg>
    </div>
  );
};

export default HeroIllustration;
