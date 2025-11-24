import React from 'react';
import { Link } from 'react-router-dom';
import { SECTIONS } from '../constants';
import { IconMap } from '../components/Icons';

const SectionsPage: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Secciones del Diario Oficial de Chile</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-xl text-slate-600">
                        El Diario Oficial está organizado en siete secciones formales. AIDO interpreta el contenido de cada una y lo presenta de forma clara y accesible para facilitar su comprensión.
                    </p>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-500">
                        Estas secciones estructuran las publicaciones oficiales del Estado. AIDO identifica la actividad diaria y organiza la información según cada sección para ofrecer una visión clara del contenido legal y administrativo.
                    </p>
                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {SECTIONS.map((section) => {
                        const IconComponent = IconMap[section.icon];
                        return (
                             <div key={section.id} id={section.id} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-slate-200 flex flex-col">
                                <div className="flex items-center gap-4">
                                    {IconComponent && (
                                        <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                            <IconComponent className="h-7 w-7"/>
                                        </div>
                                    )}
                                    <h2 className="text-xl font-bold text-slate-900">{section.name}</h2>
                                </div>
                                <p className="mt-4 text-slate-600 flex-grow">
                                    AIDO identifica y sintetiza las publicaciones relevantes de esta sección, entregando una visión clara y contextualizada del contenido oficial.
                                </p>
                                <div className="mt-6">
                                    <Link 
                                        to={`/search?section=${section.id}`}
                                        className="inline-block w-full text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Ver documentos ({section.docCount})
                                    </Link>
                                </div>
                             </div>
                        );
                    })}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-sm text-slate-500 p-4 bg-white border border-slate-200 rounded-lg max-w-2xl mx-auto">
                        AIDO interpreta información proveniente del Diario Oficial de Chile. Para fines legales, revise siempre la publicación oficial.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SectionsPage;