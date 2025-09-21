import { ImageData } from '../types/imagesType/ImagesType';

const categories = [
  'Médiéval',
  'Fantastique',
  'Science-Fiction',
  'Historique',
  'Moderne',
  'Post-Apo',
  'Steampunk',
];

const collections = ['Figurines, Décors', 'Jeux', 'Parties'];

export const generateImages = (count: number): ImageData[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    title: `Image ${index + 1}`,
    resolution: `${Math.round(Math.random() * 2000 + 1000)}x${Math.round(
      Math.random() * 2000 + 1000
    )}`,
    category: [categories[Math.floor(Math.random() * categories.length)]],
    favorite: Math.round(Math.random() * 10),
    pegi18: Math.random() < 0.3,
    collection: collections[Math.floor(Math.random() * collections.length)],
    src: `https://picsum.photos/300/200?random=${index + 1}`,
  }));
};

export const getCategories = (): string[] => [...categories];
export const getCollections = (): string[] => [...collections];
export const getPegiOptions = (): string[] => ['3', '7', '12', '16', '18'];