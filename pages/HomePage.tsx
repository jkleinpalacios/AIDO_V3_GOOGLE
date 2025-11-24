
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconMap } from '../components/Icons';

// FAQ Item Component
const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { ChevronDownIcon } = IconMap;

    return (
        <div className="border-b border-slate-200 py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left"
            >
                <span className="text-lg font-medium text-slate-800">{question}</span>
                <ChevronDownIcon className={`h-6 w-6 text-slate-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="mt-4 text-slate-600">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};


const HomePage: React.FC = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.scrollTo) {
            const element = document.getElementById(location.state.scrollTo);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }, [location.state]);


    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/login?query=${encodeURIComponent(query)}`);
        } else {
            navigate('/login');
        }
    };
    
    const {
        SearchIcon,
        SparklesIcon,
        DocumentTextIcon,
        AcademicCapIcon,
        ClockIcon,
        BellIcon,
        UserGroupIcon,
        BuildingOfficeIcon,
        UserCircleIcon,
        UsersIcon,
        BookOpenIcon,
        RectangleStackIcon
    } = IconMap;

    const useCases = [
        { Icon: ClockIcon, title: "Sigue una ley o decreto en el tiempo", text: "AIDO muestra todas las modificaciones, derogaciones y documentos relacionados para entender cómo ha evolucionado una norma." },
        { Icon: BellIcon, title: "Alertas sobre temas que te interesan", text: "Configura alertas para que AIDO te avise cuando el Diario Oficial publique algo relacionado con tus temas, leyes o instituciones seguidas." },
        { Icon: UserGroupIcon, title: "Impacto de una publicación", text: "AIDO identifica los grupos potencialmente afectados: ciudadanos, empresas, municipios o sectores específicos." },
        { Icon: BookOpenIcon, title: "Temas complejos de manera clara", text: "Vivienda, minería, medio ambiente, empresas… AIDO reúne toda la actividad regulatoria en cada ámbito." },
        { Icon: BuildingOfficeIcon, title: "Actividad de un organismo público", text: "Monitorea publicaciones de servicios del Estado como MOP, MINVU, DGA, SII, SUBTEL, etc." },
        { Icon: RectangleStackIcon, title: "Conexiones entre documentos oficiales", text: "AIDO identifica relaciones entre normas, resoluciones, avisos y decretos, entregando un contexto completo." }
    ];

    const forWhom = [
        { Icon: UserCircleIcon, title: "Ciudadanos", text: "Información clara para comprender leyes y anuncios." },
        { Icon: BuildingOfficeIcon, title: "Empresas", text: "Seguimiento de normativas relevantes para su actividad." },
        { Icon: UsersIcon, title: "Municipios", text: "Detección rápida de publicaciones que afectan a su territorio." },
        { Icon: AcademicCapIcon, title: "Profesionales", text: "Análisis detallados, documentos relacionados e historial normativo." },
    ];

    const faqItems = [
        { question: "¿De dónde proviene la información?", answer: "AIDO utiliza exclusivamente el contenido oficial del Diario Oficial de Chile." },
        { question: "¿AIDO reemplaza al Diario Oficial?", answer: "No. AIDO interpreta la información oficial para facilitar su comprensión, pero no reemplaza las publicaciones legales." },
        { question: "¿La interpretación de AIDO es oficial?", answer: "No. Es un apoyo informativo basado en IA." },
        { question: "¿Qué puedo hacer dentro del dashboard?", answer: "Puedes consultar resúmenes personalizados, seguir temas, guardar documentos y crear alertas." },
        { question: "¿Necesito una cuenta para usar AIDO?", answer: "Para acceder a herramientas completas como búsquedas inteligentes, alertas y documentos guardados, necesitas iniciar sesión." },
    ];

    return (
        <div className="bg-white">
            {/* 1) Hero Section */}
            <section className="h-screen min-h-[700px] bg-slate-50 flex flex-col items-center justify-center p-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Información oficial del Estado, explicada con inteligencia artificial.
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-600">
                        AIDO interpreta y organiza las publicaciones del Diario Oficial para que cualquier persona pueda entender el contenido oficial de forma clara y accesible.
                    </p>
                    <div className="mt-12 w-full max-w-2xl mx-auto">
                        <form onSubmit={handleSearchSubmit} className="relative">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                <SearchIcon className="h-6 w-6 text-slate-400" />
                            </div>
                            <input
                                type="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Pregúntame sobre información del Estado…"
                                className="w-full pl-16 pr-48 py-5 text-lg border-2 border-slate-300 rounded-full focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
                                aria-label="Buscar con AIDO"
                            />
                            <button
                                type="submit"
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-200 text-base"
                            >
                                Buscar con AIDO
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* 2) What is AIDO Section */}
            <section id="about" className="py-20 md:py-24 bg-[url('/textures/paper_texture_light.png')] bg-repeat bg-top scroll-mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">¿Qué es AIDO?</h2>
                        <p className="mt-4 text-lg text-slate-600">
                           AIDO es una plataforma que utiliza inteligencia artificial para interpretar el contenido del Diario Oficial de Chile. No reemplaza al Diario Oficial: entrega resúmenes, contexto y explicaciones para facilitar la comprensión de la información oficial.
                        </p>
                    </div>
                    <div className="mt-16 grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                        <div className="text-center">
                            <SparklesIcon className="h-10 w-10 mx-auto text-blue-600" />
                            <h3 className="mt-4 text-xl font-semibold text-slate-800">Interpretación IA</h3>
                            <p className="mt-2 text-slate-600">Resúmenes claros de documentos oficiales.</p>
                        </div>
                        <div className="text-center">
                            <BookOpenIcon className="h-10 w-10 mx-auto text-blue-600" />
                            <h3 className="mt-4 text-xl font-semibold text-slate-800">Contexto y claridad</h3>
                            <p className="mt-2 text-slate-600">Identifica conceptos clave, entidades, impacto y relaciones.</p>
                        </div>
                         <div className="text-center">
                            <DocumentTextIcon className="h-10 w-10 mx-auto text-blue-600" />
                            <h3 className="mt-4 text-xl font-semibold text-slate-800">Acceso a documentos oficiales</h3>
                            <p className="mt-2 text-slate-600">Enlaza siempre a las publicaciones originales del DO.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3) How AIDO Works Section */}
            <section id="how-it-works" className="py-20 md:py-24 bg-[url('/textures/paper_texture_light.png')] bg-repeat bg-top scroll-mt-16">
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">¿Cómo funciona AIDO?</h2>
                        <p className="mt-4 text-lg text-slate-600">AIDO transforma información legal compleja en conocimiento claro y accesible.</p>
                    </div>
                    <div className="mt-16 grid md:grid-cols-4 gap-8 items-start text-center max-w-6xl mx-auto">
                         {[{Icon: DocumentTextIcon, title: "DO", text: "AIDO ingresa diariamente el contenido del Diario Oficial."}, {Icon: SparklesIcon, title: "IA", text: "La inteligencia artificial analiza el lenguaje, entidades, temas y relaciones."}, {Icon: RectangleStackIcon, title: "Organización", text: "Clasifica documentos por temas, impacto, secciones y organismos."}, {Icon: AcademicCapIcon, title: "Comprensión", text: "Genera resúmenes claros, análisis y visualizaciones."}].map((step, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="flex items-center justify-center h-16 w-16 bg-blue-100 text-blue-600 rounded-full ring-8 ring-white">
                                    <step.Icon className="h-8 w-8" />
                                </div>
                                <h3 className="mt-6 text-lg font-semibold text-slate-900">{step.title}</h3>
                                <p className="mt-2 text-slate-600">{step.text}</p>
                            </div>
                         ))}
                    </div>
                 </div>
            </section>

            {/* 4) Real Use Cases Section */}
            <section className="py-20 md:py-24 bg-[url('/textures/paper_texture_light.png')] bg-repeat bg-top">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Ejemplos de uso reales</h2>
                        <p className="mt-4 text-lg text-slate-600">AIDO está diseñado para resolver necesidades reales de información oficial para ciudadanos, empresas, municipios y profesionales.</p>
                    </div>
                    <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {useCases.map(({ Icon, title, text }, index) => {
                            const [firstWord, ...restOfTitle] = title.split(' ');
                            return (
                                <div key={index} className="bg-white/70 backdrop-blur-sm p-8 rounded-xl border border-slate-200 flex flex-col items-start text-left shadow-sm">
                                    <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                        <Icon className="h-7 w-7"/>
                                    </div>
                                    <h3 className="mt-6 text-xl font-semibold text-slate-800">
                                        <span className="border-b-2 border-blue-600 pb-0.5">{firstWord}</span>
                                        {' '}
                                        {restOfTitle.join(' ')}
                                    </h3>
                                    <p className="mt-3 text-slate-600 flex-grow">{text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 5) Who is AIDO for Section */}
            <section className="py-20 md:py-24 bg-[url('/textures/paper_texture_light.png')] bg-repeat bg-top">
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">¿Para quién es AIDO?</h2>
                    </div>
                    <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
                        {forWhom.map(({ Icon, title, text }) => (
                            <div key={title} className="bg-white p-6 rounded-lg border border-slate-200 text-center shadow-sm">
                                <Icon className="h-10 w-10 mx-auto text-blue-600" />
                                <h3 className="mt-4 text-xl font-semibold text-slate-800">{title}</h3>
                                <p className="mt-2 text-slate-600">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* 6) FAQ Section */}
            <section id="faq" className="py-20 md:py-24 scroll-mt-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center">Preguntas Frecuentes</h2>
                    <div className="mt-12">
                        {faqItems.map((item, index) => (
                           <FaqItem key={index} question={item.question} answer={item.answer} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;