// data/subtopics.ts

export interface Subtopic {
  id: string;
  slug: string;
  name: string;
  topicSlug: string;
  description: string;
  summary: {
    activityLevel: 'Alta' | 'Media' | 'Baja';
    mainOrganizations: string[];
    mainDocTypes: string[];
    recentFocus: string;
  };
  risks: string[];
  opportunities: string[];
  watchpoints: string[];
  activityData: {
    labels: string[];
    datasets: { label: string; data: number[] }[];
  };
  relevantNorms: {
    id: string;
    title: string;
    type: string;
    summary: string;
  }[];
  recentDocs: {
    id: string;
    title: string;
    type: string;
    date: string;
    organization: string;
  }[];
  featuredDocs: {
    id: string;
    title: string;
    type: string;
    date: string;
    organization: string;
  }[];
}

export const SUBTOPICS: Subtopic[] = [
  {
    id: 'sh-1',
    slug: 'subsidios-habitacionales',
    name: 'Subsidios Habitacionales',
    topicSlug: 'vivienda-y-urbanismo',
    description: 'Seguimiento de la normativa que regula los programas de ayuda estatal para el acceso a la vivienda, incluyendo requisitos, postulaciones y modificaciones.',
    summary: {
      activityLevel: 'Alta',
      mainOrganizations: ['MINVU', 'SERVIU'],
      mainDocTypes: ['Resoluciones Exentas', 'Decretos Supremos', 'Circulares'],
      recentFocus: 'Ajustes en los montos de subsidio y requisitos de postulación para el DS1 y DS19 (Integración Social).',
    },
    risks: [
      'Cambios en los criterios de elegibilidad que pueden excluir a ciertos grupos.',
      'Reducción de cupos o presupuesto en programas clave, afectando la demanda.',
    ],
    opportunities: [
      'Creación de nuevos programas para arriendo o vivienda para adultos mayores.',
      'Flexibilización de requisitos para trabajadores informales o migrantes.',
    ],
    watchpoints: [
      'Fechas de llamados a postulación para DS49, DS1.',
      'Modificaciones a los reglamentos de cada subsidio.',
      'Publicaciones de listas de beneficiarios.',
    ],
    activityData: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [{ label: 'Publicaciones', data: [18, 22, 15, 25, 20, 28] }],
    },
    relevantNorms: [
      { id: 'ds49', title: 'Decreto Supremo 49', type: 'Decreto', summary: 'Reglamenta el Programa Fondo Solidario de Elección de Vivienda para los sectores más vulnerables.' },
      { id: 'ds01', title: 'Decreto Supremo 01', type: 'Decreto', summary: 'Regula el sistema integrado de subsidio habitacional para sectores medios.' },
      { id: 'ds19', title: 'Decreto Supremo 19', type: 'Decreto', summary: 'Establece el Programa de Integración Social y Territorial para proyectos habitacionales.' },
    ],
    recentDocs: [
      { id: '301', title: 'Resolución Exenta N° 345 - Llama a postulación nacional para subsidio habitacional DS1', type: 'Resolución', date: '2024-06-15', organization: 'MINVU' },
      { id: 'doc-456', title: 'Modifica DS Nº 1 (V. y U.), de 2011, que regula el sistema integrado de subsidio habitacional', type: 'Decreto', date: '2024-05-28', organization: 'MINVU' },
    ],
    featuredDocs: [
      { id: 'ds19', title: 'Decreto Supremo 19 - Programa de Integración Social y Territorial', type: 'Decreto', date: '2016-01-20', organization: 'MINVU' },
    ],
  },
  {
    id: 'pr-1',
    slug: 'planes-reguladores',
    name: 'Planes Reguladores',
    topicSlug: 'vivienda-y-urbanismo',
    description: 'Monitoreo de publicaciones sobre la creación, modificación y actualización de Planes Reguladores Comunales, Intercomunales y Seccionales.',
    summary: {
      activityLevel: 'Media',
      mainOrganizations: ['Municipalidades', 'Gobiernos Regionales', 'MINVU', 'SEREMI MINVU'],
      mainDocTypes: ['Decretos Alcaldicios', 'Resoluciones de GORE', 'Avisos de Consulta Pública'],
      recentFocus: 'Actualizaciones para incorporar zonas de riesgo de desastres y normativas de densificación equilibrada.',
    },
    risks: [
      'Conflictos socio-ambientales por cambios en el uso de suelo.',
      'Aumento de la burocracia en procesos de aprobación, retrasando proyectos.',
    ],
    opportunities: [
      'Habilitación de nuevos terrenos para desarrollo inmobiliario.',
      'Incentivos normativos para proyectos de vivienda de interés público.',
    ],
    watchpoints: [
      'Inicio de procesos de consulta pública de nuevos planes.',
      'Decretos de promulgación de modificaciones.',
      'Informes de la Contraloría sobre la legalidad de los planes.',
    ],
    activityData: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [{ label: 'Publicaciones', data: [7, 5, 9, 11, 8, 10] }],
    },
    relevantNorms: [
      { id: 'lguc', title: 'DFL 458 - Ley General de Urbanismo y Construcciones', type: 'Ley', summary: 'Establece el marco general para la planificación urbana y la construcción en Chile.' },
      { id: 'oguc', title: 'DS 47 - Ordenanza General de Urbanismo y Construcciones', type: 'Reglamento', summary: 'Detalla las disposiciones de la LGUC, estableciendo normas técnicas y procedimientos.' },
    ],
    recentDocs: [
      { id: '303', title: 'Decreto Alcaldicio N° 1.234 - Aprueba Modificación al Plan Regulador Comunal de Las Condes', type: 'Decreto', date: '2024-07-02', organization: 'Municipalidad de Las Condes' },
    ],
    featuredDocs: [
      { id: 'oguc', title: 'Ordenanza General de Urbanismo y Construcciones (DS 47)', type: 'Reglamento', date: '1992-04-16', organization: 'MINVU' },
    ],
  },
  {
    id: 'pu-1',
    slug: 'planificacion-urbana',
    name: 'Planificación Urbana',
    topicSlug: 'vivienda-y-urbanismo',
    description: 'Análisis de los Instrumentos de Planificación Territorial (IPT), su creación, modificación y el impacto en el desarrollo de las ciudades.',
    summary: {
      activityLevel: 'Media',
      mainOrganizations: ['MINVU', 'SEREMIs', 'Municipalidades', 'Gobiernos Regionales'],
      mainDocTypes: ['Decretos Alcaldicios', 'Resoluciones', 'Dictámenes de Contraloría'],
      recentFocus: 'Incorporación de variables de cambio climático y gestión de riesgos en los nuevos IPT.',
    },
    risks: [
      'Judicialización de modificaciones a Planes Reguladores por parte de comunidades.',
      'Desajustes entre la planificación urbana y las necesidades reales de vivienda social.',
    ],
    opportunities: [
      'Generación de normativas que incentiven la densificación equilibrada y el desarrollo de barrios integrados.',
      'Actualización de planes reguladores obsoletos para fomentar la inversión privada y pública.',
    ],
    watchpoints: [
      'Procesos de consulta pública de nuevos IPTs.',
      'Dictámenes de Contraloría que afectan la vigencia de los planes.',
      'Modificaciones a la Ley General de Urbanismo y Construcciones (LGUC).',
    ],
    activityData: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [{ label: 'Publicaciones', data: [10, 8, 15, 12, 11, 14] }],
    },
    relevantNorms: [
      { id: 'lguc', title: 'DFL 458 - Ley General de Urbanismo y Construcciones', type: 'Ley', summary: 'Es el cuerpo legal que establece el marco normativo para la planificación urbana, la urbanización y la construcción.' },
      { id: 'pndu', title: 'Política Nacional de Desarrollo Urbano', type: 'Política Pública', summary: 'Define los principios y objetivos para guiar el desarrollo de las ciudades en Chile a largo plazo.' },
    ],
    recentDocs: [
      { id: 'doc-789', title: 'Resolución GORE - Aprueba Plan Regulador Metropolitano de Valparaíso (PREMVAL)', type: 'Resolución', date: '2024-06-20', organization: 'GORE Valparaíso' },
    ],
    featuredDocs: [
      { id: 'lguc', title: 'DFL 458 - Ley General de Urbanismo y Construcciones', type: 'Ley', date: '1975-04-18', organization: 'MINVU' },
    ],
  },
  {
    id: 'ex-1',
    slug: 'expropiaciones',
    name: 'Expropiaciones',
    topicSlug: 'vivienda-y-urbanismo',
    description: 'Análisis de los decretos y resoluciones que ordenan la expropiación de inmuebles por causa de utilidad pública para proyectos urbanos y de vivienda.',
    summary: {
      activityLevel: 'Media',
      mainOrganizations: ['MOP', 'SERVIU', 'Municipalidades'],
      mainDocTypes: ['Decretos Expropiatorios', 'Resoluciones Exentas', 'Avisos Judiciales'],
      recentFocus: 'Expropiaciones para proyectos de vialidad urbana, parques y conjuntos de vivienda social.',
    },
    risks: [
      'Conflictos con propietarios por montos de indemnización.',
      'Retrasos en la toma de posesión material de los terrenos, afectando cronogramas de obras públicas.',
    ],
    opportunities: [
      'Liberación de terrenos clave para el desarrollo de infraestructura pública necesaria.',
      'Saneamiento de títulos de dominio para proyectos de vivienda social en terrenos privados.',
    ],
    watchpoints: [
      'Publicación de decretos expropiatorios con detalle de lotes afectados.',
      'Llamados a pago de indemnizaciones en el Diario Oficial.',
      'Sentencias de tribunales sobre reclamaciones de montos o legalidad del acto expropiatorio.',
    ],
    activityData: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [{ label: 'Publicaciones', data: [14, 11, 16, 13, 18, 15] }],
    },
    relevantNorms: [
      { id: 'dl2186', title: 'Decreto Ley N° 2.186 - Ley Orgánica de Procedimiento de Expropiaciones', type: 'Ley', summary: 'Establece el procedimiento administrativo y judicial para la expropiación de bienes por causa de utilidad pública.' },
    ],
    recentDocs: [
      { id: 'doc-101', title: 'Decreto Expropiatorio SERVIU N° 55 - Expropia lote para proyecto habitacional en Maipú', type: 'Decreto', date: '2024-07-10', organization: 'SERVIU Metropolitano' },
    ],
    featuredDocs: [
      { id: 'dl2186', title: 'Decreto Ley N° 2.186 - Ley Orgánica de Procedimiento de Expropiaciones', type: 'Ley', date: '1978-06-09', organization: 'Ministerio de Justicia' },
    ],
  },
  {
    id: 'uc-1',
    slug: 'urbanismo-y-construcciones',
    name: 'Urbanismo y Construcciones',
    topicSlug: 'vivienda-y-urbanismo',
    description: 'Seguimiento de la normativa técnica, permisos, y regulaciones específicas que afectan al sector de la construcción y el desarrollo de proyectos.',
    summary: {
      activityLevel: 'Alta',
      mainOrganizations: ['MINVU', 'Direcciones de Obras Municipales (DOM)', 'SEC'],
      mainDocTypes: ['Decretos Supremos', 'Circulares DDU', 'Resoluciones'],
      recentFocus: 'Actualizaciones a la OGUC sobre eficiencia energética, accesibilidad universal y resistencia sísmica.',
    },
    risks: [
      'Nuevas exigencias técnicas que aumentan los costos de construcción y plazos de los proyectos.',
      'Incertidumbre jurídica por interpretaciones variables de la normativa por parte de las DOM.',
    ],
    opportunities: [
      'Incentivos para la construcción sustentable y uso de nuevas tecnologías.',
      'Simplificación de trámites para la obtención de permisos de edificación.',
    ],
    watchpoints: [
      'Circulares de la División de Desarrollo Urbano (DDU) del MINVU.',
      'Modificaciones a la Ordenanza General de Urbanismo y Construcciones (OGUC).',
      'Nuevas normas técnicas del INN referenciadas en la OGUC.',
    ],
    activityData: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [{ label: 'Publicaciones', data: [20, 18, 25, 22, 28, 26] }],
    },
    relevantNorms: [
      { id: 'oguc', title: 'DS 47 - Ordenanza General de Urbanismo y Construcciones', type: 'Reglamento', summary: 'Reglamento de la LGUC que detalla las normas de edificación, urbanización y procedimientos.' },
      { id: 'ley21455', title: 'Ley 21.455 - Ley Marco de Cambio Climático', type: 'Ley', summary: 'Establece metas y gobernanza para la gestión del cambio climático, con impacto en la construcción.' },
    ],
    recentDocs: [
      { id: 'doc-112', title: 'Circular DDU 478 - Aclara aplicación de normas de accesibilidad universal en edificios existentes', type: 'Circular', date: '2024-06-18', organization: 'MINVU' },
    ],
    featuredDocs: [
      { id: 'oguc', title: 'Ordenanza General de Urbanismo y Construcciones (DS 47)', type: 'Reglamento', date: '1992-04-16', organization: 'MINVU' },
    ],
  },
];
