import React, { useState, useRef, useEffect } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import clsx from 'clsx';

const searchableItems = ["Shirt", "Shoes", "Jacket", "Jeans", "Sweater"];

function SearchBar({ isVisible, onClose }) {
  const [searchText, setSearchText] = useState("");
  const searchBarRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => { if (isVisible) inputRef.current?.focus(); }, [isVisible]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBarRef.current && !searchBarRef.current.contains(e.target)) onClose();
    };
    if (isVisible) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isVisible, onClose]);
  
  const handleSuggestionClick = (item) => {
    navigate(`/search/${item}`);
    onClose();
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchText.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchText.trim())}`);
      onClose();
    }
  };

  return (
    <div className="absolute inset-0 bg-white z-50 flex items-center justify-center shadow-md">
      <div className="max-w-4xl w-full px-4 flex items-center gap-4">
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Search for products, categories..."
          className="flex-1 border-none outline-none text-xl bg-transparent text-text font-light"
        />
        {searchText && (
          <button onClick={() => setSearchText("")} className="text-gray-400 hover:text-text transition-colors text-sm uppercase tracking-widest mr-4">
            Clear
          </button>
        )}
        <button onClick={onClose} className="text-gray-400 hover:text-text transition-colors">
          <XMarkIcon className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
}
export default SearchBar;