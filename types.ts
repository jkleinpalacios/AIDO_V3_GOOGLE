
export interface DocumentSummary {
  id: string;
  title: string;
  summary: string;
  date: string;
  section: string;
}

export interface Section {
  id: string;
  name: string;
  icon: string;
  summary: string;
  docCount: number;
}

export interface MiningSubsection {
  id: string;
  name: string;
  icon: string;
  hasContent: boolean;
}

export interface Topic {
  id: string;
  name: string;
  summary: string;
}
