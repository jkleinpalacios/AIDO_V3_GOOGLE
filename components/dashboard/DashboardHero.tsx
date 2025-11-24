
import React from 'react';
import { Link } from 'react-router-dom';
import { IconMap } from '../Icons';

interface DashboardHeroProps {
    userName: string;
    date: string;
    aiSummary: {
        text: string;
        chips: { text: string; link: string }[];
    };
    stats: {
        activityLevel: string;
        totalPublications: number;
    };
}

const DashboardHero: React.FC<DashboardHeroProps> = ({ userName, date, aiSummary, stats }) => {
    const { SunIcon, SparklesIcon, ChartBarIcon } = IconMap;

    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-indigo-500 opacity-10 blur-3xl"></div>

            <div className="relative z-10 p-8 md:p-10">
                <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
                    {/* Left: Greeting & Stats */}
                    <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-3 text-blue-300 mb-2">
                            {SunIcon && <SunIcon className="h-6 w-6" />}
                            <span className="text-sm font-medium uppercase tracking-wider">{date}</span>
                        </div>
                        
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                                Buenos días, <span className="text-blue-400">{userName.split(' ')[0]}</span>.
                            </h1>
                            <p className="mt-2 text-slate-300 text-lg">
                                Hoy la actividad del Diario Oficial es <strong className="text-white">{stats.activityLevel}</strong> con <strong className="text-white">{stats.totalPublications}</strong> documentos.
                            </p>
                        </div>

                        <div className="flex gap-4">
                             <Link to="/dashboard/resumen-diario" className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-blue-900/20">
                                Ver Resumen Diario
                            </Link>
                        </div>
                    </div>

                    {/* Right: AI Summary Card */}
                    <div className="lg:w-1/2">
                        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/15 transition-colors">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                    {SparklesIcon && <SparklesIcon className="h-6 w-6 text-blue-300" />}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Análisis Rápido IA</h3>
                                    <p className="text-slate-200 leading-relaxed text-sm">
                                        {aiSummary.text}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex flex-wrap gap-2 pl-11">
                                {aiSummary.chips.map(chip => (
                                    <Link 
                                        key={chip.text} 
                                        to={chip.link} 
                                        className="px-3 py-1 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-full text-xs font-medium text-blue-200 transition-colors"
                                    >
                                        {chip.text}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHero;
