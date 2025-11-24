
import { Section, MiningSubsection } from './types';

export const NAV_LINKS = [
    { name: '¿Qué es AIDO?', href: '#about' },
    { name: 'Cómo funciona', href: '#how-it-works' },
    { name: 'Preguntas Frecuentes', href: '#faq' },
];

export interface ExplorableTopic {
    slug: string;
    name: string;
    icon: string;
    summary: string;
    description: string;
    tags: string[];
}

export const EXPLORABLE_TOPICS: ExplorableTopic[] = [
    { 
        slug: 'vivienda-y-urbanismo', 
        name: 'Vivienda y Urbanismo', 
        icon: 'BuildingOfficeIcon', 
        summary: 'Normativa sobre planificación urbana, construcción, subsidios y desarrollo territorial.', 
        description: 'Este tema agrupa toda la normativa relacionada con la planificación urbana, la construcción de viviendas, los subsidios habitacionales y las políticas de desarrollo territorial.', 
        tags: ['MINISTRY', 'DECREE', 'LAW', 'MUNICIPALITY', 'PROGRAM', 'LOCATION'] 
    },
    { 
        slug: 'mineria', 
        name: 'Minería', 
        icon: 'CubeTransparentIcon', 
        summary: 'Regulaciones sobre concesiones, exploración, explotación y seguridad minera.', 
        description: 'Contiene toda la legislación y publicaciones oficiales sobre concesiones mineras, pedimentos, manifestaciones, sentencias de exploración y explotación, y normativas de seguridad.', 
        tags: ['CONCESSION', 'PERSON', 'COMPANY', 'DECREE', 'LOCATION'] 
    },
    { 
        slug: 'medio-ambiente', 
        name: 'Medio Ambiente', 
        icon: 'GlobeAltIcon', 
        summary: 'Leyes y decretos sobre impacto ambiental, recursos naturales y protección de la biodiversidad.', 
        description: 'Analiza la normativa que regula el impacto ambiental de proyectos, la gestión de recursos naturales como el agua y los bosques, la protección de especies y ecosistemas.', 
        tags: ['LAW', 'DECREE', 'AGENCY', 'PROGRAM', 'LOCATION'] 
    },
    { 
        slug: 'justicia', 
        name: 'Justicia y Poder Judicial', 
        icon: 'GavelIcon', 
        summary: 'Publicaciones de tribunales, edictos, notificaciones y legislación del poder judicial.', 
        description: 'Reúne las publicaciones judiciales como edictos, notificaciones de remates, extravíos de documentos y resoluciones de tribunales.', 
        tags: ['COURT', 'PERSON', 'LAW', 'COMPANY'] 
    },
    { 
        slug: 'empresas-y-cooperativas', 
        name: 'Empresas y Cooperativas', 
        icon: 'BuildingStorefrontIcon', 
        summary: 'Constituciones, modificaciones y estatutos de sociedades comerciales y cooperativas.', 
        description: 'Monitorea la creación de nuevas empresas, modificaciones de estatutos, disoluciones y publicaciones de juntas de accionistas.', 
        tags: ['COMPANY', 'TRADEMARK', 'LAW'] 
    },
    { 
        slug: 'laboral', 
        name: 'Derecho Laboral y Seguridad Social', 
        icon: 'UserGroupIcon', 
        summary: 'Modificaciones al Código del Trabajo, dictámenes y normativa sobre relaciones laborales.', 
        description: 'Cubre todas las modificaciones al Código del Trabajo, dictámenes de la Dirección del Trabajo y regulaciones sobre contratos y seguridad laboral.', 
        tags: ['LAW', 'DECREE', 'PERSON', 'MINISTRY', 'AGENCY'] 
    },
    { 
        slug: 'salud', 
        name: 'Salud Pública', 
        icon: 'HeartIcon', 
        summary: 'Reglamentos sanitarios, alertas, normativas de farmacias y políticas de salud.', 
        description: 'Contiene decretos y resoluciones del Ministerio de Salud, alertas sanitarias, regulaciones sobre medicamentos y normativas para establecimientos de salud.', 
        tags: ['AGENCY', 'DECREE', 'LAW', 'MINISTRY'] 
    },
    { 
        slug: 'obras-publicas', 
        name: 'Obras Públicas e Infraestructura', 
        icon: 'WrenchScrewdriverIcon', 
        summary: 'Licitaciones, expropiaciones y regulaciones de proyectos de infraestructura pública.', 
        description: 'Agrupa las publicaciones sobre licitaciones de obras públicas, decretos de expropiación, regulaciones de concesiones y normativas del MOP.', 
        tags: ['DECREE', 'PROGRAM', 'MINISTRY', 'COMPANY', 'LOCATION'] 
    },
    { 
        slug: 'hacienda', 
        name: 'Hacienda y Finanzas Públicas', 
        icon: 'BanknotesIcon', 
        summary: 'Presupuestos, regulaciones tributarias, aduaneras y financieras del Estado.', 
        description: 'Normativa del Ministerio de Hacienda, Tesorería, SII y CMF, incluyendo leyes tributarias y ajustes presupuestarios.', 
        tags: ['MINISTRY', 'LAW', 'DECREE', 'AGENCY', 'COMPANY'] 
    },
    { 
        slug: 'transportes', 
        name: 'Transportes y Telecomunicaciones', 
        icon: 'TruckIcon', 
        summary: 'Regulación del transporte público, tránsito y telecomunicaciones.', 
        description: 'Decretos sobre tarifas, recorridos, concesiones de radio y televisión, y normativas de la Subsecretaría de Telecomunicaciones.', 
        tags: ['MINISTRY', 'DECREE', 'AGENCY', 'COMPANY'] 
    },
    { 
        slug: 'agricultura', 
        name: 'Agricultura y Ganadería', 
        icon: 'SunIcon', 
        summary: 'Normas sobre actividad agrícola, forestal, ganadera y protección del SAG.', 
        description: 'Resoluciones del Servicio Agrícola y Ganadero (SAG), declaraciones de plagas, control fronterizo y fomento al riego.', 
        tags: ['AGENCY', 'DECREE', 'LAW', 'PROGRAM'] 
    },
    { 
        slug: 'defensa', 
        name: 'Defensa y Fuerzas Armadas', 
        icon: 'ShieldCheckIcon', 
        summary: 'Normativa del Ministerio de Defensa, ascensos y reglamentos militares.', 
        description: 'Decretos y resoluciones relacionadas con las Fuerzas Armadas, reclutamiento, movilización y administración de defensa.', 
        tags: ['MINISTRY', 'PERSON', 'DECREE'] 
    },
    { 
        slug: 'economia', 
        name: 'Economía, Fomento y Pymes', 
        icon: 'ChartBarIcon', 
        summary: 'Políticas de fomento productivo, turismo, pesca y regulación de mercados.', 
        description: 'Normativa del Ministerio de Economía, programas de CORFO, Sercotec y regulación de propiedad industrial.', 
        tags: ['COMPANY', 'TRADEMARK', 'PROGRAM', 'LAW'] 
    },
    { 
        slug: 'energia', 
        name: 'Energía y Regulación Eléctrica', 
        icon: 'BoltIcon', 
        summary: 'Concesiones eléctricas, fijación de tarifas y normas de seguridad energética.', 
        description: 'Decretos tarifarios, concesiones definitivas, normas técnicas de la CNE y fiscalización de la SEC.', 
        tags: ['AGENCY', 'DECREE', 'LAW', 'COMPANY'] 
    },
    { 
        slug: 'municipalidades', 
        name: 'Municipalidades y Gobierno Local', 
        icon: 'MapIcon', 
        summary: 'Ordenanzas, decretos alcaldicios, patentes y gestión comunal.', 
        description: 'Actos administrativos de las municipalidades, modificaciones a planes reguladores comunales y licitaciones locales.', 
        tags: ['MUNICIPALITY', 'LOCATION', 'DECREE', 'PROGRAM'] 
    },
    { 
        slug: 'pesca', 
        name: 'Pesca y Acuicultura', 
        icon: 'GlobeAltIcon', 
        summary: 'Vedas, cuotas de pesca, concesiones de acuicultura y zonas de manejo.', 
        description: 'Resoluciones de SUBPESCA y SERNAPESCA regulando la actividad pesquera extractiva y de acuicultura.', 
        tags: ['LAW', 'DECREE', 'AGENCY', 'COMPANY', 'LOCATION'] 
    },
    { 
        slug: 'banco-central', 
        name: 'Banco Central e Indicadores', 
        icon: 'BuildingLibraryIcon', 
        summary: 'Acuerdos del Consejo, tasas de interés y regulaciones cambiarias.', 
        description: 'Publicaciones oficiales del Banco Central de Chile, incluyendo el Tipo de Cambio y acuerdos normativos financieros.', 
        tags: ['AGENCY', 'LAW', 'DECREE'] 
    }
];


export const SECTIONS: Section[] = [
    { id: 'normas-generales', name: 'Normas Generales', icon: 'ScaleIcon', summary: 'Decretos, resoluciones y leyes de aplicación general.', docCount: 12 },
    { id: 'normas-particulares', name: 'Normas Particulares', icon: 'DocumentTextIcon', summary: 'Concesiones, nombramientos y actos de interés particular.', docCount: 45 },
    { id: 'judiciales', name: 'Publicaciones Judiciales', icon: 'GavelIcon', summary: 'Edictos, notificaciones y resoluciones de tribunales.', docCount: 153 },
    { id: 'avisos-destacados', name: 'Avisos Destacados', icon: 'MegaphoneIcon', summary: 'Licitaciones, citaciones y otros avisos de importancia.', docCount: 8 },
    { id: 'empresas-cooperativas', name: 'Empresas y Cooperativas', icon: 'BuildingStorefrontIcon', summary: 'Constituciones, modificaciones y disoluciones de sociedades.', docCount: 210 },
    { id: 'marcas-patentes', name: 'Marcas y Patentes', icon: 'LightBulbIcon', summary: 'Solicitudes y registros de propiedad industrial e intelectual.', docCount: 88 },
    { id: 'boletin-mineria', name: 'Boletín Oficial de Minería', icon: 'CubeTransparentIcon', summary: 'Pedimentos, sentencias y otras publicaciones del sector minero.', docCount: 34 },
];

export const MINING_SUBSECTIONS: MiningSubsection[] = [
    { id: 'pedimentos', name: 'Pedimentos Mineros', icon: 'MapIcon', hasContent: true },
    { id: 'manifestaciones', name: 'Manifestaciones Mineras', icon: 'EyeIcon', hasContent: true },
    { id: 'solicitudes-mensura', name: 'Solicitudes de Mensura', icon: 'ClipboardDocumentListIcon', hasContent: false },
    { id: 'oposicion-mensura', name: 'Oposición de Mensura', icon: 'HandRaisedIcon', hasContent: true },
    { id: 'extractos-art-83', name: 'Extractos Artículo 83', icon: 'DocumentMagnifyingGlassIcon', hasContent: true },
    { id: 'citaciones-junta', name: 'Citaciones a Junta y Asamblea', icon: 'UsersIcon', hasContent: true },
    { id: 'sentencias-exploracion', name: 'Sentencias de Exploración', icon: 'CheckBadgeIcon', hasContent: true },
    { id: 'sentencias-explotacion', name: 'Sentencias de Explotación', icon: 'CheckBadgeIcon', hasContent: false },
    { id: 'prorrogas-exploracion', name: 'Prórrogas Concesión de Exploración', icon: 'ClockIcon', hasContent: true },
    { id: 'renuncias-concesion', name: 'Renuncias de Concesión Minera', icon: 'DocumentMinusIcon', hasContent: false },
    { id: 'acuerdos-junta', name: 'Acuerdos Junta de Accionista', icon: 'UserGroupIcon', hasContent: true },
    { id: 'nomina-remate', name: 'Nómina Concesiones para Remate', icon: 'BanknotesIcon', hasContent: true },
    { id: 'nomina-patente-rebajada', name: 'Nómina Beneficiados Patente Rebajada', icon: 'ReceiptPercentIcon', hasContent: true },
    { id: 'nomina-art-90', name: 'Nómina de Concesiones Art. 90', icon: 'DocumentChartBarIcon', hasContent: false },
    { id: 'vigencia-inscripcion', name: 'Vigencia Inscripción Actas de Mensura', icon: 'CalendarDaysIcon', hasContent: true },
    { id: 'otras-publicaciones', name: 'Otras publicaciones', icon: 'EllipsisHorizontalIcon', hasContent: true },
];

export const PRIVATE_NAV_LINKS = [
    { name: 'Sumarios', href: '/dashboard/resumen-diario', icon: 'CalendarDaysIcon' },
    { name: 'Legislación', href: '/dashboard/legislacion', icon: 'ScaleIcon' },
];
