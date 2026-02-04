export enum ModuleType {
  RESTORATION = 'RESTORATION',
  TRANSLATION = 'TRANSLATION',
  MOSAIC = 'MOSAIC',
  VASE = 'VASE',
  FRIGATED = 'FRIGATED'
}

export interface ProcessingState {
  isLoading: boolean;
  error: string | null;
  result: string | null; // URL for images, text for translation
}

export interface NavItem {
  id: ModuleType;
  label: string;
  icon: string;
  description: string;
}