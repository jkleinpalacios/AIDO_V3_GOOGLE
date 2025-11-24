
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconMap } from './Icons';

const PrivateHeader: React.FC = () => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    
    const UserCircleIcon = IconMap['UserCircleIcon'];
    const Cog6ToothIcon = IconMap['Cog6ToothIcon'];
    const ArrowLeftOnRectangleIcon = IconMap['ArrowLeftOnRectangleIcon'];
    const ChevronDownIcon = IconMap['ChevronDownIcon'];

    return (
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-slate-200">
            <div>
                 <h2 className="text-xl font-semibold text-slate-800">Panel de Control</h2>
            </div>

            <div className="flex items-center space-x-4">
                <div className="relative">
                    <button 
                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                       {UserCircleIcon && <UserCircleIcon className="h-8 w-8 text-slate-500" />}
                       <span className="hidden sm:inline font-medium text-slate-700">Gabriel Boric Font</span>
                       {ChevronDownIcon && <ChevronDownIcon className="h-4 w-4 text-slate-500" />}
                    </button>
                    {isProfileMenuOpen && (
                        <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl z-20 border border-slate-200">
                            <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600">
                                {UserCircleIcon && <UserCircleIcon className="w-5 h-5 mr-2" />}
                                Perfil
                            </Link>
                            <Link to="/settings" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600">
                                {Cog6ToothIcon && <Cog6ToothIcon className="w-5 h-5 mr-2" />}
                                Configuración
                            </Link>
                            <Link to="/" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600">
                                {ArrowLeftOnRectangleIcon && <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />}
                                Cerrar sesión
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default PrivateHeader;