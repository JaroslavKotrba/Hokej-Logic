import { useState, useEffect, useRef } from 'react';
import { chatAPI } from '../services/api';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import QuickOptions from './QuickOptions';
import ChatInput from './ChatInput';
import { AlertCircle } from 'lucide-react';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sessionId, setSessionId] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [ratings, setRatings] = useState({});
    const [hasShownWelcome, setHasShownWelcome] = useState(false);
    const messagesEndRef = useRef(null);

    // Generate or retrieve session ID on component mount
    useEffect(() => {
        // Check if session ID already exists in localStorage
        let existingSessionId = localStorage.getItem('chatSessionId');

        if (!existingSessionId) {
            // Generate new session ID if none exists
            existingSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('chatSessionId', existingSessionId);
        }

        setSessionId(existingSessionId);
    }, []);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Show welcome message when chat is first opened
    useEffect(() => {
        if (isChatOpen && !hasShownWelcome) {
            const welcomeMessage = {
                id: 'welcome',
                content: '👋 Ahoj! Jsem váš asistent pro hokejlogic.cz. Jak vám mohu pomoci?',
                isUser: false,
                timestamp: new Date().toISOString(),
            };
            setMessages([welcomeMessage]);
            setHasShownWelcome(true);
        }
    }, [isChatOpen, hasShownWelcome]);

    const sendMessage = async (message) => {
        if (!message.trim()) return;

        const userMessage = {
            id: Date.now(),
            content: message,
            isUser: true,
            timestamp: new Date().toISOString(),
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        setError(null);

        // Show typing indicator with a small delay like the original
        setTimeout(() => {
            setIsLoading(true);
        }, 10);

        try {
            const response = await chatAPI.sendMessage(message, sessionId);

            const botMessage = {
                id: response.message_id, // Use database ID
                content: response.response,
                isUser: false,
                timestamp: new Date().toISOString(),
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (err) {
            setError(err.message);
            console.error('Error sending message:', err);
        } finally {
            // Hide typing indicator with fade-out like the original
            setTimeout(() => {
                setIsLoading(false);
            }, 300);
        }
    };

    const clearChat = async () => {
        try {
            await chatAPI.clearConversation();
            setMessages([]);
            setError(null);
            setHasShownWelcome(false); // Reset welcome message state
        } catch (err) {
            setError('Failed to clear conversation');
            console.error('Error clearing chat:', err);
        }
    };

    const handleQuickOption = (query) => {
        sendMessage(query);
    };

    const handleRate = (messageId, rating) => {
        setRatings(prev => ({
            ...prev,
            [messageId]: rating
        }));

        // Log the rating for debugging
        console.log(`Message ${messageId} rated as: ${rating} (${rating === 1 ? 'thumbs up' : rating === -1 ? 'thumbs down' : 'neutral'})`);
    };

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <div className="fixed bottom-4 right-4 z-[1000] w-[90vw] max-w-[400px] sm:w-[360px] flex flex-col font-sans">
            {/* Main Chat Widget */}
            {isChatOpen && (
                <div className="bg-white rounded-2xl shadow-lg h-[70vh] max-h-[600px] mb-2 overflow-hidden flex flex-col">
                    {/* Header */}
                    <ChatHeader />

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                        {/* Messages */}
                        <div className="space-y-2">
                            {messages.map((message) => (
                                <ChatMessage
                                    key={message.id}
                                    messageId={message.id}
                                    message={message.content}
                                    isUser={message.isUser}
                                    timestamp={message.timestamp}
                                    onRate={handleRate}
                                />
                            ))}

                            {/* Typing Indicator */}
                            {isLoading && <TypingIndicator />}

                            {/* Error Message */}
                            {error && (
                                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                                    <AlertCircle className="w-5 h-5" />
                                    <span className="text-sm">{error}</span>
                                </div>
                            )}
                        </div>

                        {/* Auto-scroll anchor */}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Options - always visible at bottom */}
                    <QuickOptions onOptionClick={handleQuickOption} />

                    {/* Input Area */}
                    <ChatInput
                        onSendMessage={sendMessage}
                        onClearChat={clearChat}
                        isLoading={isLoading}
                    />
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={toggleChat}
                className={`self-end text-white border-none rounded-full w-[60px] h-[60px] cursor-pointer shadow-lg flex items-center justify-center text-2xl transition-all duration-200 hover:scale-110 active:scale-95 relative ${isChatOpen ? 'bg-red-600' : 'bg-[#437ffe]'
                    }`}
            >
                {isChatOpen ? (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default Chat; 