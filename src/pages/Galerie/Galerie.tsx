import React, { useState, useEffect } from "react";
import { FilterBar } from "../../components/FilterBar/FilterBar";

export const Galerie = () => {
  return (
    <section>
      <h1 className="text-4xl font-bold mb-4 hidden">Galerie</h1>
      <div>
        <FilterBar />
      </div>
      <div className="max-w-5xl lg:max-w-full mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5  border-2 border-white p-4">
        <img
          className="w-[300px] h-[200px] "
          src="https://cryhavoc.blog/wp-content/uploads/2019/11/caprax-2.jpg?w=804"
          alt="Berzerk Khorne"
        />
        <img
          className="w-[300px] h-[200px] "
          src="https://cryhavoc.blog/wp-content/uploads/2019/11/caprax-2.jpg?w=804"
          alt="Berzerk Khorne"
        />

        <img
          className="w-[300px] h-[200px] "
          src="https://cryhavoc.blog/wp-content/uploads/2019/11/caprax-2.jpg?w=804"
          alt="Berzerk Khorne"
        />
        <img
          className="w-[300px] h-[200px] "
          src="https://cryhavoc.blog/wp-content/uploads/2019/11/caprax-2.jpg?w=804"
          alt="Berzerk Khorne"
        />
        <img
          className="w-[300px] h-[200px] "
          src="https://cryhavoc.blog/wp-content/uploads/2019/11/caprax-2.jpg?w=804"
          alt="Berzerk Khorne"
        />
        <img
          className="w-[300px] h-[200px] "
          src="https://cryhavoc.blog/wp-content/uploads/2019/11/caprax-2.jpg?w=804"
          alt="Berzerk Khorne"
        />
        <img
          className="w-[300px] h-[200px] "
          src="https://cryhavoc.blog/wp-content/uploads/2019/11/caprax-2.jpg?w=804"
          alt="Berzerk Khorne"
        />
        <img
          className="w-[300px] h-[200px] "
          src="https://cryhavoc.blog/wp-content/uploads/2019/11/caprax-2.jpg?w=804"
          alt="Berzerk Khorne"
        />
        <img
          className="w-[300px] h-[200px] "
          src="https://cryhavoc.blog/wp-content/uploads/2019/11/caprax-2.jpg?w=804"
          alt="Berzerk Khorne"
        />
        <img
          className="w-[300px] h-[200px] "
          src="https://cryhavoc.blog/wp-content/uploads/2019/11/caprax-2.jpg?w=804"
          alt="Berzerk Khorne"
        />
        <img
          className="w-[300px] h-[200px] "
          src="https://cryhavoc.blog/wp-content/uploads/2019/11/caprax-2.jpg?w=804"
          alt="Berzerk Khorne"
        />
        <img
          className="w-[300px] h-[200px] "
          src="https://cryhavoc.blog/wp-content/uploads/2019/11/caprax-2.jpg?w=804"
          alt="Berzerk Khorne"
        />
      </div>
    </section>
  );
};
