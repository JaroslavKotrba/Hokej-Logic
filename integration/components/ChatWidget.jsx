import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faTimes, faPaperPlane, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const ChatWidget = () => {
    const [isActive, setIsActive] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [sessionId, setSessionId] = useState('');
    const [isQuickOptionsCollapsed, setIsQuickOptionsCollapsed] = useState(false);
    const messagesEndRef = useRef(null);
    const chatMessagesRef = useRef(null);
    const inputRef = useRef(null);

    // Load CSS from Heroku
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://hokej-logic-698f50f96dfe.herokuapp.com/static/style.css';
        link.rel = 'stylesheet';
        link.id = 'hokej-chat-styles';
        document.head.appendChild(link);

        // Cleanup function to remove the CSS when component unmounts
        return () => {
            const existingLink = document.getElementById('hokej-chat-styles');
            if (existingLink) {
                document.head.removeChild(existingLink);
            }
        };
    }, []); // Empty dependency array means this runs once on mount

    const quickOptions = [
        { text: 'Kde najdu nejlepší střelce? 🏒' },
        { text: 'Co se skrývá pod zkratkou TOI..? ⏱️' },
        { text: 'Jak filtrovat hráče v tabulce? 🔍' }
    ];

    useEffect(() => {
        let storedId = localStorage.getItem('chatSessionId');
        if (!storedId) {
            storedId = crypto.randomUUID();
            localStorage.setItem('chatSessionId', storedId);
        }
        setSessionId(storedId);

        const collapsed = localStorage.getItem('quickOptionsCollapsed') === 'true';
        setIsQuickOptionsCollapsed(collapsed);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage = inputValue.trim();
        setMessages(prev => [...prev, { content: userMessage, isUser: true }]);
        setInputValue('');
        setIsTyping(true);

        try {
            const response = await fetch('https://hokej-logic-698f50f96dfe.herokuapp.com/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    session_id: sessionId
                }),
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            setMessages(prev => [...prev, { content: data.response, isUser: false }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                content: 'Omlouvám se, došlo k chybě. Zkuste to prosím znovu.',
                isUser: false
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleClear = async () => {
        try {
            const response = await fetch('https://hokej-logic-698f50f96dfe.herokuapp.com/clear', {
                method: 'POST'
            });

            if (!response.ok) throw new Error('Network response was not ok');

            setMessages([]);
            const newSessionId = crypto.randomUUID();
            setSessionId(newSessionId);
            localStorage.setItem('chatSessionId', newSessionId);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                content: 'Nepodařilo se vymazat konverzaci. Zkuste to prosím znovu.',
                isUser: false
            }]);
        }
    };

    return (
        <div className="chat-widget-container">
            <div id="chatWidget" className={`chat-widget ${isActive ? 'active' : ''}`}>
                <div className="chat-widget-header">
                    <img src="https://hokej-logic-698f50f96dfe.herokuapp.com/static/pic/hokej-white.png" alt="Hokej-Logic Logo" />
                    <h1>Hokejový Chatbot</h1>
                    <div className="status-indicator"></div>
                </div>

                <div ref={chatMessagesRef} className="chat-widget-messages" id="chatMessages">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`chat-widget-message ${msg.isUser ? 'user-message' : 'assistant-message'}`}
                        >
                            {msg.content}
                        </div>
                    ))}
                    {isTyping && (
                        <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="quick-options-header">
                    <span>Časté dotazy</span>
                    <button
                        onClick={() => {
                            setIsQuickOptionsCollapsed(!isQuickOptionsCollapsed);
                            localStorage.setItem('quickOptionsCollapsed', (!isQuickOptionsCollapsed).toString());
                        }}
                        className="toggle-quick-options"
                    >
                        <FontAwesomeIcon
                            icon={faChevronUp}
                            className={isQuickOptionsCollapsed ? 'collapsed' : ''}
                        />
                    </button>
                </div>

                <div className={`quick-options ${isQuickOptionsCollapsed ? 'collapsed' : ''}`}>
                    {quickOptions.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => setInputValue(option.text.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2300}-\u{23FF}]|[\u{2702}-\u{27B0}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|\u{FE0F}/gu, '').trim())}
                            className="quick-option"
                        >
                            {option.text}
                        </button>
                    ))}
                </div>

                <div className="chat-widget-input">
                    <div className="input-wrapper">
                        <textarea
                            ref={inputRef}
                            id="userInput"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder="Napište svou zprávu..."
                        />
                        <button
                            onClick={handleSend}
                            disabled={!inputValue.trim()}
                            className="send-button"
                            id="sendButton"
                        >
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleClear}
                    className="clear-button"
                    id="clearButton"
                >
                    Vymazat konverzaci
                </button>

                <div className="love-message">
                    <em>@jaro <span>♥</span></em>
                </div>
            </div>

            <button
                onClick={() => setIsActive(!isActive)}
                id="toggleChat"
                className="chat-widget-button"
            >
                <FontAwesomeIcon icon={isActive ? faTimes : faComments} />
            </button>
        </div>
    );
};

export default ChatWidget;