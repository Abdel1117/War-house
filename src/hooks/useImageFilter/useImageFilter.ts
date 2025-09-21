import { useMemo, useState } from 'react';
import { ImageData, FilterCriteria } from '../../types/imagesType/ImagesType';
import { filterImages, sortImages, hasActiveFilters, SortKey, applyViewerPolicy } from '../../services/imageFilter.service';

interface UseImageFilterOptions {
  canViewPegi18?: boolean;
  sortBy?: SortKey;
}

export const useImageFilter = (initialImages: ImageData[], opts: UseImageFilterOptions = {}) => {
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({});
  const [sortKey, setSortKey] = useState<SortKey>(opts.sortBy ?? 'id');


  const canViewPegi18 = opts.canViewPegi18 ?? true;
  const filteredImages = useMemo(() => {
    // Étape 1: appliquer la policy (masque les PEGI18 si nécessaire)
    const policyApplied = applyViewerPolicy(initialImages, { canViewPegi18 });

    // Étape 2: appliquer les critères utilisateur (si actifs)
    const byCriteria = hasActiveFilters(filterCriteria)
      ? filterImages(policyApplied, filterCriteria)
      : policyApplied;

    // Étape 3: trier
    console.log(byCriteria)
    console.log(sortKey)
    return sortImages(byCriteria, sortKey);
  }, [initialImages, canViewPegi18, filterCriteria, sortKey]);

  const updateFilter = (newCriteria: Partial<FilterCriteria>) => {
    setFilterCriteria(prev => ({ ...prev, ...newCriteria }));
  };

  const resetFilters = () => setFilterCriteria({});

  return {
    filteredImages,
    filterCriteria,
    updateFilter,
    resetFilters,
    sortKey,
    setSortKey,
    isFilterActive: hasActiveFilters(filterCriteria),
    totalImages: initialImages.length,
    filteredCount: filteredImages.length,
  };
};