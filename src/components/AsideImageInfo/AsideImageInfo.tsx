import { useState } from "react";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { BsArrowsFullscreen } from "react-icons/bs";

import { PurityType } from "../../types/purityType/purityType";
import { AvatarType } from "../../types/avatarType/avatarType";

import { Avatar } from "../Avatar/Avatar";
interface AsideImageInfo {
  id: number;
  resolution: number | string;
}

interface propertiesType {
  uploader: AvatarType;
  category: string;
  purity: PurityType;
  size: number;
  views: number;
  favorites: number;
  link: string;
}

export const AsideImageInfo = ({ id, resolution }: AsideImageInfo) => {
  const [toggle, setToogle] = useState<boolean>(true);
  const [tagsCollapsed, setTagsCollapsed] = useState<boolean>(false);
  const [propertiesCollapsed, setPropertiesCollapsed] =
    useState<boolean>(false);
  const [toolsCollapsed, setToolsCollapsed] = useState<boolean>(false);

  const tags: string[] = [
    "Nature",
    "Landscape",
    "Portrait",
    "Architecture",
    "Street",
    "Wildlife",
    "Abstract",
    "Vintage",
    "Black&White",
    "Sunset",
    "Urban",
    "Macro",
    "Travel",
    "Art",
    "Photography",
  ];

  const Properties: propertiesType = {
    uploader: {
      userName: "mockUser",
      displayName: true,
      imgSrc: "https://example.com/avatar.jpg",
    },
    category: "Nature",
    purity: "SFW",
    size: 2048576,
    views: 1250,
    favorites: 89,
    link: "https://example.com/image.jpg",
  };

  const fullScreen = () => {
    console.log("Full Screen");
  };

  return (
    <aside
      data-testid="aside-image-info-bar"
      className={`bg-[#F1F1F1] dark:bg-[#1B1B1B] h-full ${toggle ? "w-6/12  md:w-3/12 lg:w-[280px]" : "w-0"}  relative`}
    >
      <button
        data-testid="toogle-button-aside-image-info-bar"
        onClick={() => {
          setToogle((toggle) => !toggle);
        }}
        className="rounded-full rounded-l-none w-[35px] h-auto 
        bg-[#F1F1F1] dark:bg-[#1B1B1B] dark:text-white p-2 absolute -right-8 top-[34px]"
      >
        {toggle ? <BiArrowFromRight /> : <BiArrowFromLeft />}
      </button>
      <div className="flex flex-col h-full overflow-y-auto">
        <div
          data-testid="aside-image-info-bar-resolution"
          className="w-full h-auto flex justify-center flex-shrink-0"
        >
          <h2 className="my-4 text-xl md:text-3xl dark:text-white">
            {resolution || "3840 x 2046"}
          </h2>
        </div>

        <div
          data-testid="aside-image-info-bar-tags"
          className="w-full pl-4 py-1 flex-shrink-0"
        >
          <h2
            className="text-lg text-bluelight mt-1 mb-3 flex items-center gap-1 hover:cursor-pointer"
            onClick={() => setTagsCollapsed(!tagsCollapsed)}
          >
            {tagsCollapsed ? (
              <FaChevronRight className="transition-transform" />
            ) : (
              <FaChevronDown className="transition-transform" />
            )}
            Tags
          </h2>

          <div
            className={`w-full overflow-hidden transition-all duration-300 ${
              tagsCollapsed ? "max-h-0" : "max-h-[300px] overflow-y-auto"
            }`}
            data-testid="aside-image-info-bar-tags-list"
          >
            <ul
              className="flex flex-wrap gap-2 pb-2"
              data-testid="aside-image-info-list-tags"
            >
              {tags?.map((val, index) => (
                <li
                  className="hover:cursor-pointer bg-[#293033] hover:bg-[#3D5C3D] 
          text-greenlight h-fit w-fit p-1 
          rounded-tl-md rounded-br-md shadow-sm text-xs"
                  key={index}
                >
                  {val}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          data-testid="aside-image-info-bar-properties"
          className="w-full pl-4 py-1 flex-shrink-0"
        >
          <h2
            className="text-lg text-bluelight mt-1 mb-3 flex items-center gap-1 hover:cursor-pointer"
            onClick={() => setPropertiesCollapsed(!propertiesCollapsed)}
          >
            {propertiesCollapsed ? (
              <FaChevronRight className="transition-transform" />
            ) : (
              <FaChevronDown className="transition-transform" />
            )}
            Properties
          </h2>

          <div
            className={`w-full overflow-hidden transition-all duration-300 ${
              propertiesCollapsed ? "max-h-0" : "max-h-[200px] overflow-y-auto"
            }`}
          >
            <div className="pb-2">
              <div className="space-y-2 text-sm dark:text-white">
                <div className="grid grid-cols-2">
                  <span className="text-gray-600 dark:text-gray-400">
                    Uploader:
                  </span>
                  <Avatar
                    imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf5WOzvXp8VmmLciCxW96u9j_FyNaXulh_ig&s"
                    userName="Mon user"
                    displayName={true}
                  />
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-gray-600 dark:text-gray-400 mr-2">
                    Category:
                  </span>
                  <span className="font-medium">{Properties?.category}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-gray-600 dark:text-gray-400 mr-2">
                    Purity:
                  </span>
                  <span className="font-medium">{Properties?.purity}</span>
                </div>
                <div className="grid grid-cols-2 ">
                  <span className="text-gray-600 dark:text-gray-400 mr-2">
                    Size:
                  </span>
                  <span className="font-medium">
                    {(Properties?.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
                <div className="grid grid-cols-2 ">
                  <span className="text-gray-600 dark:text-gray-400 mr-2">
                    Views:
                  </span>
                  <span className="font-medium">{Properties?.views}</span>
                </div>
                <div className="grid grid-cols-2 ">
                  <span className="text-gray-600 dark:text-gray-400 mr-2">
                    Favorites:
                  </span>
                  <span className="font-medium">{Properties?.favorites}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          data-testid="aside-image-info-bar-tools"
          className="w-full pl-4 py-1 flex-shrink-0"
        >
          <h2
            className="text-lg text-bluelight mt-1 mb-3 flex items-center gap-1 hover:cursor-pointer"
            onClick={() => setToolsCollapsed(!toolsCollapsed)}
          >
            {toolsCollapsed ? (
              <FaChevronRight className="transition-transform" />
            ) : (
              <FaChevronDown className="transition-transform" />
            )}
            Tools
          </h2>

          <div
            className={`w-full overflow-hidden transition-all duration-300 ${
              toolsCollapsed ? "max-h-0" : "max-h-[100px] overflow-y-auto"
            }`}
          >
            <div className="pb-2">
              <div
                onClick={() => {
                  fullScreen();
                }}
                className="flex items-center  hover:cursor-pointer"
              >
                <BsArrowsFullscreen className="dark:text-white" size={12} />
                <p className="ml-2 dark:text-white">Full Screen</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
