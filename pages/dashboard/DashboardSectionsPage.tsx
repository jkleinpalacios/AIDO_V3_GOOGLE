
import React from 'react';
import { Link } from 'react-router-dom';
import { SECTIONS } from '../../constants';
import { IconMap } from '../../components/Icons';

// Helper para estilos por sección
const getSectionStyle = (id: string) => {
    switch (id) {
        case 'normas-generales':
            return { color: 'blue', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100', bar: 'bg-blue-600', iconBg: 'bg-blue-600 text-white' };
        case 'normas-particulares':
            return { color: 'indigo', bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-100', bar: 'bg-indigo-500', iconBg: 'bg-indigo-100 text-indigo-600' };
        case 'empresas-cooperativas':
            return { color: 'emerald', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', bar: 'bg-emerald-500', iconBg: 'bg-emerald-100 text-emerald-600' };
        case 'marcas-patentes':
            return { color: 'cyan', bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-100', bar: 'bg-cyan-500', iconBg: 'bg-cyan-100 text-cyan-600' };
        case 'judiciales':
            return { color: 'slate', bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', bar: 'bg-slate-500', iconBg: 'bg-slate-200 text-slate-600' };
        case 'boletin-mineria':
            return { color: 'orange', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-100', bar: 'bg-orange-500', iconBg: 'bg-orange-100 text-orange-600' };
        default:
            return { color: 'slate', bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', bar: 'bg-slate-400', iconBg: 'bg-slate-100 text-slate-500' };
    }
};

// Helper para contenido descriptivo "Qué incluye"
const getSectionIncludes = (id: string) => {
    switch (id) {
        case 'normas-generales': return ['Leyes y Decretos Supremos', 'Resoluciones de alcance nacional', 'Tratados Internacionales'];
        case 'normas-particulares': return ['Nombramientos y renuncias', 'Concesiones específicas', 'Decretos de interés particular'];
        case 'empresas-cooperativas': return ['Constitución de sociedades', 'Modificaciones de estatutos', 'Disoluciones y saneamientos'];
        case 'judiciales': return ['Quiebras y notificaciones', 'Posesiones efectivas', 'Extravío de documentos', 'Muertes presuntas'];
        case 'marcas-patentes': return ['Solicitudes de marcas nuevas', 'Renovaciones de registros', 'Patentes de invención'];
        case 'boletin-mineria': return ['Pedimentos y manifestaciones', 'Sentencias de exploración', 'Remates de concesiones'];
        case 'avisos-destacados': return ['Licitaciones públicas', 'Citaciones a accionistas', 'Balances financieros'];
        default: return [];
    }
};

const DashboardSectionsPage: React.FC = () => {
    const { ArrowRightIcon, DocumentTextIcon, ChartBarIcon } = IconMap;

    // Separamos las secciones por jerarquía
    const generalNorms = SECTIONS.find(s => s.id === 'normas-generales');
    const transactional = SECTIONS.filter(s => ['empresas-cooperativas', 'judiciales', 'marcas-patentes'].includes(s.id));
    const specialized = SECTIONS.filter(s => !['normas-generales', 'empresas-cooperativas', 'judiciales', 'marcas-patentes'].includes(s.id));

    // Calculamos el máximo para las barras de volumen (simulado con docCount)
    const maxDocs = Math.max(...SECTIONS.map(s => s.docCount));

    return (
        <div className="space-y-10 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Estructura Oficial</h1>
                    <p className="mt-2 text-slate-600 max-w-2xl">
                        Navega por la estructura formal del Diario Oficial de Chile. A diferencia de los "Temas IA", aquí encontrarás los documentos clasificados rigurosamente según su cuerpo legal de origen.
                    </p>
                </div>
            </div>

            {/* 1. NORMAS GENERALES (Hero Section) */}
            {generalNorms && (
                <section>
                    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Estratégico y Normativo</h2>
                    <Link 
                        to={`/dashboard/busqueda?section=${generalNorms.id}`}
                        className="group relative block bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden hover:shadow-md hover:border-blue-300 transition-all"
                    >
                        <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
                        <div className="p-8 md:flex items-start gap-8">
                            <div className="flex-shrink-0 mb-6 md:mb-0">
                                <div className="h-16 w-16 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                                    {IconMap[generalNorms.icon] && React.createElement(IconMap[generalNorms.icon], { className: "h-8 w-8" })}
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{generalNorms.name}</h3>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {generalNorms.docCount} documentos hoy
                                    </span>
                                </div>
                                <p className="mt-2 text-slate-600 text-lg leading-relaxed">
                                    {generalNorms.summary} Aquí se publican las Leyes, Decretos con Fuerza de Ley y los actos administrativos de mayor relevancia nacional.
                                </p>
                                
                                <div className="mt-6 flex flex-wrap gap-3">
                                    {getSectionIncludes(generalNorms.id).map((item, i) => (
                                        <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-700 font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="hidden md:flex self-center text-slate-300 group-hover:text-blue-600 transition-colors">
                                {ArrowRightIcon && <ArrowRightIcon className="h-8 w-8" />}
                            </div>
                        </div>
                    </Link>
                </section>
            )}

            {/* 2. TRANSACTIONAL SECTIONS (High Volume Grid) */}
            <section>
                <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Registros Masivos y Judiciales</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {transactional.map(section => {
                        const style = getSectionStyle(section.id);
                        const percentage = (section.docCount / maxDocs) * 100;
                        
                        return (
                            <Link 
                                key={section.id} 
                                to={`/dashboard/busqueda?section=${section.id}`}
                                className={`group bg-white p-6 rounded-xl border ${style.border} shadow-sm hover:shadow-md transition-all flex flex-col`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-lg ${style.iconBg}`}>
                                        {IconMap[section.icon] && React.createElement(IconMap[section.icon], { className: "h-6 w-6" })}
                                    </div>
                                    <div className="text-right">
                                        <span className={`block text-2xl font-bold ${style.text}`}>{section.docCount}</span>
                                        <span className="text-xs text-slate-400">publicaciones</span>
                                    </div>
                                </div>
                                
                                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">{section.name}</h3>
                                <p className="text-sm text-slate-600 mb-6 line-clamp-2 flex-grow">{section.summary}</p>

                                {/* Volume Bar */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-slate-500 font-medium">Volumen diario</span>
                                        <span className="text-slate-400">{percentage.toFixed(0)}% rel.</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                                        <div className={`h-1.5 rounded-full ${style.bar}`} style={{ width: `${percentage}%` }}></div>
                                    </div>
                                </div>

                                {/* Includes List */}
                                <ul className="space-y-2 border-t border-slate-100 pt-4 mt-auto">
                                    {getSectionIncludes(section.id).slice(0, 3).map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
                                            <span className={`mt-1 w-1 h-1 rounded-full flex-shrink-0 ${style.bar}`}></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* 3. SPECIALIZED SECTIONS (Niche Grid) */}
            <section>
                <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Boletines Especializados y Avisos</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {specialized.map(section => {
                        const style = getSectionStyle(section.id);
                        const isMining = section.id === 'boletin-mineria';

                        return (
                             <Link 
                                key={section.id} 
                                to={isMining ? '/dashboard/boletin-minero' : `/dashboard/busqueda?section=${section.id}`}
                                className={`group flex items-stretch bg-white rounded-xl border ${style.border} shadow-sm hover:shadow-md transition-all overflow-hidden`}
                            >
                                <div className={`w-1.5 ${style.bar}`}></div>
                                <div className="p-5 flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`p-2 rounded-lg ${style.iconBg}`}>
                                             {IconMap[section.icon] && React.createElement(IconMap[section.icon], { className: "h-5 w-5" })}
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-700">{section.name}</h3>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">{section.summary}</p>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        {DocumentTextIcon && <DocumentTextIcon className="h-3.5 w-3.5" />}
                                        <span className="font-medium">{section.docCount} documentos</span>
                                    </div>
                                </div>
                                {isMining && (
                                    <div className="px-4 flex items-center justify-center bg-orange-50 border-l border-orange-100">
                                        <span className="text-xs font-bold text-orange-700 [writing-mode:vertical-lr] rotate-180">DASHBOARD</span>
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </section>

             <div className="mt-8 text-center">
                <p className="text-xs text-slate-400">
                    Los volúmenes de documentos son calculados diariamente por AIDO a partir de la ingesta oficial.
                </p>
            </div>
        </div>
    );
};

export default DashboardSectionsPage;
