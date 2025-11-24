
import React from 'react';
import { Link } from 'react-router-dom';
import { MINING_SUBSECTIONS } from '../../constants';
import { IconMap } from '../../components/Icons';

const DashboardMiningGazettePage: React.FC = () => {
    return (
        <div className="space-y-12">
            {/* Header Section */}
            <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Boletín Oficial de Minería</h1>
                <p className="mt-4 max-w-3xl mx-auto text-base text-slate-600">
                    El Boletín Oficial de Minería forma parte del Diario Oficial y publica actos relacionados con concesiones mineras, mensuras, sentencias y otros trámites del sector. AIDO interpreta y organiza estas subsecciones para facilitar su comprensión.
                </p>
            </div>

            {/* Subsections Grid */}
            <div className="max-w-5xl mx-auto">
                <p className="mb-8 text-base text-center text-slate-700">Estas son las 16 subsecciones oficiales del Boletín de Minería:</p>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {MINING_SUBSECTIONS.map((subsection) => {
                        const IconComponent = IconMap[subsection.icon];
                        const cardContent = (
                            <>
                                <div className="flex items-center gap-4">
                                    <div className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg ${
                                        subsection.hasContent ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'
                                    }`}>
                                        {IconComponent && <IconComponent className="h-6 w-6" />}
                                    </div>
                                    <h3 className={`font-semibold ${
                                        subsection.hasContent ? 'text-slate-800' : 'text-slate-500'
                                    }`}>
                                        {subsection.name}
                                    </h3>
                                </div>
                                <div className="mt-4 text-sm">
                                    {subsection.hasContent ? (
                                        <>
                                            <p className="font-medium text-green-700">Tiene publicaciones</p>
                                            <p className="text-slate-500 mt-1">AIDO ha identificado publicaciones en esta categoría hoy.</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="font-medium text-slate-500">No hay publicaciones hoy</p>
                                            <p className="text-slate-400 mt-1">No existen publicaciones en esta subsección para la fecha seleccionada.</p>
                                        </>
                                    )}
                                </div>
                            </>
                        );

                        if (subsection.hasContent) {
                            return (
                                <Link 
                                    to={`/dashboard/busqueda?section=boletin-mineria&subsection=${subsection.id}`}
                                    key={subsection.id} 
                                    className="block p-6 bg-white rounded-lg border border-slate-200 transition-all shadow-sm hover:shadow-lg hover:border-blue-300"
                                >
                                    {cardContent}
                                </Link>
                            );
                        }

                        return (
                            <div key={subsection.id} className="p-6 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
                                {cardContent}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Informative Microcopy */}
            <div className="mt-4 text-center max-w-3xl mx-auto">
                <p className="text-sm text-slate-500 p-4 bg-white border border-slate-200 rounded-lg">
                    <strong>Nota:</strong> AIDO interpreta el contenido del Boletín Oficial de Minería para ayudarte a explorar y comprender las publicaciones organizadas por sus categorías formales.
                </p>
            </div>

        </div>
    );
};

export default DashboardMiningGazettePage;