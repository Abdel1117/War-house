import { FilterBar } from "../../components/FilterBar/FilterBar";
import { ImageComponent } from "../../components/ImageComponent/ImageComponent";
import { LoadingTrigger } from "../../components/LoadingTrigger/LoadingTrigger";
import { useImageFilter } from "../../hooks/useImageFilter/useImageFilter";
import { useInfiniteImages } from "../../hooks/useInfiniteImages/useInfiniteImages";
import { useUserContext } from "../../context/useUserContext";
import { isAdult } from "../../utils/AgeCalculation/ageCalculation";
import {
  getCategories,
  getCollections,
  getPegiOptions,
} from "../../utils/mockData.generator";

export const Galerie = () => {
  const { user, logged } = useUserContext();
  const canViewPegi18 = Boolean(logged) && isAdult(user?.birthDate);

  // Hook pour les images infinies
  const { images, loading, error, hasMore, loadMore, reset } =
    useInfiniteImages({ limit: 20 });

  // Hook pour le filtrage
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

  const handleResetAll = () => {
    resetFilters();
    reset(); // Recharge depuis le début
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-red-500 mb-4">Erreur: {error}</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <section className="min-h-[100vh] pb-4">
      <h1 className="hidden text-4xl font-bold text-center">Galerie</h1>

      <div className="min-h-[100px] mb-6">
        <FilterBar
          options={options}
          filterAction={() => {}}
          ResetAction={handleResetAll}
        />
      </div>

      <div className="max-w-7xl mx-auto px-2 xl:p-0">
        {filteredImages.length === 0 && !loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Aucune image ne correspond aux critères sélectionnés.
            </p>
            <button
              onClick={handleResetAll}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Effacer les filtres
            </button>
          </div>
        ) : (
          <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
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

            <LoadingTrigger
              onLoad={loadMore}
              loading={loading}
              hasMore={hasMore}
            />
          </>
        )}
      </div>
    </section>
  );
};
