import { User } from 'lucide-react';
import { clsx } from 'clsx';
import hokejLogo from '../assets/hokej-white.png';
import MessageRating from './MessageRating';

const ChatMessage = ({ message, isUser, timestamp, messageId, onRate }) => {
    return (
        <div className={clsx(
            "flex gap-3 mb-4 animate-fade-in",
            isUser ? "justify-end" : "justify-start"
        )}>
            {!isUser && (
                <div className="flex-shrink-0 w-8 h-8 bg-[#437ffe] rounded-full flex items-center justify-center overflow-hidden">
                    <img
                        src={hokejLogo}
                        alt="Hokej-Logic Logo"
                        className="w-5 h-5 object-contain"
                    />
                </div>
            )}

            <div className={clsx(
                "max-w-[80%] p-3 rounded-xl leading-relaxed",
                isUser
                    ? "bg-[#e3f2fd] ml-auto"
                    : "bg-[#f5f5f5] mr-auto"
            )}>
                <p className="text-sm whitespace-pre-wrap">
                    {message}
                </p>
                {timestamp && (
                    <p className={clsx(
                        "text-xs mt-2",
                        isUser ? "text-blue-600" : "text-gray-500"
                    )}>
                        {new Date(timestamp).toLocaleTimeString('cs-CZ', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </p>
                )}

                {/* Rating component for bot messages */}
                {!isUser && onRate && (
                    <MessageRating messageId={messageId} onRate={onRate} />
                )}
            </div>

            {isUser && (
                <div className="flex-shrink-0 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                </div>
            )}
        </div>
    );
};

export default ChatMessage; 