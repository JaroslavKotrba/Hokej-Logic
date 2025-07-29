import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const MessageRating = ({ messageId, onRate }) => {
    const [rating, setRating] = useState(null);

    const handleRate = (value) => {
        if (rating === value) {
            // If clicking the same rating, remove it
            setRating(null);
            onRate(messageId, null);
        } else {
            // Set new rating
            setRating(value);
            onRate(messageId, value);
        }
    };

    return (
        <div className="flex items-center gap-0.5 sm:gap-1 mt-2">
            <button
                onClick={() => handleRate('positive')}
                className={`p-1 transition-colors duration-200 ${rating === 'positive'
                    ? 'text-green-600'
                    : 'text-gray-400 hover:text-green-600'
                    }`}
                title="Označit jako užitečné"
            >
                <ThumbsUp className="w-4 h-4" />
            </button>

            <button
                onClick={() => handleRate('negative')}
                className={`p-1 transition-colors duration-200 ${rating === 'negative'
                    ? 'text-red-600'
                    : 'text-gray-400 hover:text-red-600'
                    }`}
                title="Označit jako neužitečné"
            >
                <ThumbsDown className="w-4 h-4" />
            </button>
        </div>
    );
};

export default MessageRating; 