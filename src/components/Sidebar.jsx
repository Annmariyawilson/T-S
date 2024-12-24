import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaLeaf, FaBook, FaQuestionCircle, FaChartBar, FaCog } from 'react-icons/fa';
import { FaBookBookmark } from 'react-icons/fa6';

const Sidebar = () => {
    return (
        <div className="w-64 bg-white fixed h-full">
            <div className="p-4 text-2xl font-bold flex items-center">
                <FaLeaf className="w-6 h-6 mr-2" />Quyl
            </div>
            <nav className="mt-5">
                <ul className="space-y-2">
                    <li>
                        <Link to="/" className="flex items-center p-4 hover:bg-gray-100 transition cursor-pointer">
                            <FaClock className="w-5 h-5 mr-3 text-gray-600" />Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/students" className="flex items-center p-4 hover:bg-gray-100 transition cursor-pointer">
                            <FaBook className="w-5 h-5 mr-3 text-gray-600" />Students
                        </Link>
                    </li>
                    <li>
                        <Link to="/chapter" className="flex items-center p-4 hover:bg-gray-100 transition cursor-pointer">
                            <FaBookBookmark className="w-5 h-5 mr-3 text-gray-600" />Chapter
                        </Link>
                    </li>
                    <li>
                        <Link to="/help" className="flex items-center p-4 hover:bg-gray-100 transition cursor-pointer">
                            <FaQuestionCircle className="w-5 h-5 mr-3 text-gray-600" />Help
                        </Link>
                    </li>
                    <li>
                        <Link to="/reports" className="flex items-center p-4 hover:bg-gray-100 transition cursor-pointer">
                            <FaChartBar className="w-5 h-5 mr-3 text-gray-600" />Reports
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings" className="flex items-center p-4 hover:bg-gray-100 transition cursor-pointer">
                            <FaCog className="w-5 h-5 mr-3 text-gray-600" />Settings
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
