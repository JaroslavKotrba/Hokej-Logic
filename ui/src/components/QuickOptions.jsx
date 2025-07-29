import { useState } from 'react';

const QuickOptions = ({ onOptionClick }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const quickOptions = [
        {
            text: "Kde najdu nejlepší střelce? 🏒",
            query: "Kde najdu nejlepší střelce v extralize?"
        },
        {
            text: "Co se skrývá pod zkratkou TOI..? ⏱️",
            query: "Co znamená zkratka TOI v hokeji?"
        },
        {
            text: "Jak filtrovat hráče v tabulce? 🔍",
            query: "Jak mohu filtrovat hráče v tabulce podle různých kritérií?"
        }
    ];

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center py-2 px-3 border-t border-gray-200 bg-[#f9f9f9] text-sm text-gray-600 -mx-3 px-6">
                <span>Časté dotazy</span>
                <button
                    onClick={toggleCollapse}
                    className={`text-[#437ffe] p-1 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                </button>
            </div>
            <div className={`flex flex-wrap gap-2 transition-all duration-300 overflow-hidden ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[200px] opacity-100'
                }`} style={{
                    padding: isCollapsed ? '0' : '12px',
                    margin: isCollapsed ? '0' : '12px'
                }}>
                {quickOptions.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onOptionClick(option.query)}
                        className="bg-[#f5f5f5] border border-gray-300 rounded-2xl px-3 py-2 sm:px-4 cursor-pointer transition-all duration-200 text-xs sm:text-sm hover:bg-[#e3f2fd] hover:border-[#437ffe] hover:text-[#437ffe] active:scale-95"
                    >
                        {option.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickOptions; 