import { User } from 'lucide-react';
import { clsx } from 'clsx';
import hokejLogo from '../assets/hokej-white.png';
import MessageRating from './MessageRating';

// Function to render message content with clickable links and bold text
const renderMessageContent = (content) => {
    if (!content) return content;

    // First, handle links
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let processedContent = content;
    let linkMatches = [];
    let linkMatch;

    // Collect all link matches
    while ((linkMatch = linkRegex.exec(content)) !== null) {
        linkMatches.push({
            fullMatch: linkMatch[0],
            text: linkMatch[1],
            url: linkMatch[2],
            index: linkMatch.index
        });
    }

    // Replace links with placeholders
    linkMatches.forEach((match, index) => {
        processedContent = processedContent.replace(match.fullMatch, `__LINK_${index}__`);
    });

    // Handle bold text
    const boldRegex = /\*\*(.*?)\*\*/g;
    let boldMatches = [];
    let boldMatch;

    // Collect all bold matches
    while ((boldMatch = boldRegex.exec(processedContent)) !== null) {
        boldMatches.push({
            fullMatch: boldMatch[0],
            text: boldMatch[1],
            index: boldMatch.index
        });
    }

    // Replace bold text with placeholders
    boldMatches.forEach((match, index) => {
        processedContent = processedContent.replace(match.fullMatch, `__BOLD_${index}__`);
    });

    // Split the content and replace placeholders
    const parts = processedContent.split(/(__LINK_\d+__|__BOLD_\d+__)/);

    return parts.map((part, index) => {
        if (part.startsWith('__LINK_')) {
            const linkIndex = parseInt(part.match(/\d+/)[0]);
            const linkData = linkMatches[linkIndex];
            return (
                <a
                    key={`link-${index}`}
                    href={linkData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                >
                    {linkData.text}
                </a>
            );
        } else if (part.startsWith('__BOLD_')) {
            const boldIndex = parseInt(part.match(/\d+/)[0]);
            const boldData = boldMatches[boldIndex];
            return (
                <strong key={`bold-${index}`}>
                    {boldData.text}
                </strong>
            );
        } else {
            return part;
        }
    });
};

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
                <div className="text-sm whitespace-pre-wrap">
                    {renderMessageContent(message)}
                </div>
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

                {/* Rating component for bot messages - exclude welcome message */}
                {!isUser && onRate && messageId !== 'welcome' && (
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