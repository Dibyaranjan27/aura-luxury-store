import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import clsx from 'clsx';

function SearchBar({ isVisible, onClose }) {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => { if (isVisible) inputRef.current?.focus(); }, [isVisible]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchText.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchText.trim())}`);
      onClose();
    }
  };

  return (
    <div className="absolute top-full left-0 w-full bg-white border-t border-gray-100 z-40 shadow-sm transition-all duration-300 origin-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
        <Search className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
        <input
          ref={inputRef}
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Search for products..."
          className="flex-1 border-none outline-none text-base bg-transparent text-text font-light"
        />
        {searchText && (
          <button onClick={() => setSearchText("")} className="text-gray-400 hover:text-text transition-colors text-xs uppercase tracking-widest mr-4">
            Clear
          </button>
        )}
        <button onClick={onClose} className="text-gray-400 hover:text-text transition-colors">
          <X className="h-6 w-6" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
export default SearchBar;