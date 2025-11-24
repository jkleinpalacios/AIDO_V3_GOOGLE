
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PRIVATE_NAV_LINKS } from '../constants';
import { IconMap } from './Icons';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
    isCollapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false }) => {
    const location = useLocation();
    const { user, signOut } = useAuth();
    const { LogoIcon, PlusCircleIcon, ArrowLeftOnRectangleIcon } = IconMap;

    const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuario';
    const email = user?.email || '';

    // Simulation of recent chats history
    const recentConversations = [
        { id: 1, title: 'Ley Karin - Resumen', date: 'Hoy' },
        { id: 2, title: 'Subsidio DS49 Requisitos', date: 'Ayer' },
        { id: 3, title: 'Boletín Minero Atacama', date: 'Hace 2 días' },
    ];

    return (
        <div className={`hidden md:flex flex-col bg-[#F9FAFB] border-r border-slate-200 h-full flex-shrink-0 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-[72px]' : 'w-[260px]'}`}>
            {/* Logo Header */}
            <div className={`px-5 py-5 flex items-center ${isCollapsed ? 'justify-center' : 'gap-2'}`}>
                 <Link to="/dashboard" className="flex items-center gap-2">
                     {LogoIcon && <LogoIcon className="h-6 w-6 text-blue-600 flex-shrink-0" />}
                     {!isCollapsed && (
                        <span className="text-lg font-bold text-slate-900 tracking-tight whitespace-nowrap opacity-100 transition-opacity duration-200">AIDO</span>
                     )}
                 </Link>
            </div>

            {/* New Chat Button */}
            <div className="px-3 mb-4">
                <Link 
                    to="/dashboard" 
                    className={`flex items-center ${isCollapsed ? 'justify-center px-0' : 'px-3 gap-2'} py-2.5 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 rounded-lg shadow-sm transition-all group`}
                    title={isCollapsed ? "Nuevo Chat" : ""}
                    onClick={() => window.dispatchEvent(new Event('new-chat'))}
                >
                    {PlusCircleIcon && <PlusCircleIcon className="h-5 w-5 text-blue-600 flex-shrink-0" />}
                    {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">Nuevo Chat</span>}
                </Link>
            </div>

            {/* Tools Section */}
            <nav className="px-3 space-y-0.5">
                {!isCollapsed && <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 whitespace-nowrap">Herramientas</p>}
                {PRIVATE_NAV_LINKS.map((item) => {
                    const IconComponent = IconMap[item.icon];
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            title={isCollapsed ? item.name : ""}
                            className={`flex items-center ${isCollapsed ? 'justify-center px-0' : 'px-3'} py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                isActive
                                    ? 'bg-slate-100 text-slate-900'
                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                            }`}
                        >
                            {IconComponent && (
                                <IconComponent 
                                    className={`w-4 h-4 transition-colors flex-shrink-0 ${!isCollapsed ? 'mr-3' : ''} ${
                                        isActive ? 'text-blue-600' : 'text-slate-400'
                                    }`} 
                                />
                            )}
                            {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Recent Conversations */}
            <div className={`flex-1 overflow-y-auto mt-6 px-3 ${isCollapsed ? 'hidden' : 'block'}`}>
                 <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 whitespace-nowrap">Historial</p>
                 <div className="space-y-0.5">
                    {recentConversations.map((chat) => (
                        <button
                            key={chat.id}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors group text-left"
                        >
                            <span className="text-sm truncate flex-1">{chat.title}</span>
                        </button>
                    ))}
                 </div>
            </div>

            {isCollapsed && <div className="flex-1"></div>}

            {/* User Profile Footer */}
            <div className="p-3 border-t border-slate-200">
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all group`}>
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xs flex-shrink-0">
                        {displayName.substring(0, 2).toUpperCase()}
                    </div>
                    {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">{displayName}</p>
                            <p className="text-xs text-slate-500 truncate">{email}</p>
                        </div>
                    )}
                     {!isCollapsed && (
                        <button onClick={signOut} className="text-slate-400 hover:text-red-500" title="Cerrar sesión">
                            {ArrowLeftOnRectangleIcon && <ArrowLeftOnRectangleIcon className="h-5 w-5" />}
                        </button>
                    )}
                </div>
                 {isCollapsed && (
                    <button onClick={signOut} className="w-full flex justify-center mt-2 text-slate-400 hover:text-red-500" title="Cerrar sesión">
                        {ArrowLeftOnRectangleIcon && <ArrowLeftOnRectangleIcon className="h-5 w-5" />}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
