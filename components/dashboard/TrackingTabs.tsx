
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconMap } from '../Icons';

interface TrackingTabsProps {
    topics: any[];
    entities: any[];
    documents: any[];
}

const TrackingTabs: React.FC<TrackingTabsProps> = ({ topics, entities, documents }) => {
    const [activeTab, setActiveTab] = useState<'topics' | 'entities' | 'docs'>('topics');
    const { TagIcon, BuildingLibraryIcon, DocumentTextIcon, ChevronDownIcon } = IconMap;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px]">
            {/* Tab Headers */}
            <div className="flex border-b border-slate-200">
                <button
                    onClick={() => setActiveTab('topics')}
                    className={`flex-1 py-4 text-sm font-semibold text-center flex items-center justify-center gap-2 border-b-2 transition-colors ${
                        activeTab === 'topics' ? 'border-blue-600 text-blue-600 bg-blue-50/30' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                >
                    {TagIcon && <TagIcon className="h-4 w-4" />}
                    Mis Temas
                </button>
                <button
                    onClick={() => setActiveTab('entities')}
                    className={`flex-1 py-4 text-sm font-semibold text-center flex items-center justify-center gap-2 border-b-2 transition-colors ${
                        activeTab === 'entities' ? 'border-blue-600 text-blue-600 bg-blue-50/30' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                >
                    {BuildingLibraryIcon && <BuildingLibraryIcon className="h-4 w-4" />}
                    Entidades
                </button>
                <button
                    onClick={() => setActiveTab('docs')}
                    className={`flex-1 py-4 text-sm font-semibold text-center flex items-center justify-center gap-2 border-b-2 transition-colors ${
                        activeTab === 'docs' ? 'border-blue-600 text-blue-600 bg-blue-50/30' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                >
                    {DocumentTextIcon && <DocumentTextIcon className="h-4 w-4" />}
                    Recientes
                </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
                {activeTab === 'topics' && (
                    <div className="space-y-4 animate-fadeIn">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-slate-900">Temas que sigues</h3>
                            <Link to="/dashboard/mis-temas" className="text-xs font-semibold text-blue-600 hover:underline">Gestionar</Link>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {topics.map((topic: any) => (
                                <Link to={topic.link} key={topic.name} className="group p-4 border border-slate-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all bg-white">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-slate-800 group-hover:text-blue-700">{topic.name}</h3>
                                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{topic.newDocs} nuevos</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mt-3">
                                        {topic.activeSubtopics.map((sub: string) => (
                                            <span key={sub} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full uppercase tracking-wide">{sub}</span>
                                        ))}
                                    </div>
                                </Link>
                            ))}
                             <Link to="/dashboard/temas" className="flex items-center justify-center p-4 border-2 border-dashed border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-slate-500 hover:text-blue-600 font-medium text-sm">
                                + Explorar nuevos temas
                            </Link>
                        </div>
                    </div>
                )}

                {activeTab === 'entities' && (
                    <div className="space-y-4 animate-fadeIn">
                         <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-slate-900">Entidades en foco hoy</h3>
                            <span className="text-xs text-slate-500">Basado en tu actividad</span>
                        </div>
                        <div className="space-y-3">
                             {entities.map((entity: any) => (
                                <Link key={entity.name} to={entity.link} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-200">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500">
                                             {BuildingLibraryIcon && <BuildingLibraryIcon className="h-5 w-5" />}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-800 text-sm">{entity.name}</p>
                                            <p className="text-xs text-slate-500">{entity.description}</p>
                                        </div>
                                    </div>
                                    {ChevronDownIcon && <ChevronDownIcon className="h-4 w-4 text-slate-400 -rotate-90" />}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'docs' && (
                    <div className="space-y-4 animate-fadeIn">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-slate-900">Documentos Recientes</h3>
                            <Link to="/dashboard/documentos" className="text-xs font-semibold text-blue-600 hover:underline">Ver todos</Link>
                        </div>
                        <div className="space-y-4">
                            {documents.map((doc: any) => (
                                <div key={doc.id} className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                                    <Link to={`/dashboard/documentos/${doc.id}`} className="group">
                                        <h3 className="font-semibold text-slate-800 text-sm group-hover:text-blue-700 transition-colors">{doc.title}</h3>
                                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                            <span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-600 font-medium">{doc.type}</span>
                                            <span>&bull;</span>
                                            <span>{doc.date}</span>
                                        </div>
                                        <p className="text-sm text-slate-600 mt-2 line-clamp-2">{doc.summary}</p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackingTabs;
