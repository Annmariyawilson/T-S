import React, { useState } from 'react';
import { FaBell, FaComment, FaQuestionCircle, FaSearch, FaUserCircle, FaEnvelope } from 'react-icons/fa';

function Navbar({ onSearch }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); 
  };

  return (
    <div className="bg-gray-100 shadow-lg px-6 py-3 flex justify-between items-center ml-64">
      <div className="flex items-center gap-5 w-full">
        <div className="relative w-full md:w-[600px]">
          <span className="absolute inset-y-0 left-3 flex items-center">
            <FaSearch className="text-black" />
          </span>
          <input
            type="text"
            placeholder="Search by name or course"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-10 py-2 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="relative cursor-pointer">
          <FaBell className="text-black w-6 h-6" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </div>
        <FaComment className="text-black w-6 h-6 cursor-pointer" />
        <FaQuestionCircle className="text-black w-6 h-6 cursor-pointer" />
        <FaEnvelope className="text-black w-6 h-6 cursor-pointer" />

        <div className="flex items-center gap-2">
          <div className="relative group">
            <button
              className="flex items-center text-black focus:outline-none"
              onClick={toggleDropdown}
            >
              <FaUserCircle className="text-black w-8 h-8" />
              <span className="ml-2 text-sm text-black font-bold">User</span>
            </button>
            <div
              className={`absolute right-0 top-12 bg-white rounded-lg shadow-md w-40 ${isDropdownOpen ? 'block' : 'hidden'} group-hover:block z-20`}
            >
              <ul className="py-2 text-sm text-gray-700">
                <li className="hover:bg-gray-100 px-4 py-2" onClick={closeDropdown}>
                  <a href="#">Profile</a>
                </li>
                <li className="hover:bg-gray-100 px-4 py-2" onClick={closeDropdown}>
                  <a href="#">Settings</a>
                </li>
                <li className="hover:bg-gray-100 px-4 py-2" onClick={closeDropdown}>
                  <a href="#">Log Out</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
