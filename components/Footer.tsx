
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconMap } from './Icons';

const Footer: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { LogoIcon } = IconMap;

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
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
        <footer className="border-t border-slate-200 bg-[url('/textures/paper_texture_light.png')] bg-repeat bg-top">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="xl:grid xl:grid-cols-4 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-slate-800">
                            {LogoIcon && <LogoIcon className="h-8 w-8 text-blue-600" />}
                            <span>AIDO</span>
                        </Link>
                        <p className="text-slate-500 text-sm">
                            Información oficial del Estado, explicada con inteligencia artificial.
                        </p>
                    </div>
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8 xl:mt-0 xl:col-span-3">
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase">Plataforma</h3>
                            <ul className="mt-4 space-y-2">
                                <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="text-base text-slate-500 hover:text-blue-600">¿Qué es AIDO?</a></li>
                                <li><a href="#how-it-works" onClick={(e) => handleNavClick(e, '#how-it-works')} className="text-base text-slate-500 hover:text-blue-600">Cómo funciona</a></li>
                                <li><a href="#faq" onClick={(e) => handleNavClick(e, '#faq')} className="text-base text-slate-500 hover:text-blue-600">Preguntas Frecuentes</a></li>
                            </ul>
                        </div>
                        <div className="mt-0">
                            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase">Soporte</h3>
                            <ul className="mt-4 space-y-2">
                                <li><a href="#" className="text-base text-slate-500 hover:text-blue-600">Contacto</a></li>
                                <li><a href="#" className="text-base text-slate-500 hover:text-blue-600">Centro de ayuda</a></li>
                            </ul>
                        </div>
                        <div className="mt-0">
                            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase">Legal</h3>
                            <ul className="mt-4 space-y-2">
                                <li><a href="#" className="text-base text-slate-500 hover:text-blue-600">Política de Privacidad</a></li>
                                <li><a href="#" className="text-base text-slate-500 hover:text-blue-600">Términos de uso</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-slate-200 pt-8">
                     <p className="text-xs text-slate-500 xl:text-center max-w-4xl mx-auto">
                        <strong>Nota legal:</strong> AIDO interpreta información del Diario Oficial de Chile. No es un medio oficial ni reemplaza las comunicaciones legales del Estado.
                    </p>
                    <p className="mt-4 text-sm text-slate-500 xl:text-center">&copy; {new Date().getFullYear()} AIDO. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;