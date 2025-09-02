import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import useThemeContext from "../../context/useThemeContext";
export const ThemeButton = () => {
  const { toggleTheme, theme } = useThemeContext();

  return (
    <>
      {theme == "light" ? (
        <IoSunnyOutline
          className="cursor-pointer mt-2"
          onClick={() => {
            toggleTheme();
          }}
          size={25}
        />
      ) : (
        <IoMoonOutline
          className="cursor-pointer text-white mt-2"
          onClick={() => {
            toggleTheme();
          }}
          size={25}
        />
      )}
    </>
    /*   <label className="relative inline-flex items-center cursor-pointer">
      <input
        onClick={() => toggleTheme()}
        className="sr-only peer"
        value=""
        type="checkbox"
      />
      <div className="mr-4 w-24 h-12 rounded-full ring-0 peer duration-500 outline-none bg-gray-200 overflow-hidden before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center before:content-['☀️'] before:absolute before:h-10 before:w-10 before:top-1/2 before:bg-white before:rounded-full before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-x-full shadow-lg shadow-gray-400 peer-checked:shadow-lg peer-checked:shadow-gray-700 peer-checked:bg-[#383838] after:content-['🌑'] after:absolute after:bg-[#1d1d1d] after:rounded-full after:translate-x-full after:translate-y-1 after:w-10 after:h-10 after:opacity-0 after:transition-all after:duration-700 peer-checked:after:opacity-100 peer-checked:after:rotate-180 peer-checked:after:translate-x-0"></div>
    </label> */
  );
};
