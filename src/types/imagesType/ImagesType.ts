// src/types/image.types.ts
export interface ImageData {
  id: number;
  title: string;
  resolution: string;
  category: string[];
  favorite: number;
  pegi18: boolean;
  collection?: string; 
  src?: string; 
}

export interface ImageDisplayProps {
  id: number;
  title: string;
  resolution: string;
  src?: string;
  pegi18: boolean;
}

export interface FilterCriteria {
  collection?: string;
  category?: string;
  pegi?: string;
}