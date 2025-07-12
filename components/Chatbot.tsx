
import React, { useState, useRef, useEffect } from 'react';
import { getChatbotResponse } from '../services/geminiService';

const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
)

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
)

const RobotIcon = () => (
    <div className="w-10 h-10 rounded-full bg-white flex-shrink-0 flex items-center justify-center shadow">
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
            <path d="M25 13V22C25 22.5304 24.7893 23.0391 24.4142 23.4142C24.0391 23.7893 23.5304 24 23 24H9C8.46957 24 7.96086 23.7893 7.58579 23.4142C7.21071 23.0391 7 22.5304 7 22V13C7 10.925 7.82375 8.9375 9.27125 7.45625C10.7187 5.975 12.6525 5 14.625 5H17.375C19.3475 5 21.2812 5.975 22.7288 7.45625C24.1763 8.9375 25 10.925 25 13Z" fill="#A4D7F4"/>
            <path d="M23 24H9C8.46957 24 7.96086 23.7893 7.58579 23.4142C7.21071 23.0391 7 22.5304 7 22V21H25V22C25 22.5304 24.7893 23.0391 24.4142 23.4142C24.0391 23.7893 23.5304 24 23 24Z" fill="#78B9DA"/>
            <path d="M12.5 13C13.3284 13 14 12.3284 14 11.5C14 10.6716 13.3284 10 12.5 10C11.6716 10 11 10.6716 11 11.5C11 12.3284 11.6716 13 12.5 13Z" fill="white"/>
            <path d="M19.5 13C20.3284 13 21 12.3284 21 11.5C21 10.6716 20.3284 10 19.5 10C18.6716 10 18 10.6716 18 11.5C18 12.3284 18.6716 13 19.5 13Z" fill="white"/>
            <path d="M19.45 18.0375C19.45 19.2625 18.0625 20.125 16 20.125C13.9375 20.125 12.55 19.2625 12.55 18.0375C12.55 16.8125 13.9375 16.25 16 16.25C18.0625 16.25 19.45 16.8125 19.45 18.0375Z" fill="white"/>
            <path d="M6 13H4C3.45 13 3 13.45 3 14C3 14.55 3.45 15 4 15H6V13Z" fill="#A4D7F4"/>
            <path d="M28 13H26V15H28C28.55 15 29 14.55 29 14C29 13.45 28.55 13 28 13Z" fill="#A4D7F4"/>
        </svg>
    </div>
);


interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

const initialMessages: Message[] = [
    { role: 'model', parts: [{ text: "Welcome to chatbot!" }] },
    { role: 'model', parts: [{ text: "Check out the documentation!" }] },
];

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    useEffect(() => {
        // Reset to initial messages when chat is opened, if it was cleared before.
        if (isOpen && messages.length === 0) {
            setMessages(initialMessages);
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;
        
        const userMessage: Message = { role: 'user', parts: [{ text: input }] };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const history = messages.map(msg => ({ role: msg.role, parts: msg.parts }));
        const responseText = await getChatbotResponse(input, history);
        
        const modelMessage: Message = { role: 'model', parts: [{ text: responseText }] };
        setMessages(prev => [...prev, modelMessage]);
        setIsLoading(false);
    };
    
    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-primary h-16 w-16 rounded-full flex items-center justify-center shadow-lg hover:bg-primary-hover transition-transform transform hover:scale-110"
                aria-label="Open chatbot"
            >
                <ChatIcon />
            </button>
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-full max-w-sm h-[60vh] bg-dark-card rounded-lg shadow-2xl flex flex-col transition-all">
                    <header className="flex items-center justify-between p-4 bg-secondary rounded-t-lg">
                        <h3 className="text-lg font-bold text-white">Skill Swap Assistant</h3>
                        <button onClick={() => setIsOpen(false)} className="text-dark-text-secondary hover:text-white">
                            <CloseIcon />
                        </button>
                    </header>
                    <div className="flex-1 p-4 overflow-y-auto space-y-2">
                        {messages.map((msg, index) => {
                             const isModel = msg.role === 'model';
                             const prevMsgRole = index > 0 ? messages[index - 1].role : null;
                             const showAvatar = isModel && prevMsgRole !== 'model';
                             
                             if (isModel) {
                                return (
                                    <div key={index} className="flex items-start gap-2.5">
                                        <div className="w-10 h-10 flex-shrink-0">
                                            {showAvatar && <RobotIcon />}
                                        </div>
                                        <div className={`max-w-xs lg:max-w-sm px-4 py-2 rounded-xl bg-chatbot-model-bg text-white rounded-bl-none`}>
                                            <p className="text-sm font-mono">{msg.parts[0].text}</p>
                                        </div>
                                    </div>
                                );
                             } else { // User message
                                return (
                                    <div key={index} className="flex justify-end">
                                        <div className="max-w-xs lg:max-w-sm px-4 py-2 rounded-xl bg-primary text-white rounded-br-none">
                                            <p className="text-sm font-mono">{msg.parts[0].text}</p>
                                        </div>
                                    </div>
                                );
                             }
                        })}
                        {isLoading && (
                             <div className="flex items-start gap-2.5">
                                 <div className="w-10 h-10 flex-shrink-0">
                                     <RobotIcon />
                                 </div>
                                 <div className="max-w-xs lg:max-w-sm px-4 py-2 rounded-xl bg-chatbot-model-bg text-white rounded-bl-none">
                                     <div className="flex items-center space-x-2">
                                         <div className="w-2 h-2 bg-white rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                                         <div className="w-2 h-2 bg-white rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                                         <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                     </div>
                                 </div>
                             </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                    <div className="p-4 border-t border-dark-border">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask me anything..."
                                className="flex-1 bg-secondary border border-dark-border rounded-lg p-2.5 text-white focus:ring-primary focus:border-primary"
                                disabled={isLoading}
                            />
                            <button onClick={handleSend} disabled={isLoading} className="bg-primary hover:bg-primary-hover text-white p-2.5 rounded-lg disabled:opacity-50">
                                <SendIcon />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
