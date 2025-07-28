import { Send, Trash2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const ChatInput = ({ onSendMessage, onClearChat, isLoading }) => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() && !isLoading) {
            onSendMessage(message.trim());
            setMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [message]);

    return (
        <div className="p-3 pb-1 border-t border-gray-200 bg-white">
            <div className="relative flex items-center w-full">
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Napište svou zprávu..."
                    className="w-full p-3 pr-20 border border-gray-300 rounded-lg resize-none font-inherit min-h-[44px] max-h-[100px] leading-relaxed text-base"
                    rows={1}
                    disabled={isLoading}
                    style={{ fontSize: '16px' }} // Prevents zoom on iOS
                />

                <div className="absolute right-2 flex gap-1">
                    <button
                        type="button"
                        onClick={onClearChat}
                        className="p-1 text-gray-500 hover:text-red-500 transition-colors duration-200 min-w-[32px] min-h-[32px]"
                        title="Vymazat konverzaci"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={!message.trim() || isLoading}
                        className="bg-[#437ffe] text-white border-none rounded-full w-9 h-9 cursor-pointer flex items-center justify-center transition-colors duration-200 hover:bg-[#00395d] disabled:bg-gray-300 disabled:cursor-not-allowed"
                        title="Odeslat zprávu"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="text-center w-full mb-3 mt-2 text-xs">
                <em>@jaro <span className="text-[#437ffe]">♥</span></em>
            </div>
        </div>
    );
};

export default ChatInput; 