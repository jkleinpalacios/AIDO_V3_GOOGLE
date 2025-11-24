
import React from 'react';
import { Link } from 'react-router-dom';
import { MINING_SUBSECTIONS } from '../../constants';
import { IconMap } from '../Icons';

const MiningGazetteWidget: React.FC = () => {
    const activeSubsections = MINING_SUBSECTIONS.filter(sub => sub.hasContent);
    const { CubeTransparentIcon } = IconMap;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full">
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                     {CubeTransparentIcon && <CubeTransparentIcon className="h-5 w-5" />}
                </div>
                <div>
                    <h3 className="font-bold text-slate-900">Foco Minero</h3>
                    <p className="text-sm text-slate-500">Actividad del Boletín Oficial</p>
                </div>
            </div>
            
            <div className="p-6 flex-grow">
                {activeSubsections.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {activeSubsections.map(sub => (
                            <Link 
                                key={sub.id}
                                to={`/dashboard/busqueda?section=boletin-mineria&subsection=${sub.id}`}
                                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-orange-50 text-orange-800 border border-orange-100 hover:bg-orange-100 hover:border-orange-200 transition-colors"
                            >
                                {sub.name}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-slate-500 italic">Sin actividad destacada hoy.</p>
                )}
                <div className="mt-6">
                    <p className="text-xs text-slate-500 leading-relaxed">
                        Hoy se han publicado pedimentos y sentencias de exploración en las regiones de Atacama y Antofagasta.
                    </p>
                </div>
            </div>
             <div className="bg-slate-50 p-4 text-center border-t border-slate-100 rounded-b-xl mt-auto">
                <Link to="/dashboard/boletin-minero" className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline">
                    Explorar Boletín Minero &rarr;
                </Link>
            </div>
        </div>
    );
};

export default MiningGazetteWidget;
