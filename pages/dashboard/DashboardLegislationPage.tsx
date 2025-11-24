
import React, { useState } from 'react';
import { IconMap } from '../../components/Icons';

const DashboardLegislationPage: React.FC = () => {
    const { MagnifyingGlassIcon, SparklesIcon } = IconMap;
    const [activeTab, setActiveTab] = useState('Leyes');
    const [query, setQuery] = useState('');

    const tabs = [
        'Leyes',
        'Decretos',
        'Resoluciones',
        'SII',
        'Contraloría',
        'Superintendencias'
    ];

    const getPlaceholder = (tab: string) => {
        switch (tab) {
            case 'Leyes': return 'Ej: Ley 21.643, Ley Karin, Código del Trabajo...';
            case 'Decretos': return 'Ej: Decreto Supremo 49, Reglamento de...';
            case 'Resoluciones': return 'Ej: Resolución Exenta 55, declaratoria de...';
            case 'SII': return 'Ej: Oficio sobre IVA a servicios digitales...';
            case 'Contraloría': return 'Ej: Dictamen sobre horas extra en sector público...';
            default: return 'Buscar normativa...';
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Buscando en ${activeTab}: "${query}". La respuesta se generará en el chat.`);
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-slate-900">Buscador de Normativa</h1>
                <p className="mt-2 text-slate-600">
                    Localiza, interpreta y analiza normativa específica con la ayuda de AIDO.
                </p>
            </div>

            {/* Pestañas estilo BOE AI */}
            <div className="flex justify-center border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar">
                <div className="flex space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => { setActiveTab(tab); setQuery(''); }}
                            className={`pb-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                                activeTab === tab
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Formulario de Búsqueda */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-w-2xl mx-auto">
                <form onSubmit={handleSearch} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            ¿Qué normativa buscas en <span className="text-blue-600">{activeTab}</span>?
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {MagnifyingGlassIcon && <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />}
                            </div>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={getPlaceholder(activeTab)}
                                className="block w-full pl-10 pr-4 py-3 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Filtros Contextuales (Simulados visualmente para simplicidad) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Año (Opcional)</label>
                            <select className="block w-full pl-3 pr-10 py-2 text-sm border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg">
                                <option>Todos</option>
                                <option>2024</option>
                                <option>2023</option>
                                <option>2022</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Estado</label>
                            <select className="block w-full pl-3 pr-10 py-2 text-sm border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg">
                                <option>Vigente</option>
                                <option>Derogada</option>
                                <option>En trámite</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                    >
                        {SparklesIcon && <SparklesIcon className="h-5 w-5" />}
                        Buscar y Analizar
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-slate-100">
                    <p className="text-xs text-center text-slate-400">
                        AIDO buscará en la base oficial y te entregará el análisis normativo directamente en el chat.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardLegislationPage;
