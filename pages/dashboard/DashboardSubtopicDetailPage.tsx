import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { EXPLORABLE_TOPICS } from '../../constants';
import { SUBTOPICS } from '../../data/subtopics';
import { IconMap } from '../../components/Icons';
import EmptyState from '../../components/EmptyState';

// --- HELPER COMPONENTS (Scoped to this file for simplicity) ---

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
            <p className="text-xs text-slate-500 mt-2">Aquí se integraría una librería de gráficos (ej. Chart.js) para visualizar los datos de actividad del subtema.</p>
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

const Breadcrumbs: React.FC<{ topicName: string; topicSlug: string; subtopicName: string }> = ({ topicName, topicSlug, subtopicName }) => (
    <nav className="text-sm font-medium text-slate-500 flex items-center gap-2">
        <Link to="/dashboard" className="hover:text-blue-600">Panel de Control</Link>
        <span>&rsaquo;</span>
        <Link to="/dashboard/temas" className="hover:text-blue-600">Temas</Link>
        <span>&rsaquo;</span>
        <Link to={`/dashboard/temas/${topicSlug}`} className="hover:text-blue-600">{topicName}</Link>
        <span>&rsaquo;</span>
        <span className="text-slate-700 font-semibold">{subtopicName}</span>
    </nav>
);

// --- MAIN PAGE COMPONENT ---

const DashboardSubtopicDetailPage: React.FC = () => {
    const { topicSlug, subtopicSlug } = useParams<{ topicSlug: string; subtopicSlug: string }>();
    const navigate = useNavigate();

    const topic = EXPLORABLE_TOPICS.find(t => t.slug === topicSlug);
    const subtopic = subtopicSlug ? SUBTOPICS.find(s => s.slug === subtopicSlug && s.topicSlug === topicSlug) : undefined;

    if (!topic || !subtopic) {
        return (
            <div className="text-center py-20">
                <EmptyState title="Subtema no encontrado" message="El subtema que buscas no existe o no corresponde a este tema." icon="ExclamationTriangleIcon" />
                <button onClick={() => navigate('/dashboard/temas')} className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                    Volver a Temas
                </button>
            </div>
        );
    }
    
    // Find the icon from the main topic data
    const TopicIcon = IconMap[topic.icon];

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            {/* 1. Header & Breadcrumbs */}
            <div className="space-y-3">
                <Breadcrumbs topicName={topic.name} topicSlug={topic.slug} subtopicName={subtopic.name} />
                <div className="flex items-center gap-4 pt-2">
                     {TopicIcon && (
                        <div className="flex-shrink-0 h-14 w-14 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-600">
                            <TopicIcon className="h-8 w-8" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">{subtopic.name}</h1>
                        <p className="text-slate-500">{subtopic.description}</p>
                    </div>
                </div>
            </div>

            {/* 2. AI Description & Executive Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-blue-50 border-2 border-dashed border-blue-200 p-6 rounded-xl">
                    <h2 className="text-lg font-semibold text-blue-900 flex items-center gap-2.5 mb-3">
                        <IconMap.SparklesIcon className="h-5 w-5 text-blue-600" />
                        Descripción del Subtema (IA)
                    </h2>
                    <p className="text-sm text-blue-800">{subtopic.description}</p>
                </div>
                <SectionCard title="Resumen Ejecutivo" className="bg-slate-50">
                    <ul className="text-sm space-y-2">
                        <li><strong>Actividad:</strong> <span className="font-medium text-slate-800">{subtopic.summary.activityLevel}</span></li>
                        <li><strong>Organismos:</strong> <span className="text-slate-700">{subtopic.summary.mainOrganizations.join(', ')}</span></li>
                        <li><strong>Documentos:</strong> <span className="text-slate-700">{subtopic.summary.mainDocTypes.join(', ')}</span></li>
                        <li><strong>Foco Reciente:</strong> <span className="text-slate-700">{subtopic.summary.recentFocus}</span></li>
                    </ul>
                </SectionCard>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Main Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* 4. AI Analysis */}
                    <SectionCard title="Análisis del Subtema con IA" icon={IconMap.SparklesIcon}>
                        <div className="grid sm:grid-cols-2 gap-6 text-sm">
                            <div>
                                <h3 className="font-semibold text-slate-800 mb-2">Riesgos Regulatorios</h3>
                                <ul className="list-disc list-inside space-y-1 text-slate-600">
                                    {subtopic.risks.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 mb-2">Oportunidades</h3>
                                <ul className="list-disc list-inside space-y-1 text-slate-600">
                                    {subtopic.opportunities.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>
                            <div className="sm:col-span-2">
                                <h3 className="font-semibold text-slate-800 mb-2">Puntos a Monitorear</h3>
                                <ul className="list-disc list-inside space-y-1 text-slate-600">
                                    {subtopic.watchpoints.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>
                        </div>
                    </SectionCard>

                    {/* 7. Recent & Featured Documents */}
                    <SectionCard title="Documentos Recientes y Destacados" icon={IconMap.DocumentDuplicateIcon}>
                         <div className="space-y-3">
                            {subtopic.recentDocs.map(doc => (
                                <Link to={`/dashboard/documentos/${doc.id}`} key={doc.id} className="block p-3 border border-slate-200 rounded-lg hover:border-blue-400 hover:bg-slate-50 transition-all">
                                    <p className="font-semibold text-blue-700 text-sm">{doc.title}</p>
                                    <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                                        <span>{doc.type}</span> &middot; <span>{doc.date}</span> &middot; <span>{doc.organization}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-6">
                            <Link 
                                to={`/dashboard/busqueda?topic=${topicSlug}&subtopic=${subtopicSlug}`}
                                className="inline-block w-full text-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
                            >
                                Ver todas las publicaciones de este subtema
                            </Link>
                        </div>
                    </SectionCard>
                </div>

                {/* Sidebar Column */}
                <aside className="lg:col-span-1 space-y-8 sticky top-24">
                    {/* 5. Recent Activity */}
                    <SectionCard title="Actividad Reciente" icon={IconMap.ChartBarIcon}>
                        <ActivityChart data={subtopic.activityData} />
                    </SectionCard>

                    {/* 6. Relevant Regulations */}
                    <SectionCard title="Normativa Relevante" icon={IconMap.ScaleIcon}>
                        <div className="space-y-3">
                            {subtopic.relevantNorms.map(reg => (
                                <div key={reg.id} className="p-3 bg-slate-50 rounded-md border border-slate-200">
                                    <p className="font-semibold text-slate-800 text-sm">{reg.title}</p>
                                    <p className="text-xs text-slate-500 font-medium">{reg.type}</p>
                                    <p className="text-xs text-slate-600 mt-1">{reg.summary}</p>
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                </aside>
            </div>
        </div>
    );
};

export default DashboardSubtopicDetailPage;
