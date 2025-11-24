import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { IconMap } from '../components/Icons';

const DocumentPage: React.FC = () => {
    const { id } = useParams();
    const { SparklesIcon } = IconMap;
    // Mock data for a document
    const document = {
        id: '123',
        title: 'Ley 21.643 - Modifica el Código del Trabajo en materia de prevención, investigación y sanción del acoso laboral, sexual o de violencia en el trabajo',
        date: '27 de Diciembre de 2023',
        cve: '2422933',
        section: 'Normas Generales',
        pdfLink: '#',
        summary: 'Esta ley introduce modificaciones sustanciales al Código del Trabajo con el objetivo de fortalecer la protección de los trabajadores y trabajadoras frente a situaciones de acoso (laboral y sexual) y violencia en el entorno laboral. Para ello, se establece un marco preventivo y sancionatorio más robusto, obligando a las empresas a adoptar protocolos específicos y canales de denuncia efectivos, garantizando así ambientes laborales seguros y respetuosos.',
        keyPoints: [
            'Obliga a los empleadores a crear y mantener un protocolo de prevención del acoso.',
            'Define explícitamente los conceptos de acoso laboral, acoso sexual y violencia en el trabajo.',
            'Establece procedimientos de investigación internos que deben ser confidenciales y expeditos.',
            'Refuerza las sanciones para las empresas que no cumplan con las nuevas normativas.',
        ],
        affects: ['Ciudadanía', 'Empresas', 'Organismos públicos', 'Profesionales', 'Sectores específicos'],
        entities: [
            { type: 'Ley', name: 'Código del Trabajo' },
            { type: 'Organismo público', name: 'Dirección del Trabajo' },
            { type: 'Concepto', name: 'Acoso Laboral' },
            { type: 'Concepto', name: 'Acoso Sexual' },
        ],
        history: 'Modifica el artículo 2 del Código del Trabajo.',
        keywords: ['Laboral', 'Acoso', 'Violencia Trabajo', 'Protocolo', 'Derechos Trabajadores'],
        relatedTopics: ['Derecho Laboral', 'Seguridad en el Trabajo', 'Recursos Humanos'],
        relatedDocs: [
            { id: '124', title: 'Reglamento de la Ley 21.643' },
            { id: '125', title: 'Dictamen de la Dirección del Trabajo sobre acoso' },
        ]
    };

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Main Document Content */}
                    <div className="lg:col-span-8 space-y-8">
                         {/* Disclaimer */}
                        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                            <p className="text-sm text-blue-800">Este contenido proviene del Diario Oficial de Chile. AIDO lo interpreta y presenta de forma clara para facilitar su comprensión.</p>
                        </div>

                        {/* Header */}
                        <div>
                            <p className="text-sm font-semibold text-blue-600">{document.section}</p>
                            <h1 className="text-3xl font-bold text-slate-900 mt-1">{document.title}</h1>
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 mt-3">
                                <span>Fecha: {document.date}</span>
                                <span>CVE: {document.cve}</span>
                                <a href={document.pdfLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Ver PDF Oficial</a>
                            </div>
                        </div>

                        {/* AI Summary */}
                        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                             <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                                {SparklesIcon && <SparklesIcon className="h-6 w-6 text-blue-500" />}
                                Resumen IA
                            </h2>
                            <p className="text-slate-700">{document.summary}</p>
                        </div>
                        
                        {/* Key Points */}
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900 mb-4">Puntos Clave</h2>
                            <ul className="space-y-3 list-disc list-inside text-slate-700">
                                {document.keyPoints.map((point, i) => <li key={i}>{point}</li>)}
                            </ul>
                        </div>

                        {/* Affects Module */}
                         <div>
                            <h2 className="text-xl font-semibold text-slate-900 mb-4">¿A quién afecta?</h2>
                            <div className="flex flex-wrap gap-2">
                                {document.affects.map(item => (
                                    <span key={item} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">{item}</span>
                                ))}
                            </div>
                        </div>

                        {/* Entities */}
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900 mb-4">Entidades y Conceptos Relevantes</h2>
                             <div className="flex flex-wrap gap-2">
                                {document.entities.map(item => (
                                    <span key={item.name} className="px-3 py-1 bg-slate-100 text-slate-800 text-sm font-medium rounded-md border border-slate-200">{item.name}</span>
                                ))}
                            </div>
                        </div>

                        {/* History */}
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900 mb-4">Historial Normativo</h2>
                            <p className="text-slate-700 bg-slate-50 p-4 rounded-md border border-slate-200">{document.history}</p>
                        </div>

                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                                <h3 className="text-lg font-semibold text-slate-900 border-b pb-3 mb-4">Ficha Técnica</h3>
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <p className="font-semibold text-slate-800">Palabras Clave IA</p>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {document.keywords.map(kw => <span key={kw} className="text-xs bg-white border border-slate-200 px-2 py-0.5 rounded">{kw}</span>)}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-800">Temas Relacionados</p>
                                         <div className="flex flex-wrap gap-1 mt-1">
                                            {document.relatedTopics.map(topic => (
                                                <Link to={`/topic/${topic.toLowerCase().replace(' ', '-')}`} key={topic} className="text-blue-600 hover:underline text-sm">{topic}</Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                                <h3 className="text-lg font-semibold text-slate-900 border-b pb-3 mb-4">Documentos Relacionados</h3>
                                <ul className="space-y-3">
                                    {document.relatedDocs.map(doc => (
                                        <li key={doc.id}>
                                            <Link to={`/document/${doc.id}`} className="font-medium text-blue-700 hover:underline">{doc.title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default DocumentPage;