// src/hooks/useInfiniteImages/useInfiniteImages.ts
import { useState, useEffect, useCallback } from 'react';
import { ImageData } from '../../types/imagesType/ImagesType';
import { fetchImages, PaginationParams } from '../../services/imageApi.service';

interface UseInfiniteImagesOptions {
  limit?: number;
  enabled?: boolean;
}

export const useInfiniteImages = (options: UseInfiniteImagesOptions = {}) => {
  const { limit = 20, enabled = true } = options;
  
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const loadImages = useCallback(async (page: number, reset = false) => {
    if (!enabled || loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetchImages({ page, limit });
      
      setImages(prev => reset ? response.data : [...prev, ...response.data]);
      setHasMore(response.pagination.hasNext);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  }, [enabled, loading, limit]);

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      loadImages(currentPage + 1);
    }
  }, [hasMore, loading, currentPage, loadImages]);

  const reset = useCallback(() => {
    setImages([]);
    setCurrentPage(1);
    setHasMore(true);
    setError(null);
    loadImages(1, true);
  }, [loadImages]);

  // Chargement initial
  useEffect(() => {
    if (enabled && images.length === 0) {
      loadImages(1, true);
    }
  }, [enabled, images.length, loadImages]);

  return {
    images,
    loading,
    error,
    hasMore,
    loadMore,
    reset,
    currentPage
  };
};