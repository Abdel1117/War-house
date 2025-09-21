import React, { useState } from "react";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { ImageComponent } from "../../components/ImageComponent/ImageComponent";
import { useImageFilter } from "../../hooks/useImageFilter/useImageFilter";
import { useUserContext } from "../../context/useUserContext";
import { isAdult } from "../../utils/AgeCalculation/ageCalculation";
import {
  generateImages,
  getCategories,
  getCollections,
  getPegiOptions,
} from "../../utils/mockData.generator";
import { ImageData } from "../../types/imagesType/ImagesType";

export const Galerie = () => {
  const [images] = useState<ImageData[]>(() => generateImages(25));
  const { user, logged } = useUserContext();
  const canViewPegi18 = Boolean(logged) && isAdult(user?.birthDate);

  const { filteredImages, filterCriteria, updateFilter, resetFilters } =
    useImageFilter(images, { canViewPegi18 });

  const options = [
    {
      label: "Collections",
      collections: getCollections(),
      entity: filterCriteria.collection,
      setEntity: (value: string | undefined) =>
        updateFilter({ collection: value }),
    },
    {
      label: "Catégories",
      collections: getCategories(),
      entity: filterCriteria.category,
      setEntity: (value: string | undefined) =>
        updateFilter({ category: value }),
    },
    {
      label: "PEGI",
      collections: getPegiOptions(),
      entity: filterCriteria.pegi,
      setEntity: (value: string | undefined) => updateFilter({ pegi: value }),
    },
  ];

  return (
    <section>
      <h1 className="hidden text-4xl font-bold text-center">Galerie</h1>
      <div className="min-h-[100px] mb-6">
        <FilterBar
          options={options}
          filterAction={() => {
            /* optional apply action */
          }}
          ResetAction={resetFilters}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {filteredImages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Aucune image ne correspond aux critères sélectionnés.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Effacer les filtres
            </button>
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-auto gap-6 justify-items-center">
            {filteredImages.map((image) => (
              <li key={image.id}>
                <ImageComponent
                  id={image.id}
                  title={image.title}
                  resolution={image.resolution}
                  pegi18={image.pegi18}
                  src={image.src}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
