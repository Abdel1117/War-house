import React from "react";
import { GrFavorite, GrTag } from "react-icons/gr";
import { ImageDisplayProps } from "../../types/imagesType/ImagesType";
import { useNavigate } from "react-router-dom";

export const ImageComponent: React.FC<ImageDisplayProps> = ({
  id,
  title = "Titre de l'image",
  resolution = "1920x1080",
  pegi18 = false,
  src = "https://cryhavoc.blog/wp-content/uploads/2019/11/caprax-2.jpg?w=804",
}) => {
  const isPegi18 = pegi18 ? "border-4 border-yellow-500 rounded-xl" : "";

  const navigate = useNavigate();

  return (
    <>
      <figure className={`relative group ${isPegi18}`}>
        <a className="absolute -top-2 -right-2 hidden group-hover:block">
          <GrFavorite className="text-2xl text-white bg-black rounded-full p-1 hover:text-red-400 transition-colors duration-200" />
        </a>
        <a
          onClick={() => {
            console.log("clmiekd");
            navigate(`/image/${id}`);
          }}
        >
          <img
            className="w-[300px] h-[200px] rounded-md cursor-pointer object-cover"
            src={src}
            alt={title}
          />
        </a>
        <figcaption className="hidden group-hover:block absolute bottom-0 w-full text-center mt-2 bg-[rgba(0,0,0,0.5)] text-white p-2 ">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs ">{resolution}</p>
          <GrTag className="w-[25px] h-[25px] p-1 absolute right-1 bottom-1 text-white hover:text-green-400  hover:cursor-pointer transition-colors duration-200" />
        </figcaption>
      </figure>
    </>
  );
};
