import React, { useState, useEffect } from "react";
import { FilterBar } from "../../components/FilterBar/FilterBar";

import { ImageComponent } from "../../components/ImageComponent/ImageComponent";
export const Galerie = () => {
  const [selectedCollection, setSelectedCollection] = useState<
    string | undefined
  >(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const [selectedPegi, setSelectedPegi] = useState<string | undefined>(
    undefined
  );
  const collectionsMock: string[] = ["Figurines, Décors", "Jeux", "Parties"];
  const categoriesMock: string[] = [
    "Médiéval",
    "Fantastique",
    "Science-Fiction",
    "Historique",
    "Moderne",
    "Post-Apo",
    "Steampunk",
  ];
  const pegiMock: string[] = ["3", "7", "12", "16", "18"];

  const categoryOptions = {
    label: "Catégories",
    collections: categoriesMock,
    entity: selectedCategory,
    setEntity: setSelectedCategory,
  };
  const collectionOptions = {
    label: "Collections",
    collections: collectionsMock,
    entity: selectedCollection,
    setEntity: setSelectedCollection,
  };
  const pegiOptions = {
    label: "PEGI",
    collections: pegiMock,
    entity: selectedPegi,
    setEntity: setSelectedPegi,
  };
  const options = [collectionOptions, categoryOptions, pegiOptions];

  const filterImages = (
    selectedCollection: string | undefined,
    selectedCategory: string | undefined,
    selectedPegi: string | undefined
  ) => {
    console.log(
      `Filtre.... ${selectedCollection} - ${selectedCategory} - ${selectedPegi}`
    );
    // Implement filtering logic here based on selectedCollection, selectedCategory, and selectedPegi
    /*  images.filter((image) => {
      return (
        (selectedCollection ? image.collection === selectedCollection : true) &&
        (selectedCategory ? image.category === selectedCategory : true) &&
        (selectedPegi ? image.pegi === selectedPegi : true)
      );
    }); */
  };
  const resetFilter = (): void => {
    setSelectedCollection(undefined);
    setSelectedCategory(undefined);
    setSelectedPegi(undefined);
  };
  return (
    <section>
      <h1 className="text-4xl font-bold mb-4 hidden">Galerie</h1>
      <div className="min-h-[100px]">
        <FilterBar
          options={options}
          filterAction={() =>
            filterImages(selectedCollection, selectedCategory, selectedPegi)
          }
          ResetAction={() => resetFilter()}
        />
      </div>
      <div className="max-w-5xl lg:max-w-full mx-auto  gap-5  px-2 sm:px-16 md:px-32  ">
        <ul className="flex flex-wrap justify-center align-center gap-5">
          {Array.from({ length: 25 }).map((_, index) => (
            <li key={index}>
              <ImageComponent
                id={index}
                title={`Image ${index + 1}`}
                resolution={
                  Math.round(Math.random() * 4000) +
                  "x" +
                  Math.round(Math.random() * 4000)
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
