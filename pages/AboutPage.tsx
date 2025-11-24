import React from 'react';
import { IconMap } from '../components/Icons';

const AboutPage: React.FC = () => {
    const { DocumentTextIcon, SparklesIcon, AcademicCapIcon } = IconMap;

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                {/* Header Section */}
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
                        ¿Qué es AIDO?
                    </h1>
                    <p className="mt-4 text-xl text-slate-600">
                        AIDO es una plataforma de inteligencia artificial diseñada para interpretar y explicar la información oficial del Estado publicada en el Diario Oficial de Chile.
                    </p>
                </div>

                {/* Introductory Text */}
                <div className="mt-10 max-w-4xl mx-auto prose prose-lg prose-slate text-center">
                    <p>
                        El Diario Oficial contiene las leyes, decretos, resoluciones, avisos y publicaciones oficiales del Estado. Su contenido es fundamental, pero puede ser extenso y complejo. AIDO utiliza inteligencia artificial para interpretar esta información y presentarla de forma clara, organizada y accesible para ciudadanos, empresas y profesionales.
                    </p>
                    <p className="font-semibold text-slate-800">
                        AIDO no modifica ni reemplaza la información oficial: la interpreta, entrega contexto y facilita su comprensión.
                    </p>
                </div>

                {/* Interpretation Process Section */}
                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">Nuestro Proceso de Interpretación</h2>
                    <div className="grid md:grid-cols-3 gap-12 text-center items-start max-w-6xl mx-auto">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-16 w-16 bg-blue-100 text-blue-600 rounded-full ring-8 ring-blue-50">
                                <DocumentTextIcon className="h-8 w-8" />
                            </div>
                            <h3 className="mt-6 text-lg font-semibold text-slate-900">1. Ingesta de Información Oficial</h3>
                            <p className="mt-2 text-slate-600">Procesamos diariamente las publicaciones del Diario Oficial, extrayendo su contenido y metadatos para su análisis.</p>
                        </div>
                         <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-16 w-16 bg-blue-100 text-blue-600 rounded-full ring-8 ring-blue-50">
                                <SparklesIcon className="h-8 w-8" />
                            </div>
                            <h3 className="mt-6 text-lg font-semibold text-slate-900">2. Análisis y Enriquecimiento con IA</h3>
                            <p className="mt-2 text-slate-600">La IA de AIDO identifica entidades legales, conceptos clave, temas, relaciones y estructura jurídica. Genera resúmenes, clasifica documentos y facilita su comprensión.</p>
                        </div>
                         <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-16 w-16 bg-blue-100 text-blue-600 rounded-full ring-8 ring-blue-50">
                                <AcademicCapIcon className="h-8 w-8" />
                            </div>
                            <h3 className="mt-6 text-lg font-semibold text-slate-900">3. Organización y Presentación</h3>
                            <p className="mt-2 text-slate-600">Presentamos la información de forma clara y contextualizada, permitiendo consultas en lenguaje natural, navegación temática y exploración guiada del contenido oficial.</p>
                        </div>
                    </div>
                </div>

                {/* Transparency Section */}
                <div className="mt-24 bg-slate-50 border border-slate-200 rounded-xl p-8 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 text-center">Transparencia y Relación con el Diario Oficial</h2>
                    <p className="mt-4 text-slate-700 text-center">
                        AIDO utiliza como fuente el Diario Oficial de Chile. Toda la información interpretada proviene de sus publicaciones oficiales. AIDO no es un medio oficial ni reemplaza las comunicaciones legales del Estado. Su objetivo es facilitar la comprensión y el acceso ciudadano a la información pública.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default AboutPage;