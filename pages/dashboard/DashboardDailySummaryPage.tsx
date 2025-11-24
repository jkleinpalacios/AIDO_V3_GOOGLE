
import React, { useState } from 'react';
import { IconMap } from '../../components/Icons';

const DashboardDailySummaryPage: React.FC = () => {
    const { SparklesIcon, CalendarDaysIcon } = IconMap;
    const [activeTab, setActiveTab] = useState('Diario Oficial');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const tabs = [
        'Diario Oficial',
        'Contraloría',
        'SII',
        'Congreso',
        'Superintendencias'
    ];

    const getDescription = (tab: string) => {
        switch (tab) {
            case 'Diario Oficial': return 'Genera un resumen ejecutivo de leyes, decretos y publicaciones legales de hoy.';
            case 'Contraloría': return 'Sintetiza los dictámenes y tomas de razón más recientes publicados por la CGR.';
            case 'SII': return 'Resumen de circulares, resoluciones y oficios tributarios del día.';
            case 'Congreso': return 'Estado diario de proyectos de ley, tablas de sesiones y urgencias legislativas.';
            case 'Superintendencias': return 'Normas de carácter general y oficios de CMF, Super de Pensiones y Salud.';
            default: return '';
        }
    };

    const handleGenerate = () => {
        // En una implementación real, esto enviaría el prompt al chat
        console.log(`Generando sumario para ${activeTab} fecha ${selectedDate}`);
        alert(`Solicitud enviada al chat: Generar sumario de ${activeTab} del ${selectedDate}`);
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-slate-900">Sumarios Oficiales</h1>
                <p className="mt-2 text-slate-600">
                    Selecciona una fuente oficial y deja que AIDO procese y explique la actividad del día.
                </p>
            </div>

            {/* Pestañas estilo BOE AI */}
            <div className="flex justify-center border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar">
                <div className="flex space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                                activeTab === tab
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Área de Acción */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-xl font-semibold text-slate-900 mb-2">{activeTab}</h2>
                    <p className="text-sm text-slate-500">
                        {getDescription(activeTab)}
                    </p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Fecha del Sumario</label>
                        <div className="relative">
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="block w-full pl-4 pr-10 py-3 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                {CalendarDaysIcon && <CalendarDaysIcon className="h-5 w-5 text-slate-400" />}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                    >
                        {SparklesIcon && <SparklesIcon className="h-5 w-5" />}
                        Generar Sumario
                    </button>
                    
                    <p className="text-xs text-center text-slate-400 mt-4">
                        AIDO analizará los documentos y te entregará el resultado en el chat.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardDailySummaryPage;
