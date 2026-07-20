import React from "react";
import { AsideImageInfo } from "../../components/AsideImageInfo/AsideImageInfo";

export const Image = () => {
  return (
    <section className="flex h-[calc(100vh-64px)] ">
      {/* Info of the image displayed in the Aside info bare */}
      <AsideImageInfo />
      {/* ================================================== */}

      {/* Main section where image is displayed */}
      <div className="flex-1 flex items-center justify-center ">
        <img
          className="max-w-[95%] max-h-[95%] object-contain "
          src="https://w.wallhaven.cc/full/je/wallhaven-jew1mq.png"
          alt="Image"
        />
      </div>
      {/* ================================================== */}
    </section>
  );
};
