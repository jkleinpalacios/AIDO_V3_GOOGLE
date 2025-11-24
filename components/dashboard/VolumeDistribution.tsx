
import React from 'react';
import { Link } from 'react-router-dom';
import { SECTIONS } from '../../constants';

const VolumeDistribution: React.FC = () => {
    // Mocking daily counts slightly different from constants to show "today's" specific data
    const dailyCounts = [
        { id: 'normas-generales', count: 12, color: 'bg-blue-500' },
        { id: 'normas-particulares', count: 45, color: 'bg-indigo-500' },
        { id: 'judiciales', count: 153, color: 'bg-slate-600' },
        { id: 'avisos-destacados', count: 8, color: 'bg-amber-500' },
        { id: 'empresas-cooperativas', count: 210, color: 'bg-emerald-500' },
        { id: 'marcas-patentes', count: 88, color: 'bg-cyan-500' },
        { id: 'boletin-mineria', count: 34, color: 'bg-orange-500' },
    ];

    const maxCount = Math.max(...dailyCounts.map(c => c.count));

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
                <h3 className="font-bold text-slate-900">Radiografía de la Edición</h3>
                <p className="text-sm text-slate-500">Volumen de documentos por sección hoy</p>
            </div>
            <div className="p-6 space-y-5">
                {SECTIONS.map(section => {
                    const stats = dailyCounts.find(c => c.id === section.id) || { count: 0, color: 'bg-slate-300' };
                    const percentage = Math.max((stats.count / maxCount) * 100, 2); // Min width 2% for visibility

                    return (
                        <Link to={`/dashboard/busqueda?section=${section.id}`} key={section.id} className="group block">
                            <div className="flex justify-between items-center mb-1.5">
                                <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700 transition-colors truncate pr-4">
                                    {section.name}
                                </span>
                                <span className="text-xs font-bold text-slate-500 group-hover:text-blue-600">
                                    {stats.count} docs
                                </span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                <div 
                                    className={`h-full rounded-full ${stats.color} opacity-80 group-hover:opacity-100 transition-all duration-500 ease-out`}
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                <Link to="/dashboard/secciones" className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline">
                    Ver desglose completo &rarr;
                </Link>
            </div>
        </div>
    );
};

export default VolumeDistribution;
