const hokejLogo = new URL('../assets/hokej-white.png', import.meta.url).href;

const ChatHeader = () => {
    return (
        <div className="bg-[#437ffe] text-white p-3">
            <div className="flex items-center gap-3">
                <img
                    src={hokejLogo}
                    alt="Hokej-Logic Logo"
                    className="w-[40px] h-[40px] object-contain"
                />

                <h1 className="text-lg font-semibold font-['Baskerville'] italic flex-grow">
                    Hokejový Chatbot
                </h1>

                <div className="w-3 h-3 bg-[#2ecc71] rounded-full relative">
                    <div className="absolute -top-0.5 -left-0.5 w-4 h-4 bg-white rounded-full border border-white"></div>
                    <div className="absolute inset-0 bg-[#2ecc71] rounded-full"></div>
                    <div className="absolute inset-0 bg-[#2ecc71] rounded-full" style={{ animation: 'custom-pulse 2s infinite' }}></div>
                    <div className="absolute inset-0 bg-[#2ecc71] rounded-full" style={{ animation: 'custom-pulse 2s infinite 1s' }}></div>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader; 