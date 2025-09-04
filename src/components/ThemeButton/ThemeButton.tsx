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
  );
};
