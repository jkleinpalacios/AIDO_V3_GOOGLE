
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { IconMap } from './Icons';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { LogoIcon, MenuIcon, XMarkIcon } = IconMap;

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();

        if (isMenuOpen) {
            setIsMenuOpen(false);
        }

        const targetId = href.substring(1);

        if (location.pathname === '/') {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate('/', { state: { scrollTo: targetId } });
        }
    };


    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-slate-800">
                            {LogoIcon && <LogoIcon className="h-8 w-8 text-blue-600" />}
                            <span>AIDO</span>
                        </Link>
                    </div>
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="font-medium text-slate-600 hover:text-blue-600 transition-colors duration-200"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                        <Link to="/login" className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors duration-200">
                            Iniciar Sesión
                        </Link>
                        <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors duration-200">
                            Crear Cuenta
                        </Link>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 hover:text-blue-600">
                            {isMenuOpen ? (XMarkIcon && <XMarkIcon className="h-6 w-6" />) : (MenuIcon && <MenuIcon className="h-6 w-6" />)}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-slate-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition-colors duration-200"
                            >
                                {link.name}
                            </a>
                        ))}
                         <div className="p-4 mt-2 border-t border-slate-200 space-y-3">
                             <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full text-center px-4 py-2 text-blue-600 border border-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors duration-200">
                                Iniciar Sesión
                            </Link>
                             <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors duration-200">
                                Crear Cuenta
                            </Link>
                         </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;