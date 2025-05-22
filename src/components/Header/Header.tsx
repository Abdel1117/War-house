import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { ThemeButton } from "../ThemeButton/ThemeButton";
import { FaRegCircleUser } from "react-icons/fa6";
const Header = () => {
  const [toogle, setToogle] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error } = useAppSelector(
    (state) => state.auth
  );
  const resetToogle = () => {
    const innerWidth = window.innerWidth;

    if (innerWidth >= 760) setToogle(false);
  };

  useEffect(() => {
    window.addEventListener("resize", resetToogle);

    return () => window.removeEventListener("resize", resetToogle);
  }, []);

  return (
    /* navbar goes here
     */
    <>
      <nav className="bg-gray-100 dark:bg-gray-800 ">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              {/*   <!-- logo --> */}
              <div>
                <a
                  onClick={() => navigate("/")}
                  className="flex items-center py-5 px-2 text-gray-700 dark:text-white hover:dark:text-white hover:text-gray-900 cursor-pointer"
                >
                  <svg
                    className="h-6 w-6 mr-1 text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  <span className="font-bold">War House</span>
                </a>
              </div>

              {/*  <!-- primary nav --> */}
              <div className="hidden md:flex items-center">
                <a
                  onClick={() => navigate("/")}
                  className="mr-5 text-gray-700 dark:text-white hover:dark:text-white hover:text-gray-900  cursor-pointer"
                >
                  Accueil
                </a>
                <a
                  onClick={() => navigate("/inscription")}
                  className="mr-5 text-gray-700 dark:text-white hover:dark:text-white hover:text-gray-900  cursor-pointer"
                >
                  Inscription
                </a>
                <a
                  onClick={() => navigate("/galerie")}
                  className="mr-5 text-gray-700 dark:text-white hover:dark:text-white hover:text-gray-900  cursor-pointer"
                >
                  Galerie
                </a>
              </div>
            </div>

            {/*  <!-- secondary nav --> */}
            <div className="hidden md:flex items-center space-x-1">
              {isAuthenticated ? (
                <a
                  onClick={() => navigate("/userDashBoard")}
                  className="mr-5 mt-2  text-gray-700 dark:text-white hover:dark:text-white hover:text-gray-900  cursor-pointer"
                >
                  <FaRegCircleUser size={20} />
                </a>
              ) : (
                <a
                  onClick={() => navigate("/login")}
                  className="mr-5 mt-2 text-gray-700 dark:text-white hover:dark:text-white hover:text-gray-900  cursor-pointer"
                >
                  Login
                </a>
              )}

              <ThemeButton />
            </div>

            {/*  <!-- mobile button goes here --> */}
            <div className="md:hidden flex items-center">
              <button className="mobile-menu-button">
                <svg
                  onClick={() => setToogle(!toogle)}
                  className="w-6 h-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/*  <!-- mobile menu --> */}
        {toogle && (
          <div className="p-5 md:hidden transition-all duration-150 ease-in-out">
            <a
              onClick={() => navigate("/")}
              className="block py-2 px-4 text-sm text-white  cursor-pointer"
            >
              Accueil
            </a>
            <a
              onClick={() => navigate("/inscription")}
              className="block py-2 px-4 text-sm text-white  cursor-pointer"
            >
              Inscription
            </a>
            <a
              onClick={() => navigate("/galerie")}
              className="block py-2 px-4 text-sm text-white  cursor-pointer"
            >
              Galerie
            </a>
            <a
              onClick={() => navigate("/login")}
              className="block py-2 px-4 text-sm text-white  cursor-pointer"
            >
              Login
            </a>
          </div>
        )}
      </nav>
    </>
  );
};
export default Header;
