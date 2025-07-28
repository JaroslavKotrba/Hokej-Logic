const hokejLogo = new URL('../assets/hokej-white.png', import.meta.url).href;

const TypingIndicator = () => {
    return (
        <div className="flex gap-3 mb-4 animate-fade-in">
            <div className="flex-shrink-0 w-8 h-8 bg-[#437ffe] rounded-full flex items-center justify-center overflow-hidden">
                <img
                    src={hokejLogo}
                    alt="Hokej-Logic Logo"
                    className="w-5 h-5 object-contain"
                />
            </div>

            <div className="inline-flex items-center gap-1 px-3 py-2 mr-auto ml-2 mt-2 mb-2 bg-[#f5f5f5] rounded-xl w-fit">
                <div className="w-2 h-2 bg-[#888] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#888] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-[#888] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
        </div>
    );
};

export default TypingIndicator; 