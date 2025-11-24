
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconMap } from '../Icons';

const ActionToolbar: React.FC = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const { SearchIcon, BellIcon, CalendarDaysIcon, BookmarkSquareIcon } = IconMap;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if(query.trim()) {
            navigate(`/dashboard/busqueda?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2 flex flex-col md:flex-row items-center gap-2">
            {/* Global Search */}
            <form onSubmit={handleSearch} className="w-full md:flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {SearchIcon && <SearchIcon className="h-5 w-5 text-slate-400" />}
                </div>
                <input
                    type="search"
                    placeholder="Buscar documentos, leyes o temas..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-transparent focus:bg-white focus:border-blue-300 focus:ring-0 rounded-lg text-sm transition-all"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </form>

            <div className="h-8 w-px bg-slate-200 hidden md:block"></div>

            {/* Quick Actions */}
            <div className="flex w-full md:w-auto gap-2">
                <Link to="/dashboard/resumen-diario" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium transition-colors">
                    {CalendarDaysIcon && <CalendarDaysIcon className="h-5 w-5" />}
                    <span className="hidden sm:inline">Edición de Hoy</span>
                </Link>
                
                <Link to="/dashboard/documentos" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium transition-colors">
                    {BookmarkSquareIcon && <BookmarkSquareIcon className="h-5 w-5" />}
                    <span className="hidden sm:inline">Guardados</span>
                </Link>

                <Link to="/dashboard/alertas" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium transition-colors">
                    {BellIcon && <BellIcon className="h-5 w-5" />}
                    <span className="hidden sm:inline">Alertas</span>
                </Link>
            </div>
        </div>
    );
};

export default ActionToolbar;
