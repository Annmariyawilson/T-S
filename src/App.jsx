import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Studenttable from './components/Studenttable';
import Chapter from './Pages/Chapter';
import Help from './Pages/Help';
import Reports from './Pages/Reports';
import Settings from './Pages/Settings';
import Dashboard from './components/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar onSearch={handleSearch} />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Studenttable searchTerm={searchTerm} />} />
            <Route path="/chapter" element={<Chapter />} />
            <Route path="/help" element={<Help />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
