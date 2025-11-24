// data/entities.ts

import { Entity } from '../types/entities';

export const ENTITIES: Entity[] = [
  // 1. Entidad tipo LEY
  {
    id: 'ley-21643',
    type: 'LAW',
    slug: '21643',
    name: 'Ley N° 21.643',
    metadata: {
      number: '21.643',
      date: '2023-12-27',
      status: 'Vigente',
      issuingBody: 'Ministerio del Trabajo y Previsión Social',
      mainTopics: ['Derecho Laboral'],
    },
    description: 'Modifica el Código del Trabajo y otros cuerpos legales en materia de prevención, investigación y sanción del acoso laboral, sexual y la violencia en el trabajo. Establece un marco normativo robusto para proteger la dignidad y seguridad de los trabajadores.',
    summary: {
      usageLevel: 'Alta',
      mainDocumentTypes: ['Dictámenes', 'Reglamentos Internos', 'Sentencias Judiciales'],
      mainOrganizations: ['Dirección del Trabajo', 'Empresas', 'Tribunales Laborales'],
      recentFocus: 'Implementación de protocolos obligatorios en empresas y fiscalización por parte de la Dirección del Trabajo.',
    },
    analysis: {
      risks: ['Aumento de litigiosidad por denuncias de acoso.', 'Costos de implementación de nuevos protocolos para Pymes.'],
      opportunities: ['Mejora del clima laboral y productividad.', 'Fortalecimiento de la reputación corporativa en materias de ESG.'],
      watchpoints: ['Publicación del reglamento de la ley.', 'Primeros dictámenes interpretativos de la Dirección del Trabajo.'],
    },
    timelineActivity: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [{ label: 'Menciones', data: [5, 12, 25, 30, 22, 18] }],
    },
    relationships: [
      { id: 'rel1', relationType: 'MODIFIES', label: 'Modifica el "Código del Trabajo"', relatedEntityId: 'codigo-trabajo' },
      { id: 'rel2', relationType: 'REGULATED_BY', label: 'Reglamentada por "Reglamento de la Ley 21.643"', relatedDocumentId: 'reg-21643' },
      { id: 'rel3', relationType: 'ISSUED_BY', label: 'Emitida por el "Ministerio del Trabajo"', relatedEntityId: 'mintrab' },
    ],
    relatedNorms: [
      { id: 'norm1', title: 'Código del Trabajo', type: 'Ley', relation: 'Modifica' },
      { id: 'norm2', title: 'Estatuto Administrativo', type: 'Ley', relation: 'Modifica' },
    ],
    relatedTopics: [
      {
        topicSlug: 'laboral',
        topicName: 'Derecho Laboral',
        subtopics: [{ slug: 'seguridad-laboral', name: 'Seguridad Laboral' }],
      },
    ],
    recentDocs: [
      { id: 'doc1', title: 'Dictamen N°123/01 de la DT', type: 'Dictamen', date: '2024-03-01', organization: 'Dirección del Trabajo', relation: 'Interpreta el alcance de la Ley 21.643' },
    ],
    featuredDocs: [
      { id: 'doc2', title: 'Publicación oficial de la Ley 21.643 en el DO', type: 'Ley', date: '2023-12-27', organization: 'Ministerio del Interior', relation: 'Promulgación de la ley' },
    ],
  },
  // 2. Entidad tipo MINISTERIO
  {
    id: 'minvu',
    type: 'MINISTRY',
    slug: 'minvu',
    name: 'Ministerio de Vivienda y Urbanismo',
    metadata: {
      acronym: 'MINVU',
      scope: 'Políticas habitacionales, desarrollo urbano y planificación territorial.',
    },
    description: 'Organismo del Estado de Chile encargado de la política habitacional y urbana. Su misión es mejorar la calidad de vida de los habitantes, promoviendo el acceso a la vivienda, la equidad territorial y el desarrollo sustentable de las ciudades.',
    summary: {
      usageLevel: 'Alta',
      mainDocumentTypes: ['Decretos Supremos', 'Resoluciones Exentas', 'Circulares (DDU)'],
      mainOrganizations: ['SERVIU', 'Municipalidades', 'Gobiernos Regionales'],
      recentFocus: 'Llamados a postulación de subsidios habitacionales (DS1, DS19, DS49) y modificaciones a la OGUC.',
    },
    analysis: {
      risks: ['Baja ejecución presupuestaria en programas clave.', 'Conflictos con comunidades por proyectos de densificación.'],
      opportunities: ['Implementación del Plan de Emergencia Habitacional.', 'Nuevos fondos para la regeneración de barrios.'],
      watchpoints: ['Modificaciones a la Ordenanza General de Urbanismo y Construcciones (OGUC).', 'Calendario de postulaciones a subsidios.'],
    },
    timelineActivity: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [{ label: 'Publicaciones', data: [45, 38, 55, 60, 52, 48] }],
    },
    relationships: [
      { id: 'rel4', relationType: 'ISSUED_BY', label: 'Emite el "Decreto Supremo 49"', relatedEntityId: 'ds49' },
    ],
    relatedNorms: [
      { id: 'norm3', title: 'Ley General de Urbanismo y Construcciones', type: 'Ley', relation: 'Supervisa' },
      { id: 'norm4', title: 'Decreto Supremo 49 (Subsidios)', type: 'Decreto', relation: 'Emite' },
    ],
    relatedTopics: [
      {
        topicSlug: 'vivienda-y-urbanismo',
        topicName: 'Vivienda y Urbanismo',
        subtopics: [
            { slug: 'subsidios-habitacionales', name: 'Subsidios Habitacionales' },
            { slug: 'planificacion-urbana', name: 'Planificación Urbana' },
        ],
      },
    ],
    recentDocs: [
      { id: 'doc3', title: 'Resolución Exenta N° 345 - Llama a postulación para subsidio DS1', type: 'Resolución', date: '2024-06-15', organization: 'MINVU', relation: 'Inicia proceso de postulación' },
    ],
    featuredDocs: [
      { id: 'doc4', title: 'Decreto Supremo 49', type: 'Decreto', date: '2011-01-26', organization: 'MINVU', relation: 'Reglamenta el principal subsidio para sectores vulnerables' },
    ],
  },
   // 3. Entidad tipo PERSONA
  {
    id: 'carlos-montes',
    type: 'PERSON',
    slug: 'carlos-montes',
    name: 'Carlos Montes Cisternas',
    metadata: {
      role: 'Ministro de Vivienda y Urbanismo',
      period: '2022–Presente',
    },
    description: 'Político chileno, actual Ministro de Vivienda y Urbanismo. Su gestión se ha centrado en el Plan de Emergencia Habitacional, buscando abordar el déficit de viviendas en el país. Sus firmas aparecen en decretos y resoluciones clave del MINVU.',
    summary: {
      usageLevel: 'Media',
      mainDocumentTypes: ['Decretos Supremos', 'Resoluciones'],
      mainOrganizations: ['MINVU', 'Presidencia'],
      recentFocus: 'Firma de decretos que modifican programas de subsidios y normativas de construcción.',
    },
    analysis: {
      risks: [],
      opportunities: [],
      watchpoints: ['Decretos firmados que puedan indicar cambios de política en vivienda.', 'Nombramientos de autoridades en servicios relacionados.'],
    },
    timelineActivity: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [{ label: 'Firmas en DO', data: [8, 5, 10, 12, 9, 7] }],
    },
    relationships: [
      { id: 'rel5', relationType: 'SIGNED_BY', label: 'Firma "Modifica DS Nº 1 (V. y U.), de 2011"', relatedDocumentId: 'doc-456' },
    ],
    relatedNorms: [],
    relatedTopics: [
        {
        topicSlug: 'vivienda-y-urbanismo',
        topicName: 'Vivienda y Urbanismo',
        subtopics: [],
      },
    ],
    recentDocs: [
      { id: 'doc-456', title: 'Modifica DS Nº 1 (V. y U.), de 2011, que regula el sistema integrado de subsidio habitacional', type: 'Decreto', date: '2024-05-28', organization: 'MINVU', relation: 'Firmado por' },
    ],
    featuredDocs: [],
  },
];