import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { chatAPI } from '../services/api';

const MessageRating = ({ messageId, onRate }) => {
    const [rating, setRating] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleRate = async (value) => {
        if (isLoading) return; // Prevent multiple clicks while loading

        setIsLoading(true);

        try {
            let newRating;
            if (rating === value) {
                // If clicking the same rating, remove it (set to 0)
                newRating = 0;
                setRating(0);
            } else {
                // Set new rating
                newRating = value;
                setRating(value);
            }

            // Send rating to backend
            await chatAPI.rateMessage(messageId, newRating);

            // Notify parent component
            onRate(messageId, newRating);

        } catch (error) {
            console.error('Failed to rate message:', error);
            // Revert the rating state on error
            setRating(rating);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-0.5 sm:gap-1 mt-2">
            <button
                onClick={() => handleRate(1)}
                disabled={isLoading}
                className={`p-1 transition-colors duration-200 ${rating === 1
                        ? 'text-green-600'
                        : 'text-gray-400 hover:text-green-600'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                title="Označit jako užitečné"
            >
                <ThumbsUp className="w-4 h-4" />
            </button>

            <button
                onClick={() => handleRate(-1)}
                disabled={isLoading}
                className={`p-1 transition-colors duration-200 ${rating === -1
                        ? 'text-red-600'
                        : 'text-gray-400 hover:text-red-600'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                title="Označit jako neužitečné"
            >
                <ThumbsDown className="w-4 h-4" />
            </button>
        </div>
    );
};

export default MessageRating; 