export function ToolButton({ 
    icon: Icon, 
    label, 
    selectedToolButton, 
    onClick 
}: { 
    icon: React.ElementType; 
    label: string; 
    selectedToolButton: string; 
    onClick: () => void; 
}) {
    return (
      <div className="flex items-center justify-center flex-col">
        <button 
          className="h-8 w-8 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center group"
          onClick={onClick} // ✅ Correctly handle onClick
        >
            {selectedToolButton === label ? (
                <Icon className="h-4 w-4 text-indigo-600" />
            ) : (
                <Icon className="h-4 w-4 text-white group-hover:text-indigo-600 transition-colors" />
            )}
        </button>
        <span className="text-xs text-gray-600 mt-2">{label}</span>
      </div>
    );
}