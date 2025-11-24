import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ENTITIES } from '../../data/entities';
import { EntityType } from '../../types/entities';
import { IconMap } from '../../components/Icons';
import EmptyState from '../../components/EmptyState';

// --- HELPER COMPONENTS ---

const ActivityChart: React.FC<{ data: any }> = ({ data }) => {
    return (
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="font-semibold text-slate-700 text-sm">Placeholder de Gráfico de Actividad</h4>
            <pre className="text-xs text-left bg-white p-2 rounded mt-2 overflow-x-auto">
                <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
            <p className="text-xs text-slate-500 mt-2">Aquí se integraría una librería de gráficos para visualizar los datos.</p>
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

// --- MAIN PAGE COMPONENT ---

const DashboardEntityDetailPage: React.FC = () => {
    const { entityType, entitySlug } = useParams<{ entityType: string; entitySlug: string }>();
    const navigate = useNavigate();
    
    const entity = ENTITIES.find(e => e.type.toLowerCase() === entityType?.toLowerCase() && e.slug === entitySlug);

    if (!entity) {
        return (
            <div className="text-center py-20">
                <EmptyState title="Entidad no encontrada" message="La entidad que buscas no existe o ha sido movida." icon="ExclamationTriangleIcon" />
                <button onClick={() => navigate('/dashboard')} className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                    Volver al Panel
                </button>
            </div>
        );
    }
    
    const entityTypeLabels: { [key in EntityType]: string } = {
        LAW: 'Ley',
        DECREE: 'Decreto',
        REGULATION: 'Reglamento',
        MINISTRY: 'Ministerio',
        AGENCY: 'Agencia',
        PERSON: 'Persona',
        PROGRAM: 'Programa',
    };
    
    const entityTypeIcons: { [key in EntityType]: string } = {
        LAW: 'BuildingLibraryIcon',
        DECREE: 'DocumentTextIcon',
        REGULATION: 'DocumentDuplicateIcon',
        MINISTRY: 'BuildingOfficeIcon',
        AGENCY: 'BuildingOfficeIcon',
        PERSON: 'UserCircleIcon',
        PROGRAM: 'TagIcon',
    };

    const IconComponent = IconMap[entityTypeIcons[entity.type]];

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            {/* 1. Header & Breadcrumbs */}
            <nav className="text-sm font-medium text-slate-500 flex items-center gap-2">
                <Link to="/dashboard" className="hover:text-blue-600">Panel de Control</Link>
                <span>&rsaquo;</span>
                <span className="text-slate-500">Entidades</span>
                <span>&rsaquo;</span>
                <span className="text-slate-700 font-semibold">{entity.name}</span>
            </nav>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        {IconComponent && (
                            <div className="flex-shrink-0 h-16 w-16 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                                <IconComponent className="h-9 w-9" />
                            </div>
                        )}
                        <div>
                            <p className="text-sm font-semibold text-blue-600">{entityTypeLabels[entity.type]}</p>
                            <h1 className="text-3xl font-bold text-slate-900">{entity.name} {entity.metadata.acronym && `(${entity.metadata.acronym})`}</h1>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
                                {entity.metadata.number && <span>N°: {entity.metadata.number}</span>}
                                {entity.metadata.date && <span>Fecha: {entity.metadata.date}</span>}
                                {entity.metadata.status && <span>Estado: {entity.metadata.status}</span>}
                                {entity.metadata.role && <span>Rol: {entity.metadata.role}</span>}
                            </div>
                        </div>
                    </div>
                    <button className="flex-shrink-0 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        Seguir esta entidad
                    </button>
                </div>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    {/* 2. AI Summary */}
                    <SectionCard title="Resumen IA de la Entidad" icon={IconMap.SparklesIcon}>
                        <p className="text-sm text-slate-600">{entity.description}</p>
                    </SectionCard>
                    
                    {/* 3. Relationship Map */}
                    <SectionCard title="Mapa de Relaciones" icon={IconMap.RectangleStackIcon}>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="text-left text-slate-500">
                                    <tr>
                                        <th className="p-2 font-medium">Fecha</th>
                                        <th className="p-2 font-medium">Relación</th>
                                        <th className="p-2 font-medium">Documento / Entidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {entity.relationships.map(rel => (
                                        <tr key={rel.id} className="border-t border-slate-200">
                                            <td className="p-2 text-slate-500">{rel.date || '-'}</td>
                                            <td className="p-2">
                                                <span className="px-2 py-0.5 text-xs font-semibold bg-slate-100 text-slate-700 rounded-full">{rel.relationType}</span>
                                            </td>
                                            <td className="p-2 font-medium text-blue-700 hover:underline">
                                                 <Link to={rel.relatedDocumentId ? `/dashboard/documentos/${rel.relatedDocumentId}` : `/dashboard/entidades/${rel.relatedEntityType?.toLowerCase()}/${rel.relatedEntitySlug}`}>{rel.label}</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </SectionCard>

                    {/* 4. Timeline of Activity */}
                    <SectionCard title="Línea de Tiempo de Actividad" icon={IconMap.ChartBarIcon}>
                        <ActivityChart data={entity.timelineActivity} />
                    </SectionCard>
                </div>

                <aside className="lg:col-span-1 space-y-8 sticky top-24">
                    {/* 6. Related Norms / Context */}
                    <SectionCard title="Normativa Relacionada" icon={IconMap.ScaleIcon}>
                         <div className="space-y-3">
                            {entity.relatedNorms.map(norm => (
                                <div key={norm.id} className="p-3 bg-slate-50 rounded-md border border-slate-200 text-sm">
                                    <p className="font-semibold text-slate-800">{norm.title}</p>
                                    <p className="text-xs text-slate-500 font-medium">{norm.relation} ({norm.type})</p>
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    {/* 7. Topics and Subtopics */}
                    <SectionCard title="Temas y Subtemas Asociados" icon={IconMap.BookOpenIcon}>
                        {entity.relatedTopics.map(topic => (
                            <div key={topic.topicSlug}>
                                <Link to={`/dashboard/temas/${topic.topicSlug}`} className="font-semibold text-blue-700 hover:underline">{topic.topicName}</Link>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {topic.subtopics.map(sub => (
                                        <Link key={sub.slug} to={`/dashboard/temas/${topic.topicSlug}/subtemas/${sub.slug}`} className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200">
                                            {sub.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </SectionCard>
                </aside>
            </div>
        </div>
    );
};

export default DashboardEntityDetailPage;