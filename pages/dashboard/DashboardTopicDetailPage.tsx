
import React from 'react';
import { useState, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { EXPLORABLE_TOPICS } from '../../constants';
import { IconMap } from '../../components/Icons';
import EmptyState from '../../components/EmptyState';

// --- MOCK DATA FOR A SINGLE TOPIC ---
// In a real app, this would be fetched from an API based on the slug
const mockTopicData = {
    'vivienda-y-urbanismo': {
        executiveSummary: {
            context: 'Este tema abarca la regulación de la planificación territorial, construcción, y acceso a la vivienda. Es un área de alta actividad normativa, influenciada por políticas sociales y desarrollo económico.',
            recentChanges: 'Incremento en normativas de integración social y modificaciones a planes reguladores para densificación urbana.',
            trends: 'Aumento de publicaciones relacionadas con subsidios habitacionales y regularización de propiedades.',
            topOrganisms: ['MINVU', 'SERVIU', 'Municipalidades'],
            commonDocTypes: ['Decretos Supremos', 'Resoluciones Exentas', 'Avisos de Licitación'],
        },
        trends: {
            activityLevel: 'Alta' as 'Alta' | 'Media' | 'Baja',
            activeOrganisms: ['MINVU', 'SUBDERE', 'Gobiernos Regionales'],
            topDocTypes: ['Resoluciones', 'Decretos', 'Avisos'],
        },
        subtopics: [
            { slug: 'planificacion-urbana', name: 'Planificación Urbana', icon: 'MapIcon' },
            { slug: 'subsidios-habitacionales', name: 'Subsidios Habitacionales', icon: 'BanknotesIcon' },
            { slug: 'planes-reguladores', name: 'Planes Reguladores', icon: 'ClipboardDocumentListIcon' },
            { slug: 'expropiaciones', name: 'Expropiaciones', icon: 'BuildingOfficeIcon' },
            { slug: 'construccion', name: 'Urbanismo y Construcciones', icon: 'UsersIcon' },
        ],
        aiAnalysis: {
            summary: 'AIDO identifica una alta actividad en publicaciones sobre subsidios habitacionales y modificaciones a planes reguladores comunales. El organismo con mayor presencia es el Ministerio de Vivienda y Urbanismo (MINVU).',
            risks: ['Posibles retrasos en la aprobación de proyectos por nuevas exigencias ambientales.', 'Aumento de la burocracia en procesos de regularización de títulos.'],
            opportunities: ['Nuevas líneas de subsidios para proyectos de integración social.', 'Flexibilización de normativas para construcción en zonas de renovación urbana.'],
        },
        featuredDocuments: [
            { id: 'lguc', title: 'DFL 458 - Ley General de Urbanismo y Construcciones', type: 'Ley', date: '1975-04-18', organism: 'MINVU' },
            { id: 'pndu', title: 'Política Nacional de Desarrollo Urbano', type: 'Política Pública', date: '2014-02-13', organism: 'Presidencia' },
            { id: 'ds49', title: 'Decreto Supremo 49 - Reglamento Subsidio Habitacional', type: 'Decreto', date: '2011-01-26', organism: 'MINVU' },
        ],
        recentPublications: [
            { id: '301', title: 'Resolución Exenta N° 345 - Llama a postulación para subsidio habitacional DS49', type: 'Resolución' as 'Aviso' | 'Norma General' | 'Decreto' | 'Resolución', date: '2024-07-15', organism: 'MINVU' },
            { id: '303', title: 'Modificación al Plan Regulador Comunal de Providencia', type: 'Decreto' as 'Aviso' | 'Norma General' | 'Decreto' | 'Resolución', date: '2024-07-12', organism: 'Municipalidad de Providencia' },
        ],
        relevantRegulations: [
            { type: 'Leyes' as 'Leyes' | 'Reglamentos' | 'Decretos', items: [{ id: 'lguc', title: 'Ley General de Urbanismo y Construcciones (DFL 458)' }, { id: 'ley19537', title: 'Ley 19.537 sobre Copropiedad Inmobiliaria' }] },
            { type: 'Reglamentos' as 'Leyes' | 'Reglamentos' | 'Decretos', items: [{ id: 'oguc', title: 'Ordenanza General de Urbanismo y Construcciones (DS 47)' }] },
            { type: 'Decretos' as 'Leyes' | 'Reglamentos' | 'Decretos', items: [{ id: 'ds49', title: 'Decreto Supremo 49 (Subsidio Fondo Solidario)' }, { id: 'ds01', title: 'Decreto Supremo 01 (Subsidio Sectores Medios)' }] },
        ],
        faq: [
            { question: '¿Qué normativa principal regula este tema?', answer: 'La Ley General de Urbanismo y Construcciones (LGUC) y su Ordenanza (OGUC) son el marco principal.' },
            { question: '¿Qué organismos publican más sobre este tema?', answer: 'El Ministerio de Vivienda y Urbanismo (MINVU), los Servicios de Vivienda y Urbanización (SERVIU) y las Municipalidades.' },
            { question: '¿Qué cambios recientes se han observado?', answer: 'Se observa una tendencia a la densificación equilibrada y la creación de normativas de integración social en proyectos inmobiliarios.' },
        ],
        activityChartData: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{ label: 'Publicaciones', data: [22, 25, 18, 30, 28, 35], borderColor: '#2563eb', backgroundColor: 'rgba(37, 99, 235, 0.1)' }],
        },
    }
};

// --- HELPER COMPONENTS ---

const ActivityChart: React.FC<{ data: any }> = ({ data }) => {
    if (!data || !data.labels || data.labels.length === 0) {
        return <p className="text-sm text-slate-500 text-center py-4">No hay datos de actividad para mostrar.</p>;
    }
    return (
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="font-semibold text-slate-700 text-sm">Placeholder de Gráfico de Actividad</h4>
            <pre className="text-xs text-left bg-white p-2 rounded mt-2 overflow-x-auto">
                <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
            <p className="text-xs text-slate-500 mt-2">Aquí se integraría una librería de gráficos (ej. Chart.js) para visualizar los datos.</p>
        </div>
    );
};

const SectionCard: React.FC<{ title: string; icon?: React.ElementType; children: React.ReactNode; className?: string }> = ({ title, icon: Icon, children, className = '' }) => (
    <div className={`bg-white p-6 rounded-xl border border-slate-200 shadow-sm ${className}`}>
        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2.5 mb-4">
            {Icon && <Icon className="h-5 w-5 text-blue-600" />}
            {title}
        </h2>
        <div className="space-y-4">{children}</div>
    </div>
);

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-t border-slate-200 py-4">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left gap-4">
                <span className="font-medium text-slate-800">{question}</span>
                <IconMap.ChevronDownIcon className={`h-5 w-5 text-slate-400 transform transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && <p className="mt-3 text-slate-600 text-sm">{answer}</p>}
        </div>
    );
};

const AccordionItem: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="border-b border-slate-200 last:border-b-0">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center py-3 text-left">
                <span className="font-semibold text-slate-700">{title}</span>
                <IconMap.ChevronDownIcon className={`h-5 w-5 text-slate-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && <div className="pb-4 pl-2">{children}</div>}
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---

const DashboardTopicDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const topicInfo = useMemo(() => {
        const basicInfo = EXPLORABLE_TOPICS.find(t => t.slug === slug);
        if (!basicInfo) return null;
        const detailedData = (mockTopicData as any)[slug || ''];
        return { ...basicInfo, ...detailedData };
    }, [slug]);

    if (!topicInfo) {
        return (
            <div className="text-center py-20">
                <EmptyState title="Tema no encontrado" message="El tema que buscas no existe o ha sido movido." icon="ExclamationTriangleIcon" />
                <button onClick={() => navigate('/dashboard/temas')} className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                    Volver a Temas
                </button>
            </div>
        );
    }

    const {
        name,
        icon,
        description,
        executiveSummary = {
            context: 'No hay resumen ejecutivo disponible para este tema.',
            recentChanges: 'N/A',
            trends: 'N/A',
            topOrganisms: [],
            commonDocTypes: [],
        },
        trends = {
            activityLevel: 'Baja',
            activeOrganisms: [],
            topDocTypes: [],
        },
        subtopics = [],
        aiAnalysis = {
            summary: 'El análisis de IA para este tema no está disponible actualmente.',
            risks: [],
            opportunities: [],
        },
        featuredDocuments = [],
        recentPublications = [],
        relevantRegulations = [],
        faq = [],
        activityChartData = {
            labels: [],
            datasets: [],
        },
    } = topicInfo;

    const IconComponent = IconMap[icon];

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                    {IconComponent && (
                        <div className="flex-shrink-0 h-16 w-16 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-600">
                            <IconComponent className="h-9 w-9" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">{name}</h1>
                        <p className="text-slate-500 max-w-2xl">{description}</p>
                    </div>
                </div>
                <button onClick={() => navigate('/dashboard/temas')} className="inline-flex self-start sm:self-center items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Volver a Temas
                </button>
            </div>

            {/* Executive Summary */}
            <div className="bg-blue-50 border-2 border-dashed border-blue-200 p-6 rounded-xl">
                 <h2 className="text-lg font-semibold text-blue-900 flex items-center gap-2.5 mb-3">
                    <IconMap.SparklesIcon className="h-5 w-5 text-blue-600" />
                    Resumen Ejecutivo
                </h2>
                <p className="text-sm text-blue-800 mb-4">{executiveSummary.context}</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="bg-white/50 p-3 rounded-lg">
                        <p className="font-semibold text-blue-900">Cambios Recientes</p>
                        <p className="text-blue-700">{executiveSummary.recentChanges}</p>
                    </div>
                    <div className="bg-white/50 p-3 rounded-lg">
                        <p className="font-semibold text-blue-900">Tendencia</p>
                        <p className="text-blue-700">{executiveSummary.trends}</p>
                    </div>
                    <div className="bg-white/50 p-3 rounded-lg">
                        <p className="font-semibold text-blue-900">Organismos Clave</p>
                        <p className="text-blue-700">{executiveSummary.topOrganisms.join(', ')}</p>
                    </div>
                    <div className="bg-white/50 p-3 rounded-lg">
                        <p className="font-semibold text-blue-900">Documentos Comunes</p>
                        <p className="text-blue-700">{executiveSummary.commonDocTypes.join(', ')}</p>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Main Column */}
                <div className="lg:col-span-2 space-y-8">
                    <SectionCard title="Análisis del Tema con IA" icon={IconMap.SparklesIcon}>
                        <p className="text-sm text-slate-600">{aiAnalysis.summary}</p>
                        <div className="grid sm:grid-cols-2 gap-4 text-sm">
                            <div>
                                <h3 className="font-semibold text-slate-800 mb-2">Riesgos Regulatorios</h3>
                                {aiAnalysis.risks.length > 0 ? (
                                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                                        {aiAnalysis.risks.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                ) : <p className="text-slate-500 text-xs">No se identificaron riesgos específicos.</p>}
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 mb-2">Oportunidades</h3>
                                 {aiAnalysis.opportunities.length > 0 ? (
                                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                                        {aiAnalysis.opportunities.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                 ) : <p className="text-slate-500 text-xs">No se identificaron oportunidades específicas.</p>}
                            </div>
                        </div>
                    </SectionCard>
                    
                    <SectionCard title="Actividad Reciente" icon={IconMap.ChartBarIcon}>
                        <ActivityChart data={activityChartData} />
                    </SectionCard>

                    <SectionCard title="Documentos Destacados" icon={IconMap.BookmarkSquareIcon}>
                        {featuredDocuments.length > 0 ? (
                            <div className="space-y-3">
                                {featuredDocuments.map(doc => (
                                    <Link to={`/dashboard/documentos/${doc.id}`} key={doc.id} className="block p-3 border border-slate-200 rounded-lg hover:border-blue-400 hover:bg-slate-50 transition-all">
                                        <p className="font-semibold text-blue-700 text-sm">{doc.title}</p>
                                        <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                                            <span>{doc.type}</span> &middot; <span>{doc.date}</span> &middot; <span>{doc.organism}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : <p className="text-sm text-center text-slate-500 py-4">No hay documentos destacados para este tema.</p>}
                    </SectionCard>

                     <SectionCard title="Publicaciones Recientes" icon={IconMap.RectangleStackIcon}>
                        {recentPublications.length > 0 ? (
                            <div className="space-y-3">
                                {recentPublications.map(doc => (
                                    <Link to={`/dashboard/documentos/${doc.id}`} key={doc.id} className="block p-4 border border-slate-200 rounded-lg hover:border-blue-400 hover:bg-slate-50 transition-all">
                                        <div className="flex justify-between items-start">
                                            <p className="font-semibold text-blue-700 text-sm flex-1 pr-4">{doc.title}</p>
                                            <span className="text-xs font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full whitespace-nowrap">{doc.type}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                                            <span>{doc.date}</span> &middot; <span>{doc.organism}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : <p className="text-sm text-center text-slate-500 py-4">No hay publicaciones recientes para este tema.</p>}
                    </SectionCard>

                    <SectionCard title="Preguntas Frecuentes" icon={IconMap.AcademicCapIcon}>
                        {faq.length > 0 ? (
                            faq.map((item, i) => <FaqItem key={i} question={item.question} answer={item.answer} />)
                        ) : <p className="text-sm text-center text-slate-500 py-4">No hay preguntas frecuentes disponibles.</p>}
                    </SectionCard>
                </div>
                {/* Sidebar Column */}
                <aside className="lg:col-span-1 space-y-8 sticky top-24">
                    <SectionCard title="Tendencias Recientes" icon={IconMap.ChartBarIcon}>
                        <div className="text-sm space-y-3">
                            <div>
                                <p className="font-semibold text-slate-600">Actividad normativa</p>
                                <p className="text-slate-800">{trends.activityLevel}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-600">Organismos más activos</p>
                                <p className="text-slate-800">{trends.activeOrganisms.length > 0 ? trends.activeOrganisms.join(', ') : 'N/A'}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-600">Tipos más publicados</p>
                                <p className="text-slate-800">{trends.topDocTypes.length > 0 ? trends.topDocTypes.join(', ') : 'N/A'}</p>
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard title="Subtemas" icon={IconMap.TagIcon}>
                       {subtopics.length > 0 ? (
                            <div className="space-y-2">
                                {subtopics.map(sub => {
                                    const SubtopicIcon = IconMap[sub.icon];
                                    return (
                                    <Link to={`/dashboard/temas/${slug}/subtemas/${sub.slug}`} key={sub.slug} className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-100 transition-colors group">
                                        {SubtopicIcon && <SubtopicIcon className="h-5 w-5 text-slate-500 group-hover:text-blue-600" />}
                                        <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">{sub.name}</span>
                                    </Link>
                                    );
                                })}
                            </div>
                        ) : <p className="text-sm text-center text-slate-500 py-4">No hay subtemas definidos.</p>}
                    </SectionCard>

                    <SectionCard title="Normativa Relevante" icon={IconMap.ScaleIcon}>
                        {relevantRegulations.length > 0 ? (
                             relevantRegulations.map(reg => (
                                <AccordionItem key={reg.type} title={reg.type}>
                                    <ul className="space-y-2">
                                        {reg.items.map(item => (
                                            <li key={item.id}>
                                                <Link to={`/dashboard/documentos/${item.id}`} className="text-sm text-blue-700 hover:underline">{item.title}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionItem>
                            ))
                        ) : <p className="text-sm text-center text-slate-500 py-4">No hay normativa relevante para mostrar.</p>}
                    </SectionCard>
                </aside>
            </div>
        </div>
    );
};

export default DashboardTopicDetailPage;