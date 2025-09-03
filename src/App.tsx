import { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil/Accueil.tsx";
import Login from "./pages/Login/Login.tsx";
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.tsx";
import { themeContext } from "./context/ThemeContext.tsx";
import { SignUp } from "./pages/SignUp/SignUp.tsx";
import { Galerie } from "./pages/Galerie/Galerie.tsx";
import { Profile } from "./pages/Profile/Profile.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";

function App() {
  const theme = useContext(themeContext);

  useEffect(() => {
    const root = window.document.documentElement;
    theme?.theme === "light"
      ? root.classList.remove("dark")
      : root.classList.add("dark");
  }, [theme]);

  return (
    <>
      <Header />
      <ScrollToTop />
      <main className="min-h-[100vh] bg-[#FDFCFA] dark:bg-[#252525]">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/galerie" element={<Galerie />} />
          <Route path="/inscription" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
