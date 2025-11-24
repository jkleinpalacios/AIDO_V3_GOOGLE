import React from 'react';
import { Link } from 'react-router-dom';
import { IconMap } from '../components/Icons';
import EmptyState from '../components/EmptyState';

const mockSavedDocuments = [
    { 
        id: '2722741', 
        title: 'Resolución 55/2025 – Declara área de restricción para nuevas extracciones de aguas subterráneas en Estero El Manzano', 
        summary: 'Declara área de restricción para nuevas extracciones de aguas subterráneas en el sector hidrogeológico Estero El Manzano, para proteger la disponibilidad sustentable del acuífero y los derechos existentes.', 
        date: '2025-11-15', 
        section: 'Normas Generales' 
    },
    { id: '123', title: 'Ley 21.643 - Modifica el Código del Trabajo en materia de acoso laboral', summary: 'Establece nuevas obligaciones para los empleadores, como la implementación de protocolos de prevención y canales de denuncia seguros...', date: '2023-12-27', section: 'Normas Generales' },
    { id: '201', title: 'Decreto Supremo N°12 - Reglamento del Programa de Integración Social y Territorial', summary: 'Detalla el programa de integración social y territorial, incluyendo los requisitos para postular a los subsidios habitacionales DS49.', date: '2024-01-15', section: 'Normas Generales' },
];

const SavedDocumentsPage: React.FC = () => {
    const { DocumentArrowDownIcon, SparklesIcon } = IconMap;
    const documents = mockSavedDocuments;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Documentos Guardados</h1>
                <p className="mt-1 text-slate-600">Aquí encontrarás los documentos oficiales que has marcado para referencia.</p>
            </div>
            
            {documents.length > 0 ? (
                <>
                    {/* Filters */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-slate-700">Fecha</label>
                            <input type="date" id="date" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2" />
                        </div>
                        <div>
                            <label htmlFor="section" className="block text-sm font-medium text-slate-700">Sección del DO</label>
                            <select id="section" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2">
                                <option>Todas</option>
                                <option>Normas Generales</option>
                                <option>Normas Particulares</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="topic" className="block text-sm font-medium text-slate-700">Tema IA</label>
                             <select id="topic" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2">
                                <option>Todos</option>
                                <option>Laboral</option>
                                <option>Vivienda</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <button className="w-full text-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                                Filtrar
                            </button>
                        </div>
                    </div>
                    
                    {/* Documents List */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <ul className="divide-y divide-slate-200">
                            {documents.map(doc => (
                                <li key={doc.id} className="p-6 hover:bg-slate-50">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <Link to={`/dashboard/documentos/${doc.id}`}>
                                                <h2 className="font-semibold text-blue-700 hover:underline">{doc.title}</h2>
                                            </Link>
                                            <p className="text-sm text-slate-600 my-2 flex items-start gap-2">
                                                {SparklesIcon && <SparklesIcon className="h-4 w-4 flex-shrink-0 mt-0.5 text-blue-500" />}
                                                <span className="italic">"{doc.summary}"</span>
                                            </p>
                                            <div className="text-xs text-slate-500 flex flex-wrap gap-x-4 gap-y-1 mt-2">
                                                <span>Fecha: {new Date(doc.date).toLocaleDateString('es-CL', { timeZone: 'UTC' })}</span>
                                                <span>Sección: {doc.section}</span>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0 flex flex-col items-center gap-2">
                                            <Link to={`/dashboard/documentos/${doc.id}`} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-md hover:bg-slate-200 transition-colors">
                                                Ver documento
                                            </Link>
                                            <a href="#" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600">
                                                {DocumentArrowDownIcon && <DocumentArrowDownIcon className="h-4 w-4"/>} PDF
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <EmptyState
                    title="No has guardado documentos aún"
                    message="Cuando encuentres un documento importante, guárdalo para acceder a él fácilmente desde aquí."
                    icon="BookmarkSquareIcon"
                />
            )}
        </div>
    );
};

export default SavedDocumentsPage;