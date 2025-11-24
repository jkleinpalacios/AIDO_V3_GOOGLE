
import React from 'react';
import { Link } from 'react-router-dom';
import { IconMap } from '../components/Icons';
import DashboardHero from '../components/dashboard/DashboardHero';
import ActionToolbar from '../components/dashboard/ActionToolbar';
import TrackingTabs from '../components/dashboard/TrackingTabs';

// --- MOCK DATA (Enhanced) ---
const dashboardMockData = {
    userName: 'Gabriel Boric Font',
    dailyStatus: {
        date: new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' }),
        activityLevel: 'Alta',
        totalPublications: 489,
    },
    aiSummary: {
        text: 'Hoy, el Diario Oficial presenta alta actividad en temas de Vivienda y Urbanismo, con la publicación de un nuevo reglamento para subsidios DS49. También destaca la Ley 21.643 que modifica el Código del Trabajo.',
        chips: [
            { text: 'Vivienda y Urbanismo', link: '/dashboard/temas/vivienda-y-urbanismo' },
            { text: 'Ley 21.643', link: '/dashboard/entidades/law/21643' },
            { text: 'MINVU', link: '/dashboard/entidades/ministry/minvu' },
        ],
    },
    // Data for Tabs
    favoriteTopics: [
        { name: 'Vivienda y Urbanismo', newDocs: 3, activeSubtopics: ['Subsidios', 'Planes Reguladores'], link: '/dashboard/temas/vivienda-y-urbanismo' },
        { name: 'Minería', newDocs: 5, activeSubtopics: ['Concesiones', 'Seguridad'], link: '/dashboard/temas/mineria' },
        { name: 'Medio Ambiente', newDocs: 1, activeSubtopics: ['Evaluación Ambiental'], link: '/dashboard/temas/medio-ambiente' },
    ],
    entitiesInFocus: [
        { name: 'Ley 21.643', description: 'Modifica el Código del Trabajo', link: '/dashboard/entidades/law/21643' },
        { name: 'DS 49', description: 'Reglamento de Subsidio Habitacional', link: '/dashboard/entidades/decreto/ds-49' },
        { name: 'MINVU', description: '3 publicaciones hoy', link: '/dashboard/entidades/ministry/minvu' },
        { name: 'Carlos Montes', description: 'Ministro Vivienda - 2 firmas hoy', link: '/dashboard/entidades/person/carlos-montes' },
    ],
    recentDocuments: [
        {
            id: '123',
            title: 'Ley 21.643 - Modifica el Código del Trabajo en materia de acoso laboral',
            date: '2023-12-27',
            type: 'Normas Generales',
            summary: 'Introduce un marco preventivo y sancionatorio robusto, obligando a las empresas a adoptar protocolos específicos.',
        },
        {
            id: '201',
            title: 'Decreto Supremo N°12 - Reglamento del Programa de Integración Social',
            date: '2024-01-15',
            type: 'Normas Generales',
            summary: 'Detalla el programa de integración social y territorial, incluyendo los requisitos para postular a los subsidios habitacionales DS49.',
        },
        {
            id: '2722741',
            title: 'Resolución 55/2025 – Declara área de restricción en Estero El Manzano',
            date: '2025-11-15',
            type: 'Normas Particulares',
            summary: 'Declara área de restricción para nuevas extracciones de aguas subterráneas.',
        },
    ],
};


const DashboardPage: React.FC = () => {
    const { PresentationChartLineIcon, RectangleStackIcon, LightBulbIcon } = IconMap;

    return (
        <div className="space-y-8 pb-12">
            
            {/* 1. HERO SECTION: Greeting & High-level AI Summary */}
            <DashboardHero 
                userName={dashboardMockData.userName}
                date={dashboardMockData.dailyStatus.date}
                aiSummary={dashboardMockData.aiSummary}
                stats={dashboardMockData.dailyStatus}
            />

            {/* 2. ACTION TOOLBAR: Quick efficiency tools */}
            <ActionToolbar />

            {/* 3. MAIN GRID: Organized content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* Left Column (Main): Tabbed Interface for Tracking */}
                <div className="lg:col-span-2">
                    <TrackingTabs 
                        topics={dashboardMockData.favoriteTopics}
                        entities={dashboardMockData.entitiesInFocus}
                        documents={dashboardMockData.recentDocuments}
                    />
                </div>

                {/* Right Column (Sidebar): Discovery & Tools */}
                <div className="lg:col-span-1 space-y-6">
                    
                    {/* Discovery Card */}
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white rounded-lg shadow-sm text-indigo-600">
                                {LightBulbIcon && <LightBulbIcon className="h-5 w-5" />}
                            </div>
                            <h3 className="font-bold text-indigo-900">Sugerencias AIDO</h3>
                        </div>
                        <p className="text-sm text-indigo-800 mb-4">
                            Basado en tu interés en <strong>Minería</strong>, te sugerimos revisar las nuevas resoluciones sobre <em>Derechos de Agua</em> publicadas hoy.
                        </p>
                        <Link to="/dashboard/temas" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-wide">
                            Explorar Temas Relacionados &rarr;
                        </Link>
                    </div>

                    {/* History Access (New Feature Promotion) */}
                    <Link to="/dashboard/explorador" className="block bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-100 rounded-lg text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                    {PresentationChartLineIcon && <PresentationChartLineIcon className="h-6 w-6" />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">Explorador Temporal</h3>
                                    <p className="text-xs text-slate-500 mt-0.5">Ver historial y tendencias</p>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* DO Sections Quick Link */}
                    <Link to="/dashboard/secciones" className="block bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-100 rounded-lg text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                    {RectangleStackIcon && <RectangleStackIcon className="h-6 w-6" />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">Secciones del DO</h3>
                                    <p className="text-xs text-slate-500 mt-0.5">Navegación tradicional</p>
                                </div>
                            </div>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
