import React from 'react';
import { Link } from 'react-router-dom';
import { SECTIONS, MINING_SUBSECTIONS } from '../constants';
import { IconMap } from '../components/Icons';

const DailySummaryPage: React.FC = () => {
    const { SparklesIcon } = IconMap;
    const today = new Date();
    const editionNumber = '43.733';
    const summary = 'La edición de hoy incluye publicaciones relevantes en diversas áreas. AIDO ha identificado como destacada la Ley N° 21.643, que modifica el Código del Trabajo en materia de acoso laboral. Además, se observa una alta actividad en la constitución de Sociedades por Acciones. El Boletín Minero presenta sentencias de exploración y la nómina de concesiones para remate.';

    return (
        <div className="bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Encabezado */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Resumen Diario del Diario Oficial</h1>
                    <p className="mt-3 text-lg font-semibold text-blue-600">
                        {today.toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600">
                        Síntesis generada por inteligencia artificial basada en la edición oficial N° {editionNumber} publicada en esta fecha.
                    </p>
                    <p className="mt-2 max-w-3xl mx-auto text-md text-slate-500">
                        AIDO identifica y sintetiza automáticamente las publicaciones más relevantes y las organiza por sección, facilitando una visión clara y accesible del día.
                    </p>
                    <div className="mt-8">
                        <a href="#" className="inline-block px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-slate-700 hover:bg-slate-800 transition-colors">
                            Descargar Sumario Oficial (PDF del DO)
                        </a>
                        <p className="mt-2 text-xs text-slate-500">Documento emitido por el Diario Oficial de Chile.</p>
                    </div>
                </div>

                {/* Síntesis General IA */}
                <div className="mb-16 max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-slate-200">
                    <div className="text-center">
                         <h2 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-3 mb-2">
                            {SparklesIcon && <SparklesIcon className="h-8 w-8 text-blue-500" />}
                            Síntesis General
                        </h2>
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Interpretación generada por IA</p>
                    </div>
                    <p className="mb-4 text-slate-600 text-center">AIDO analiza el contenido oficial del Diario Oficial y genera una síntesis objetiva basada en las publicaciones del día.</p>
                    <div className="bg-slate-50 border-t border-b border-slate-200 py-4 px-6 my-4">
                        <p className="text-slate-700 text-lg text-center">{summary}</p>
                    </div>
                    <p className="mt-6 text-xs text-slate-500 italic text-center">Esta interpretación es un apoyo informativo. Para efectos legales, consulte siempre el documento oficial.</p>
                </div>

                {/* Publicaciones por Sección */}
                <div className="mb-16">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-slate-900">Publicaciones por Sección</h2>
                        <p className="mt-2 text-lg text-slate-600 max-w-2xl mx-auto">Clasificación según las siete secciones oficiales del Diario Oficial:</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {SECTIONS.map((section) => {
                             const IconComponent = IconMap[section.icon];
                             return(
                                <Link to={`/search?section=${section.id}`} key={section.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-slate-200 group">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            {IconComponent && (
                                                <div className="flex-shrink-0 h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors duration-200">
                                                    <IconComponent className="h-6 w-6"/>
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-semibold text-slate-800">{section.name}</p>
                                                <p className="text-xs text-slate-500">Interpretación IA de actividad del día.</p>
                                            </div>
                                        </div>
                                        <span className="text-lg font-bold text-blue-600 bg-blue-50 group-hover:bg-blue-100 px-3 py-1 rounded-full transition-colors duration-200">{section.docCount}</span>
                                    </div>
                                </Link>
                             );
                        })}
                    </div>
                </div>

                {/* Detalle del Boletín Minero */}
                <div>
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-slate-900">Detalle del Boletín Oficial de Minería</h2>
                        <p className="mt-2 text-lg text-slate-600 max-w-3xl mx-auto">AIDO interpreta la actividad del Boletín Oficial de Minería, identificando las subsecciones con publicaciones en la edición diaria.</p>
                    </div>
                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-slate-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
                            {MINING_SUBSECTIONS.map(sub => (
                                <div key={sub.id} className="flex items-center gap-3">
                                    <div className={`h-2.5 w-2.5 rounded-full ${sub.hasContent ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                                    <p className={`text-sm ${sub.hasContent ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>{sub.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DailySummaryPage;