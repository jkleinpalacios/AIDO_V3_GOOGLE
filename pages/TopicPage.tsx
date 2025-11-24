import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { IconMap } from '../components/Icons';

const TopicPage: React.FC = () => {
    const { topic } = useParams();
    const { SparklesIcon } = IconMap;

    // Mock data for a topic
    const topicData = {
        name: 'Vivienda y Urbanismo',
        description: 'AIDO agrupa y analiza la información del Diario Oficial según temas de interés público, ofreciendo una visión contextualizada, clara y accesible. Cada tema incluye análisis, entidades involucradas, normativa relevante y vínculos a documentos oficiales.',
        summary: 'Este tema agrupa toda la normativa relacionada con la planificación urbana, la construcción de viviendas, los subsidios habitacionales y las políticas de desarrollo territorial. Incluye decretos del MINVU, modificaciones a la Ley General de Urbanismo y Construcciones, y avisos de expropiación.',
        dailyNorms: [
            { id: '201', title: 'Decreto Supremo N°12 - Reglamento del Programa de Integración Social y Territorial', section: 'Normas Generales' },
            { id: '202', title: 'Resolución Exenta N° 345 - Llama a postulación para subsidio habitacional DS49', section: 'Avisos Destacados' },
        ],
        history: ['Ley General de Urbanismo y Construcciones', 'Política Nacional de Desarrollo Urbano'],
        entities: ['Ministerio de Vivienda y Urbanismo (MINVU)', 'SERVIU Metropolitano', 'Municipalidad de Santiago'],
        relatedTopics: ['Medio Ambiente', 'Obras Públicas', 'Subsidios']
    };

    return (
        <div className="bg-slate-50">
            {/* Hero Section */}
            <section className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight capitalize text-slate-900">{topic?.replace('-', ' ')}</h1>
                        <p className="mt-4 text-lg text-slate-600">{topicData.description}</p>
                        <p className="mt-3 text-sm font-medium text-slate-500">Interpretación generada por IA basada en contenido oficial.</p>
                    </div>
                </div>
            </section>
            
            {/* Main Content */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                 <div className="grid lg:grid-cols-12 gap-8 items-start">
                    <main className="lg:col-span-8 space-y-8">
                         {/* AI Summary */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                            <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                                {SparklesIcon && <SparklesIcon className="h-6 w-6 text-blue-500" />}
                                Resumen IA del Tema
                            </h2>
                            <p className="text-sm text-slate-600 mb-4">Este resumen es generado por IA y ofrece una visión general del tema, identificando los conceptos clave, áreas de impacto y contexto normativo.</p>
                            <div className="prose prose-slate max-w-none">
                                <p>{topicData.summary}</p>
                            </div>
                            <p className="mt-4 text-xs text-slate-500 italic">Interpretación de IA basada en la información del Diario Oficial. Para efectos legales, consulte siempre los documentos oficiales.</p>
                        </div>

                        {/* Relevant Norms of the Day */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                            <h2 className="text-xl font-semibold text-slate-900 mb-2">Normativa relevante publicada hoy en el Diario Oficial</h2>
                            <p className="text-sm text-slate-600 mb-4">AIDO identifica automáticamente las publicaciones del día relacionadas con este tema.</p>
                            <div className="space-y-3">
                                {topicData.dailyNorms.length > 0 ? topicData.dailyNorms.map(doc => (
                                    <Link to={`/document/${doc.id}`} key={doc.id} className="block p-4 border border-slate-200 rounded-lg hover:border-blue-400 hover:bg-slate-50 transition-all">
                                        <p className="font-semibold text-blue-700">{doc.title}</p>
                                        <span className="text-sm text-slate-500 mt-1 block">{doc.section}</span>
                                    </Link>
                                )) : (
                                    <p className="text-slate-500 text-sm">No se encontraron publicaciones relevantes para hoy.</p>
                                )}
                            </div>
                        </div>

                        {/* Key Normative History */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                            <h2 className="text-xl font-semibold text-slate-900 mb-2">Contexto histórico relacionado con este tema</h2>
                            <p className="text-sm text-slate-600 mb-4">AIDO organiza referencias a leyes, decretos, políticas y marcos regulatorios que forman el fundamento de este tema.</p>
                            <ul className="space-y-2 list-disc list-inside text-slate-700">
                                {topicData.history.map(item => <li key={item}>{item}</li>)}
                            </ul>
                        </div>
                    </main>

                    <aside className="lg:col-span-4 sticky top-24 space-y-6">
                         <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Entidades Involucradas</h3>
                            <p className="text-sm text-slate-600 mb-4">Organismos públicos, servicios, ministerios, municipalidades o entidades mencionadas en las publicaciones relacionadas con este tema.</p>
                            <div className="flex flex-wrap gap-2">
                                 {topicData.entities.map(item => <span key={item} className="px-3 py-1 bg-slate-100 text-slate-800 text-sm font-medium rounded-md border border-slate-200">{item}</span>)}
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Subtemas Sugeridos</h3>
                            <p className="text-sm text-slate-600 mb-4">AIDO identifica subtemas asociados para facilitar la exploración contextual.</p>
                            <div className="flex flex-wrap gap-2">
                                 {topicData.relatedTopics.map(item => (
                                    <Link to={`/topic/${item.toLowerCase().replace(' ', '-')}`} key={item} className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-100 hover:border-slate-300 transition-all">{item}</Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    );
};

export default TopicPage;