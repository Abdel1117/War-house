import React, { useState, useEffect } from "react";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { GrFavorite } from "react-icons/gr";
export const Galerie = () => {
  return (
    <section>
      <h1 className="text-4xl font-bold mb-4 hidden">Galerie</h1>
      <div className="min-h-[100px]">
        <FilterBar />
      </div>
      <div className="max-w-5xl lg:max-w-full mx-auto  gap-5  px-2 sm:px-16 md:px-32  ">
        <ul className="flex flex-wrap justify-center align-center gap-5">
          {Array.from({ length: 25 }).map((_, index) => (
            <li key={index}>
              <figure className="relative group ">
                <a
                  className="absolute -top-2 -right-2 hidden group-hover:block"
                  href=""
                >
                  <GrFavorite className="text-2xl text-white bg-black rounded-full p-1" />
                </a>
                <img
                  className="w-[300px] h-[200px] rounded-md cursor-pointer"
                  src="https://cryhavoc.blog/wp-content/uploads/2019/11/caprax-2.jpg?w=804"
                  alt="Berzerk Khorne"
                />
                <figcaption className="hidden group-hover:block absolute bottom-0 w-full text-center mt-2 bg-[rgba(0,0,0,0.5)] text-white p-2 ">
                  <p className="text-sm ">1920x1080</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
