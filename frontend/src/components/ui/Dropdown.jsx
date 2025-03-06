import { useState } from "react";

const DropdownMenu = ({ title, items, onSelect, isOpen, onToggle }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  // Handle item selection
  const handleItemClick = (item) => {
    setSelectedItem(item.label);
    onSelect(item); 
    onToggle(false); 
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => onToggle(!isOpen)} 
        className="flex items-center justify-between px-2 py-2 text-sm cursor-pointer font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {selectedItem || title}
        <svg
          className={`w-5 h-5 ml-2 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(item)}
                className="block w-full px-4 py-2 text-sm text-gray-700 text-left hover:bg-gray-100"
                role="menuitem"
                tabIndex="-1"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
