
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconMap } from '../../components/Icons';
import { EXPLORABLE_TOPICS } from '../../constants';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    TooltipProps
} from 'recharts';

// --- MOCK DATA ---

// Hitos históricos
const milestones = [
    { id: 1, date: '2024-05-28', title: 'Modificación al sistema de subsidios habitacionales (DS01)', type: 'Decreto', impact: 'Alto', topic: 'Vivienda y Urbanismo' },
    { id: 2, date: '2024-03-01', title: 'Ley 21.643 sobre Acoso Laboral entra en plena vigencia', type: 'Ley', impact: 'Crítico', topic: 'Derecho Laboral' },
    { id: 3, date: '2023-12-27', title: 'Promulgación Ley 21.643 (Ley Karin)', type: 'Ley', impact: 'Crítico', topic: 'Derecho Laboral' },
    { id: 4, date: '2023-11-15', title: 'Nueva Norma de Emisión para termoeléctricas', type: 'Decreto', impact: 'Medio', topic: 'Medio Ambiente' },
];

// Datos para el gráfico interactivo
// Simulamos datos de los últimos 12 meses con desglose por tema
const historicalData = [
    { name: 'Ene', total: 420, vivienda: 120, mineria: 80, laboral: 60, ambiental: 40 },
    { name: 'Feb', total: 380, vivienda: 110, mineria: 70, laboral: 50, ambiental: 35 },
    { name: 'Mar', total: 550, vivienda: 150, mineria: 90, laboral: 120, ambiental: 50 },
    { name: 'Abr', total: 490, vivienda: 130, mineria: 85, laboral: 80, ambiental: 45 },
    { name: 'May', total: 520, vivienda: 140, mineria: 100, laboral: 70, ambiental: 60 },
    { name: 'Jun', total: 580, vivienda: 160, mineria: 110, laboral: 90, ambiental: 55 },
    { name: 'Jul', total: 510, vivienda: 135, mineria: 95, laboral: 75, ambiental: 48 },
    { name: 'Ago', total: 540, vivienda: 145, mineria: 105, laboral: 85, ambiental: 52 },
    { name: 'Sep', total: 480, vivienda: 125, mineria: 80, laboral: 70, ambiental: 40 },
    { name: 'Oct', total: 600, vivienda: 170, mineria: 120, laboral: 100, ambiental: 65 },
    { name: 'Nov', total: 590, vivienda: 165, mineria: 115, laboral: 95, ambiental: 60 },
    { name: 'Dic', total: 620, vivienda: 180, mineria: 130, laboral: 110, ambiental: 70 },
];

// Configuración de métricas para el filtro
const metrics = [
    { key: 'total', label: 'Actividad Total', color: '#2563eb' }, // Blue-600
    { key: 'vivienda', label: 'Vivienda y Urbanismo', color: '#0891b2' }, // Cyan-600
    { key: 'mineria', label: 'Minería', color: '#d97706' }, // Amber-600
    { key: 'laboral', label: 'Laboral', color: '#7c3aed' }, // Violet-600
    { key: 'ambiental', label: 'Medio Ambiente', color: '#059669' }, // Emerald-600
];

// Custom Tooltip Component
const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-lg text-sm">
                <p className="font-bold text-slate-900 mb-1">{label}</p>
                <p className="text-slate-600">
                    <span className="font-semibold" style={{ color: payload[0].color }}>
                        {payload[0].value}
                    </span> documentos
                </p>
            </div>
        );
    }
    return null;
};

const DashboardTimelinePage: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [activeMetric, setActiveMetric] = useState('total');
    const { PresentationChartLineIcon, CalendarDaysIcon, ClockIcon, ArrowRightIcon, AdjustmentsHorizontalIcon } = IconMap;

    // Obtener configuración de la métrica activa
    const currentMetricConfig = metrics.find(m => m.key === activeMetric) || metrics[0];

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Explorador Temporal</h1>
                <p className="mt-2 text-slate-600 max-w-3xl">
                    Transforma la información histórica en conocimiento. AIDO te permite navegar en el tiempo, analizar la evolución de normas y consultar ediciones pasadas del Diario Oficial.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Tools */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* 1. Interactive Activity Timeline Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                {PresentationChartLineIcon && <PresentationChartLineIcon className="h-5 w-5 text-blue-600" />}
                                Evolución Normativa (Último Año)
                            </h2>
                            
                            {/* Filter Controls */}
                            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                                {metrics.map((m) => (
                                    <button
                                        key={m.key}
                                        onClick={() => setActiveMetric(m.key)}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap border ${
                                            activeMetric === m.key
                                                ? 'bg-slate-900 text-white border-slate-900'
                                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                        }`}
                                    >
                                        {m.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        {/* Recharts Container */}
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={historicalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={currentMetricConfig.color} stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor={currentMetricConfig.color} stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis 
                                        dataKey="name" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#64748b', fontSize: 12 }} 
                                        dy={10}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#64748b', fontSize: 12 }} 
                                    />
                                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                                    <Area 
                                        type="monotone" 
                                        dataKey={activeMetric} 
                                        stroke={currentMetricConfig.color} 
                                        strokeWidth={3}
                                        fillOpacity={1} 
                                        fill="url(#colorMetric)" 
                                        animationDuration={1000}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 flex justify-end">
                             <p className="text-xs text-slate-400 flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentMetricConfig.color }}></span>
                                Mostrando: <strong>{currentMetricConfig.label}</strong>
                             </p>
                        </div>
                    </div>

                    {/* 2. Historical Milestones */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                {ClockIcon && <ClockIcon className="h-5 w-5 text-blue-600" />}
                                Hitos Normativos Relevantes
                            </h2>
                            <button className="text-sm text-blue-600 hover:underline font-medium">Ver todo</button>
                        </div>
                        
                        <div className="relative border-l-2 border-slate-200 ml-3 space-y-8">
                            {milestones.map((milestone) => (
                                <div key={milestone.id} className="relative pl-8">
                                    {/* Dot */}
                                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-sm ring-4 ring-blue-50"></div>
                                    
                                    {/* Content */}
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 group cursor-pointer">
                                        <div className="flex-1">
                                            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1 block">{milestone.date}</span>
                                            <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                                                <Link to={`/dashboard/busqueda?q=${encodeURIComponent(milestone.title)}`}>{milestone.title}</Link>
                                            </h3>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full border border-slate-200">{milestone.type}</span>
                                                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full border border-slate-200">{milestone.topic}</span>
                                                {milestone.impact === 'Crítico' && <span className="px-2 py-0.5 bg-red-50 text-red-700 text-xs font-medium rounded-full border border-red-100">Impacto Crítico</span>}
                                            </div>
                                        </div>
                                        <div className="self-start opacity-0 group-hover:opacity-100 transition-opacity text-blue-600">
                                            {ArrowRightIcon && <ArrowRightIcon className="h-5 w-5" />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Time Machine & Filters */}
                <div className="lg:col-span-1 space-y-8">
                    
                    {/* Time Machine Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-6 rounded-xl shadow-sm">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
                                {CalendarDaysIcon && <CalendarDaysIcon className="h-6 w-6" />}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Máquina del Tiempo</h3>
                                <p className="text-sm text-blue-800 mt-1 leading-snug">Consulta la edición completa de un día específico en el pasado.</p>
                            </div>
                        </div>
                        
                        <div className="space-y-3">
                            <div>
                                <label htmlFor="history-date" className="block text-xs font-semibold text-slate-500 uppercase mb-1">Seleccionar Fecha</label>
                                <input 
                                    type="date" 
                                    id="history-date"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm shadow-sm"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                />
                            </div>
                            <Link 
                                to={selectedDate ? `/dashboard/resumen-diario?date=${selectedDate}` : '#'}
                                className={`flex items-center justify-center w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all ${
                                    selectedDate 
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg' 
                                    : 'bg-blue-200 text-blue-400 cursor-not-allowed'
                                }`}
                                onClick={(e) => !selectedDate && e.preventDefault()}
                            >
                                Ir a esa fecha
                            </Link>
                        </div>
                    </div>

                    {/* Topic Filter for History */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-2 mb-4">
                            {AdjustmentsHorizontalIcon && <AdjustmentsHorizontalIcon className="h-5 w-5 text-slate-400" />}
                            <h3 className="font-semibold text-slate-900">Filtrar Historia por Tema</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {EXPLORABLE_TOPICS.slice(0, 8).map(topic => (
                                <button 
                                    key={topic.slug} 
                                    onClick={() => setActiveMetric(topic.slug === 'vivienda-y-urbanismo' ? 'vivienda' : (topic.slug === 'mineria' ? 'mineria' : (topic.slug === 'laboral' ? 'laboral' : (topic.slug === 'medio-ambiente' ? 'ambiental' : 'total'))))}
                                    className="px-3 py-1.5 text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200 rounded-full hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all"
                                >
                                    {topic.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Insight Note */}
                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                        <p className="text-xs text-amber-800 leading-relaxed">
                            <strong>¿Sabías que?</strong> AIDO archiva y estructura cada día del Diario Oficial desde 2020. Incluso si una norma es antigua, nuestra IA puede relacionarla con documentos actuales para darte contexto histórico automático.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DashboardTimelinePage;
