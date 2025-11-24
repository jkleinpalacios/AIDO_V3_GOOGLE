
import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { IconMap } from '../components/Icons';
import { useAuth } from '../context/AuthContext';

const PrivateLayout: React.FC = () => {
    const { session, loading } = useAuth();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const { ChevronLeftIcon, ChevronRightIcon } = IconMap;

    if (loading) {
        return <div className="flex items-center justify-center h-screen text-slate-500">Cargando AIDO...</div>;
    }

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex h-screen bg-white font-sans text-slate-800 overflow-hidden">
            {/* 1. Left Sidebar (Navigation) */}
            <Sidebar isCollapsed={isSidebarCollapsed} />

            {/* 2. Main Content Area (The Stage) */}
            <div className="flex-1 flex flex-col min-w-0 relative bg-white h-full">
                
                {/* Sidebar Toggle Button */}
                <button 
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="absolute top-4 left-4 z-50 p-1.5 bg-white border border-slate-200 rounded-md shadow-sm text-slate-500 hover:text-blue-600 hover:border-blue-300 transition-colors"
                    title={isSidebarCollapsed ? "Expandir menú" : "Contraer menú"}
                >
                    {isSidebarCollapsed ? (
                        ChevronRightIcon && <ChevronRightIcon className="h-4 w-4" />
                    ) : (
                        ChevronLeftIcon && <ChevronLeftIcon className="h-4 w-4" />
                    )}
                </button>

                {/* Main Content: Overflow hidden here so the page can handle scroll */}
                <main className="flex-1 overflow-hidden relative">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default PrivateLayout;
