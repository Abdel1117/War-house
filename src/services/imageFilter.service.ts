import { ImageData, FilterCriteria } from '../types/imagesType/ImagesType';

export type SortKey = 'title' | 'favorite' | 'id';

export interface ViewerPolicy  {
    canViewPegi18 : boolean;
}

export const hasActiveFilters = (criteria: FilterCriteria): boolean => {
  return !!(criteria.collection || criteria.category || criteria.pegi);
};

export const filterImages = (images: ImageData[], criteria: FilterCriteria): ImageData[] => {
  if (!hasActiveFilters(criteria)) return images;

  return images.filter((image) => {
    const matchesCollection = criteria.collection 
      ? image.collection === criteria.collection 
      : true;

      const matchesCategory = criteria.category 
      ? image.category.includes(criteria.category) 
      : true;
    

    const matchesPegi = criteria.pegi 
      ? (criteria.pegi === '18' ? image.pegi18 : !image.pegi18)
      : true;

    return matchesCollection && matchesCategory && matchesPegi;
  });
};

export const sortImages = (images: ImageData[], sortBy: 'title' | 'favorite' | 'id'): ImageData[] => {
  return [...images].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'favorite':
        return b.favorite - a.favorite;
      case 'id':
      default:
        return a.id - b.id;
    }
  });
};


export const applyViewerPolicy = (images: ImageData[], policy: ViewerPolicy): ImageData[] => {
  if (policy.canViewPegi18) return images;
  return images.filter(img => !img.pegi18);
};