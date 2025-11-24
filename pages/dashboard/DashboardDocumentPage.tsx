import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IconMap } from '../../components/Icons';
import { EntityType } from '../../types/entities';
import { EXPLORABLE_TOPICS } from '../../constants';

// Mock data for the new document from PDF (CVE 2722741)
const document_2722741 = {
    id: '2722741',
    title: 'Declara área de restricción para nuevas extracciones de aguas subterráneas en el sector Estero El Manzano, Región Metropolitana.',
    date: '15 de noviembre de 2025',
    cve: '2722741',
    section: 'Normas Generales',
    pdfLink: '#',
    summary: 'La Dirección General de Aguas (DGA) ha declarado un área de restricción para la constitución de nuevos derechos de aprovechamiento de aguas subterráneas en el sector hidrogeológico de aprovechamiento común denominado Estero El Manzano, en la Provincia de Cordillera. Esta medida se fundamenta en informes técnicos que demuestran que la oferta hídrica es insuficiente para satisfacer la demanda comprometida y la recarga sustentable necesaria para el sistema acuífero del río Maipo. El objetivo es prevenir una grave disminución del acuífero, proteger su sustentabilidad y resguardar los derechos de terceros ya establecidos.',
    keyPoints: [
        'Se declara oficialmente un "área de restricción" para nuevas extracciones de aguas subterráneas en el sector hidrogeológico Estero El Manzano.',
        'La decisión se fundamenta en múltiples informes técnicos sobre recarga, demanda comprometida y balance hídrico del sistema acuífero del río Maipo.',
        'La oferta de recursos hídricos subterráneos es inferior a la demanda total y a la recarga necesaria para el modelo hidrogeológico Santiago Sur.',
        'No se podrán otorgar nuevos derechos de aprovechamiento de aguas subterráneas, ni siquiera provisionales, en el sector.',
        'Los antecedentes técnicos y mapas que delimitan el área de restricción quedan disponibles en la web de la Dirección General de Aguas.'
    ],
    affects: ['Titulares de derechos de aguas', 'Usuarios del sector Estero El Manzano', 'Empresas agrícolas o industriales', 'Organismos públicos'],
    entities: [
        { name: 'Dirección General de Aguas (DGA)', type: 'AGENCY' as EntityType, slug: 'dga' },
        { name: 'Ministerio de Obras Públicas', type: 'MINISTRY' as EntityType, slug: 'mop' },
        { name: 'Código de Aguas', type: 'REGULATION' as EntityType, slug: 'codigo-de-aguas' },
        { name: 'Sectores hidrogeológicos de aprovechamiento común (SHAC)'},
        { name: 'Estero El Manzano' },
        { name: 'Sistema acuífero del río Maipo' },
        { name: 'Cambio climático' },
    ],
    history: 'Esta resolución aplica lo dispuesto en los artículos 65, 66 y 67 del Código de Aguas. Se enmarca en el decreto supremo N° 203 de 2013 (modificado por el DS N° 224 de 2021) sobre Normas de Exploración y Explotación de Aguas Subterráneas, y sigue los criterios del Manual de Normas y Procedimientos de la DGA (SDT N° 477/2024). La decisión se toma al constatar que las extracciones en el SHAC Estero El Manzano afectan la disponibilidad sustentable del modelo hidrogeológico Santiago Sur.',
    keywords: ['Recursos Hídricos', 'Área de Restricción', 'Acuífero', 'DGA', 'Estero El Manzano', 'Código de Aguas'],
    relatedTopics: ['Derecho de Aguas', 'Medio Ambiente', 'Regulación Hídrica'],
    relatedDocs: [
        { id: 'tech-report-1', title: 'Informe Técnico DARH N° 473/2025: Análisis de Disponibilidad de Recursos Hídricos Subterráneos' },
        { id: 'tech-report-2', title: 'Informe Técnico DARH SDT N° 506/2025: Reevaluación por efecto del Cambio Climático' },
        { id: 'tech-report-3', title: 'Informe Técnico DARH SDT N° 367/2015: Estimación de recarga de aguas subterránea' },
    ]
};

// Fallback mock data
const defaultDocument = {
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
        { name: 'Ley 21.643', type: 'LAW' as EntityType, slug: '21643' },
        { name: 'Código del Trabajo', type: 'REGULATION' as EntityType, slug: 'codigo-del-trabajo' },
        { name: 'Dirección del Trabajo', type: 'AGENCY' as EntityType, slug: 'dt' },
        { name: 'Acoso Laboral' },
        { name: 'Acoso Sexual' },
    ],
    history: 'Modifica el artículo 2 del Código del Trabajo.',
    keywords: ['Laboral', 'Acoso', 'Violencia Trabajo', 'Protocolo', 'Derechos Trabajadores'],
    relatedTopics: ['Derecho Laboral', 'Seguridad en el Trabajo', 'Recursos Humanos'],
    relatedDocs: [
        { id: '124', title: 'Reglamento de la Ley 21.643' },
        { id: '125', title: 'Dictamen de la Dirección del Trabajo sobre acoso' },
    ]
};

const DashboardDocumentPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { SparklesIcon } = IconMap;

    const document = id === '2722741' ? document_2722741 : defaultDocument;

    return (
        <div className="space-y-8">
            <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Volver
            </button>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Main Document Content */}
                <div className="lg:col-span-8 space-y-8">
                     {/* Disclaimer */}
                    <div className="p-4 bg-white border-l-4 border-blue-500 rounded-r-lg shadow-sm">
                        <p className="text-sm text-blue-800">Este contenido proviene del Diario Oficial de Chile. AIDO lo interpreta y presenta de forma clara para facilitar su comprensión.</p>
                    </div>

                    {/* Header */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <p className="text-sm font-semibold text-blue-600">{document.section}</p>
                        <h1 className="text-3xl font-bold text-slate-900 mt-1">{document.title}</h1>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 mt-3">
                            <span>Fecha de publicación: {document.date}</span>
                            <span>CVE: {document.cve}</span>
                            <a href={document.pdfLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Ver PDF Oficial</a>
                        </div>
                    </div>

                    {/* AI Summary */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                         <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                            {SparklesIcon && <SparklesIcon className="h-6 w-6 text-blue-500" />}
                            Resumen IA
                        </h2>
                        <p className="text-slate-700">{document.summary}</p>
                    </div>
                    
                    {/* Key Points */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">Puntos Clave</h2>
                        <ul className="space-y-3 list-disc list-inside text-slate-700">
                            {document.keyPoints.map((point, i) => <li key={i}>{point}</li>)}
                        </ul>
                    </div>

                    {/* Affects Module */}
                     <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">¿A quién afecta?</h2>
                        <div className="flex flex-wrap gap-2">
                            {document.affects.map(item => (
                                <span key={item} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">{item}</span>
                            ))}
                        </div>
                    </div>

                    {/* Entities */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">Entidades y Conceptos Relevantes</h2>
                         <div className="flex flex-wrap gap-2">
                            {document.entities.map(entity => {
                                if (entity.type && entity.slug) {
                                    return (
                                        <Link
                                            to={`/dashboard/entidades/${entity.type.toLowerCase()}/${entity.slug}`}
                                            key={entity.name}
                                            className="px-3 py-1 bg-slate-100 text-slate-800 text-sm font-medium rounded-md border border-slate-200 hover:bg-blue-100 hover:border-blue-300 hover:text-blue-800 transition-colors"
                                        >
                                            {entity.name}
                                        </Link>
                                    );
                                }
                                return (
                                    <span key={entity.name} className="px-3 py-1 bg-slate-100 text-slate-800 text-sm font-medium rounded-md border border-slate-200">{entity.name}</span>
                                );
                            })}
                        </div>
                    </div>

                    {/* History */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">Historial Normativo</h2>
                        <p className="text-slate-700 bg-slate-50 p-4 rounded-md border border-slate-200">{document.history}</p>
                    </div>
                     <p className="text-center text-xs text-slate-500 italic">
                        Esta interpretación es un apoyo informativo basado en el contenido oficial del Diario Oficial de Chile. Para efectos legales, consulte siempre el documento oficial.
                    </p>

                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-4">
                    <div className="sticky top-24 space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
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
                                     <div className="flex flex-wrap gap-2 mt-1">
                                        {document.relatedTopics.map(topicName => {
                                            const topicInfo = EXPLORABLE_TOPICS.find(t => t.name === topicName);
                                            const topicSlug = topicInfo ? topicInfo.slug : topicName.toLowerCase().replace(/ /g, '-');
                                            return (
                                                <Link to={`/dashboard/temas/${topicSlug}`} key={topicName} className="text-blue-600 hover:underline text-sm font-medium">{topicName}</Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-900 border-b pb-3 mb-4">Documentos Relacionados</h3>
                            <ul className="space-y-3">
                                {document.relatedDocs.map(doc => (
                                    <li key={doc.id}>
                                        <p className="font-medium text-slate-700">{doc.title}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default DashboardDocumentPage;