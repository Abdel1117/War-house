// src/services/imageApi.service.ts
import { ImageData } from '../types/imagesType/ImagesType';
import { generateImages } from '../utils/mockData.generator';

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    totalItems: number;
  };
}

export const fetchImages = async (params: PaginationParams): Promise<PaginatedResponse<ImageData>> => {
  // Simule un appel API avec délai
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const { page, limit } = params;
  const startId = (page - 1) * limit + 1;
  
  // Génère les images pour cette page
  const pageImages = generateImages(limit, startId);
  
  // Simule une pagination (par exemple, max 10 pages)
  const totalPages = 10;
  const totalItems = totalPages * limit;
  
  return {
    data: pageImages,
    pagination: {
      currentPage: page,
      totalPages,
      hasNext: page < totalPages,
      totalItems
    }
  };
};

