
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PRIVATE_NAV_LINKS } from '../constants';
import { IconMap } from './Icons';

interface SidebarProps {
    isCollapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false }) => {
    const location = useLocation();
    const { LogoIcon, PlusCircleIcon, ChatBubbleBottomCenterTextIcon } = IconMap;

    // Simulation of recent chats history
    const recentConversations = [
        { id: 1, title: 'Ley Karin - Resumen', date: 'Hoy' },
        { id: 2, title: 'Subsidio DS49 Requisitos', date: 'Ayer' },
        { id: 3, title: 'Boletín Minero Atacama', date: 'Hace 2 días' },
        { id: 4, title: 'Derechos de Agua DGA', date: 'Hace 3 días' },
        { id: 5, title: 'Modificaciones Ley de Pesca', date: 'Semana pasada' },
        { id: 6, title: 'Circular SII IVA Servicios', date: 'Semana pasada' },
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
                    onClick={() => window.dispatchEvent(new Event('new-chat'))} // Simple event to clear chat in DashboardPage
                >
                    {PlusCircleIcon && <PlusCircleIcon className="h-5 w-5 text-blue-600 flex-shrink-0" />}
                    {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">Nuevo Chat</span>}
                </Link>
            </div>

            {/* Tools Section (Sumarios & Legislación) */}
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

            {/* Recent Conversations (History) - Replaces "Mis Consultas" */}
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

            {/* Spacer to push user profile down if collapsed and history is hidden */}
            {isCollapsed && <div className="flex-1"></div>}

            {/* User Profile Footer */}
            <div className="p-3 border-t border-slate-200">
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all cursor-pointer group`}>
                    <div className="h-8 w-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold text-xs flex-shrink-0">
                        GB
                    </div>
                    {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">Gabriel Boric</p>
                            <p className="text-xs text-slate-500 truncate">Plan Pro</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
