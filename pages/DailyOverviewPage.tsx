
import React from 'react';
import { Link } from 'react-router-dom';
import { IconMap } from '../components/Icons';
import EmptyState from '../components/EmptyState';

const mockData = {
    dailyStatus: {
        date: new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' }),
        activityLevel: 'Alta',
        totalPublications: 489,
        topSections: ['Empresas y Cooperativas', 'Publicaciones Judiciales'],
    },
    relevantPublications: [
        { id: '301', title: 'Resolución Exenta N° 345 - Llama a postulación para subsidio habitacional DS49', section: 'Avisos Destacados', summary: 'El MINVU abre el proceso de postulación para el subsidio DS49, enfocado en familias vulnerables para la adquisición de viviendas sin crédito hipotecario.' },
        { id: '302', title: 'Nómina de concesiones mineras para remate en Atacama', section: 'Boletín Oficial de Minería', summary: 'Se publica la lista oficial de concesiones mineras que serán subastadas en la Región de Atacama por no pago de patentes.' },
        { id: '303', title: 'Modificación a la Ley General de Urbanismo y Construcciones', section: 'Normas Generales', summary: 'Decreto que ajusta los requisitos para la construcción de viviendas de interés social en zonas urbanas, flexibilizando densidades.' },
    ],
    favoriteTopics: [
        { name: 'Vivienda y Urbanismo', newDocs: 3, icon: '🏘️' },
        { name: 'Minería', newDocs: 8, icon: '⛏️' },
        { name: 'Medio Ambiente', newDocs: 1, icon: '🌱' },
    ],
};

const DailyOverviewPage: React.FC = () => {
    const { ChartBarIcon, DocumentDuplicateIcon, SparklesIcon } = IconMap;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Resumen Diario Personalizado</h1>
                <p className="mt-1 text-slate-600">Síntesis generada por IA basada en tus temas favoritos y actividad reciente en el Diario Oficial.</p>
            </div>

            {/* Daily Status */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
                <div className="lg:col-span-1">
                    <h3 className="font-semibold text-slate-800">Estado del Diario Oficial Hoy</h3>
                    <p className="text-sm text-slate-500">{mockData.dailyStatus.date}</p>
                </div>
                <div className="flex items-center gap-4">
                    {ChartBarIcon && <ChartBarIcon className="h-8 w-8 text-blue-500" />}
                    <div>
                        <p className="text-sm text-slate-600">Nivel de Actividad</p>
                        <p className="font-bold text-lg text-slate-900">{mockData.dailyStatus.activityLevel}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {DocumentDuplicateIcon && <DocumentDuplicateIcon className="h-8 w-8 text-blue-500" />}
                    <div>
                        <p className="text-sm text-slate-600">Publicaciones Totales</p>
                        <p className="font-bold text-lg text-slate-900">{mockData.dailyStatus.totalPublications}</p>
                    </div>
                </div>
                <div className="md:col-start-2 lg:col-start-4">
                    <Link to="/summary" className="w-full text-center block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                        Ver edición de hoy
                    </Link>
                </div>
            </div>

            {/* Relevant Publications */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Publicaciones relevantes para ti</h2>
                {mockData.relevantPublications.length > 0 ? (
                    <div className="space-y-4">
                        {mockData.relevantPublications.map(doc => (
                            <Link to={`/dashboard/documentos/${doc.id}`} key={doc.id} className="block p-4 border border-slate-200 rounded-lg hover:border-blue-400 hover:bg-slate-50 transition-all">
                                <p className="font-semibold text-blue-700">{doc.title}</p>
                                <p className="text-sm text-slate-600 my-1 flex items-start gap-2">
                                    {SparklesIcon && <SparklesIcon className="h-4 w-4 flex-shrink-0 mt-0.5 text-blue-500" />}
                                    <span className="italic">"{doc.summary}"</span>
                                </p>
                                <span className="text-xs font-medium text-slate-500 mt-2 block">{doc.section}</span>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        title="Sin publicaciones relevantes hoy"
                        message="No se han encontrado publicaciones en el Diario Oficial de hoy que coincidan con tus temas de interés."
                        icon="InboxIcon"
                    />
                )}
            </div>

            {/* Favorite Topics Today */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Tus Temas Hoy</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockData.favoriteTopics.map(topic => (
                        <Link to={`/topic/${topic.name.toLowerCase().replace(/ /g, '-')}`} key={topic.name} className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                            <div className="text-2xl">{topic.icon}</div>
                            <div>
                                <h3 className="font-semibold text-slate-800">{topic.name}</h3>
                                <p className="text-sm text-slate-600">{topic.newDocs} documentos hoy</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DailyOverviewPage;