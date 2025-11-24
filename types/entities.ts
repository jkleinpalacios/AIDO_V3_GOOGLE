// types/entities.ts

export type EntityType =
  | 'LAW'
  | 'DECREE'
  | 'REGULATION'
  | 'MINISTRY'
  | 'AGENCY'
  | 'PERSON'
  | 'PROGRAM';

export type RelationType =
  | 'MENTIONED_IN'
  | 'MODIFIES'
  | 'MODIFIED_BY'
  | 'DEROGATES'
  | 'DEROGATED_BY'
  | 'REGULATES'
  | 'REGULATED_BY'
  | 'SIGNED_BY'
  | 'ISSUED_BY';

export interface EntityRelationship {
  id: string;
  relatedEntityId?: string;
  relatedEntityType?: EntityType;
  relatedEntitySlug?: string;
  relatedDocumentId?: string;
  relationType: RelationType;
  date?: string;
  label: string;
}

export interface RelatedNorm {
  id: string;
  title: string;
  type: string;
  relation: string;
  date?: string;
}

export interface RelatedDocument {
  id: string;
  title: string;
  type: string;
  date: string;
  organization: string;
  relation: string;
}

export interface Entity {
  id: string;
  type: EntityType;
  slug: string;
  name: string;
  metadata: {
    number?: string;
    date?: string;
    status?: string;
    issuingBody?: string;
    role?: string;
    period?: string;
    acronym?: string;
    scope?: string;
    mainTopics?: string[];
  };
  description: string;
  summary: {
    usageLevel: 'Alta' | 'Media' | 'Baja';
    mainDocumentTypes: string[];
    mainOrganizations: string[];
    recentFocus: string;
  };
  analysis: {
    risks: string[];
    opportunities: string[];
    watchpoints: string[];
  };
  timelineActivity: {
    labels: string[];
    datasets: { label: string; data: number[] }[];
  };
  relationships: EntityRelationship[];
  relatedNorms: RelatedNorm[];
  relatedTopics: {
    topicSlug: string;
    topicName: string;
    subtopics: { slug: string; name: string }[];
  }[];
  recentDocs: RelatedDocument[];
  featuredDocs: RelatedDocument[];
}
