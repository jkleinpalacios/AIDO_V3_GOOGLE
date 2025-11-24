import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconMap } from '../components/Icons';
import EmptyState from '../components/EmptyState';

const SearchPage: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const { SparklesIcon } = IconMap;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        setLoading(true);
        // Mock API call
        setTimeout(() => {
            setResults({
                aiSummary: `Con base en la información oficial, la Ley 21.643 (publicada el 27/12/2023) introduce modificaciones al Código del Trabajo para prevenir, investigar y sancionar el acoso y la violencia laboral. Esta normativa establece nuevas obligaciones para los empleadores, como la implementación de protocolos de prevención y canales de denuncia seguros. AIDO interpreta que esta ley afecta principalmente a <mark>empresas</mark>, <mark>trabajadores/as</mark> y <mark>organismos públicos</mark> fiscalizadores. Es importante señalar que AIDO es una herramienta de interpretación y no reemplaza la fuente oficial.`,
                documents: [
                    { id: '123', title: 'Ley 21.643 - Modifica el Código del Trabajo', summary: 'Establece medidas para prevenir, investigar y sancionar el acoso laboral, sexual y la violencia en el trabajo...', date: '2023-12-27', section: 'Normas Generales' },
                    { id: '124', title: 'Reglamento de la Ley 21.643', summary: 'Detalla los procedimientos para la implementación de los protocolos de prevención y los canales de denuncia...', date: '2024-02-15', section: 'Normas Generales' },
                    { id: '125', title: 'Dictamen de la Dirección del Trabajo sobre acoso', summary: 'Interpreta el alcance de las nuevas normativas sobre acoso y violencia laboral...', date: '2024-03-01', section: 'Normas Particulares' }
                ],
                suggestedQueries: ['¿Cuáles son las nuevas obligaciones del empleador?', '¿Cómo se realiza una denuncia?', '¿Qué es la violencia en el trabajo según la ley?']
            });
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search Input Bar */}
                <div className="sticky top-16 bg-white/80 backdrop-blur-md z-10 py-4 -mx-4 px-4 border-b border-slate-200">
                    <form onSubmit={handleSearch} className="relative max-w-4xl mx-auto">
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Consulta en lenguaje natural sobre cualquier publicación oficial..."
                            className="w-full pl-6 pr-14 py-3 text-base border-2 border-slate-300 rounded-full focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:bg-slate-400">
                            <SparklesIcon className="h-5 w-5" />
                        </button>
                    </form>
                </div>

                {/* Content Area */}
                <div className="mt-8 grid lg:grid-cols-12 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        {loading && <div className="text-center p-8">Cargando respuesta...</div>}
                        {!results && !loading && (
                            <EmptyState 
                                title="Consulta Inteligente de Información Oficial" 
                                message="Consulta cualquier publicación del Diario Oficial en lenguaje natural. AIDO interpreta tu pregunta, identifica documentos relevantes y te ofrece respuestas claras con base oficial."
                                icon="SearchIcon"
                            />
                        )}
                        {results && (
                            <div className="space-y-8">
                                {/* AI Response */}
                                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                                    <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                                        <SparklesIcon className="h-6 w-6 text-blue-500" />
                                        Respuesta IA
                                    </h2>
                                    <div className="mt-4 prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: results.aiSummary.replace(/<mark>/g, '<mark class="bg-blue-100 text-blue-800 font-semibold rounded px-1 py-0.5">') }} />
                                </div>
                                
                                {/* Relevant Documents */}
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Documentos Relevantes</h3>
                                    <div className="space-y-4">
                                        {results.documents.map((doc: any) => (
                                            <Link to={`/document/${doc.id}`} key={doc.id} className="block bg-white p-4 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all">
                                                <h4 className="font-semibold text-blue-700">{doc.title}</h4>
                                                <p className="text-sm text-slate-600 mt-1">{doc.summary}</p>
                                                <div className="text-xs text-slate-400 mt-2 flex gap-4">
                                                    <span>{doc.date}</span>
                                                    <span>{doc.section}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                 {/* Suggested Queries */}
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Consultas Sugeridas</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {results.suggestedQueries.map((q: string) => (
                                            <button key={q} onClick={() => setQuery(q)} className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors">
                                                {q}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Filters Sidebar */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-32 bg-slate-50 p-6 rounded-lg border border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-900 border-b pb-3 mb-4">Filtros</h3>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-slate-700">Fecha</label>
                                    <input type="date" id="date" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2" />
                                </div>
                                <div>
                                    <label htmlFor="section" className="block text-sm font-medium text-slate-700">Sección del DO</label>
                                    <select id="section" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2">
                                        <option>Todas</option>
                                        <option>Normas Generales</option>
                                        <option>Empresas y Cooperativas</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="topic" className="block text-sm font-medium text-slate-700">Tema IA</label>
                                    <select id="topic" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2">
                                        <option>Todos</option>
                                        <option>Laboral</option>
                                        <option>Medio Ambiente</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="emitter" className="block text-sm font-medium text-slate-700">Organismo Emisor</label>
                                    <input type="text" id="emitter" placeholder="Ej: Ministerio de Hacienda" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2" />
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;