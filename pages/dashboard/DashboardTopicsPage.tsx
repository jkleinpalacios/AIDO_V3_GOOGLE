
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { EXPLORABLE_TOPICS } from '../../constants';
import { IconMap } from '../../components/Icons';

const DashboardTopicsPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTopics = useMemo(() => {
        if (!searchQuery) {
            return EXPLORABLE_TOPICS;
        }
        return EXPLORABLE_TOPICS.filter(topic =>
            topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            topic.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
            topic.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [searchQuery]);

    // Helper for tag visuals
    const getTagStyle = (tag: string) => {
        switch (tag) {
            case 'MINISTRY': return 'bg-blue-50 text-blue-700 border-blue-100';
            case 'LAW': return 'bg-purple-50 text-purple-700 border-purple-100';
            case 'DECREE': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
            case 'COMPANY': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'AGENCY': return 'bg-cyan-50 text-cyan-700 border-cyan-100';
            case 'MUNICIPALITY': return 'bg-orange-50 text-orange-700 border-orange-100';
            case 'COURT': return 'bg-red-50 text-red-700 border-red-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    // Helper for icon background visuals
    const getTopicVisuals = (slug: string) => {
        // Institutional
        if (['justicia', 'defensa', 'hacienda', 'banco-central', 'laboral'].includes(slug)) {
            return { bg: 'bg-slate-50', text: 'text-slate-600', border: 'hover:border-slate-400' };
        }
        // Productive
        if (['mineria', 'agricultura', 'pesca', 'economia', 'energia', 'empresas-y-cooperativas'].includes(slug)) {
            return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'hover:border-amber-400' };
        }
        // Social / Infra
        if (['vivienda-y-urbanismo', 'salud', 'obras-publicas', 'transportes', 'municipalidades'].includes(slug)) {
            return { bg: 'bg-blue-50', text: 'text-blue-600', border: 'hover:border-blue-400' };
        }
        // Environment
        if (['medio-ambiente'].includes(slug)) {
            return { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'hover:border-emerald-400' };
        }
        // Fallback
        return { bg: 'bg-slate-50', text: 'text-slate-600', border: 'hover:border-blue-300' };
    };


    return (
        <div className="space-y-10 pb-12">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                    Directorio Temático Oficial
                </h1>
                <p className="mt-4 text-lg text-slate-600">
                    Explora la actividad del Estado organizada por sectores estratégicos. AIDO monitorea ministerios, leyes, decretos y organismos para entregarte inteligencia normativa clasificada.
                </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
                <div className="relative group">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <IconMap.SearchIcon className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" aria-hidden="true" />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-full border-slate-200 pl-11 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all hover:border-slate-300"
                        placeholder="Filtrar por tema, entidad o tipo de documento..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery('')}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                        >
                            <IconMap.XMarkIcon className="h-5 w-5" />
                        </button>
                    )}
                </div>
            </div>

            {/* Topics Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {filteredTopics.map((topic) => {
                    const IconComponent = IconMap[topic.icon];
                    const visuals = getTopicVisuals(topic.slug);
                    
                    return (
                         <Link 
                            to={`/dashboard/temas/${topic.slug}`}
                            key={topic.slug} 
                            className={`group bg-white p-6 rounded-xl shadow-sm border border-slate-200 transition-all duration-200 hover:shadow-md ${visuals.border} flex flex-col h-full`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    {IconComponent && (
                                        <div className={`flex-shrink-0 h-12 w-12 ${visuals.bg} rounded-lg flex items-center justify-center ${visuals.text} group-hover:scale-105 transition-transform duration-200`}>
                                            <IconComponent className="h-7 w-7"/>
                                        </div>
                                    )}
                                    <div>
                                        <h2 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-700 transition-colors">{topic.name}</h2>
                                    </div>
                                </div>
                            </div>
                            
                            <p className="text-sm text-slate-600 mb-6 flex-grow line-clamp-3">
                                {topic.summary}
                            </p>

                            {/* Entity Tags */}
                            <div className="mt-auto pt-4 border-t border-slate-100">
                                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Monitoreo de:</p>
                                <div className="flex flex-wrap gap-2">
                                    {topic.tags.slice(0, 4).map(tag => (
                                        <span key={tag} className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getTagStyle(tag)}`}>
                                            {tag}
                                        </span>
                                    ))}
                                    {topic.tags.length > 4 && (
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-50 text-slate-500 border border-slate-100">
                                            +{topic.tags.length - 4}
                                        </span>
                                    )}
                                </div>
                            </div>
                         </Link>
                    );
                })}
            </div>

            {filteredTopics.length === 0 && (
                 <div className="text-center py-16 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                    <div className="mx-auto h-12 w-12 text-slate-300">
                        <IconMap.SearchIcon className="h-full w-full" />
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-slate-900">No se encontraron temas</h3>
                    <p className="mt-1 text-sm text-slate-500">Intenta ajustar tus términos de búsqueda.</p>
                    <div className="mt-6">
                        <button
                            onClick={() => setSearchQuery('')}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Limpiar búsqueda
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardTopicsPage;
