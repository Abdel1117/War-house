import React from "react";
import { GrFavorite, GrTag } from "react-icons/gr";

/* Props for the ImageComponent */
interface ImageComponentProps {
  id: number;
  title: string;
  resolution: string;
  category: string[];
  favorite: number;
  pegi18: boolean;
}

export const ImageComponent: React.FC<ImageComponentProps> = ({
  id = 0,
  title = "Titre de l'image",
  resolution = "1920x1080",
  category = ["Catégorie 1", "Catégorie 2"],
  favorite = 0,
  pegi18 = false,
}) => {
  return (
    <figure className="relative group">
      <a className="absolute -top-2 -right-2 hidden group-hover:block" href="">
        <GrFavorite className="text-2xl text-white bg-black rounded-full p-1" />
      </a>
      <img
        className="w-[300px] h-[200px] rounded-md cursor-pointer"
        src="https://cryhavoc.blog/wp-content/uploads/2019/11/caprax-2.jpg?w=804"
        alt={title}
      />
      <figcaption className="hidden group-hover:block absolute bottom-0 w-full text-center mt-2 bg-[rgba(0,0,0,0.5)] text-white p-2 ">
        <p className="text-sm ">{resolution}</p>
        <GrTag className="w-[25px] h-[25px] p-1 absolute right-1 bottom-1 text-white hover:text-green-400  hover:cursor-pointer transition-colors duration-200" />{" "}
      </figcaption>
    </figure>
  );
};
