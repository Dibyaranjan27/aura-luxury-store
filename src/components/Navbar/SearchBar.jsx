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

  return (
    <div className="flex items-center">
      <button onClick={onClose}><MagnifyingGlassIcon className="h-6 w-6" /></button>
      <div
        ref={searchBarRef}
        className={clsx(
          "absolute top-1/2 -translate-y-1/2 right-0 flex items-center gap-3 px-4 py-2 bg-white shadow-lg transition-all duration-300 origin-right z-50",
          { 'scale-x-100 opacity-100': isVisible, 'scale-x-0 opacity-0': !isVisible }
        )}
      >
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search..."
          className="w-[30vw] min-w-[200px] border-none outline-none text-base bg-transparent text-gray-800"
        />
        <button onClick={() => setSearchText("")} className="text-gray-600 text-sm">Clear</button>
        <button onClick={onClose}><XMarkIcon className="h-5 w-5 text-gray-600" /></button>
        {/* Suggestions would be rendered here based on searchText */}
      </div>
    </div>
  );
}
export default SearchBar;