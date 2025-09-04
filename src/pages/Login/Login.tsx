import { useState } from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { Toast } from "../../components/Toast/Toast";
import { useUserContext } from "../../context/useUserContext";
import { useNavigate } from "react-router-dom";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";
interface FormData {
  email: string;
  password: string;
  server?: string;
}

interface ServerError {
  type: string;
  msg: string;
  path: string;
  location: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<Partial<FormData>>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [fail, setFail] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setUser, setLogged } = useUserContext();
  const navigate = useNavigate();
  /**
   * Handles the form input changes.
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  /**
   * Check the input for data validation before subimtting the form
   */
  const checkInput = () => {
    const newErrors: Partial<FormData> = {};
    const { email, password } = formData;

    if (!email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles the form submission for user login.
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!checkInput()) {
      return;
    } else {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setSuccess(true);
          console.log(data);
          sessionStorage.setItem("token", data.accessToken);
          setUser(data.user);
          setLogged(true);
          navigate("/profile");
        } else {
          const errorData = await response.json();
          if (Array.isArray(errorData)) {
            errorData.forEach((err: ServerError) => {
              setError((prev) => ({ ...prev, [err.path]: err.msg }));
            });
          } else {
            setError({
              server:
                errorData.message ||
                "Une erreur s'est produite. Veuillez réessayer.",
            });
          }
          setFail(true);
        }
      } catch (error) {
        console.error("Error:", error);
        setError({ server: "Une erreur s'est produite. Veuillez réessayer." });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <section className="min-h-screen p-6 flex items-center justify-center bg-[#f1f1f1] dark:bg-[#303030] relative">
      {/* Work in progress */}
      {success && (
        <Toast
          position="top-0 right-0"
          type="success"
          message="Connexion réussie"
          duration={3000}
          onClose={() => {
            setSuccess(false);
          }}
        />
      )}
      {fail && (
        <Toast
          position="top-0 right-0"
          type="error"
          message="Échec de la connexion. Veuillez réessayer."
          duration={3000}
          onClose={() => {
            setFail(false);
          }}
        />
      )}
      <h1 className="hidden text-3xl font-bold mb-6">Connexion</h1>
      <div className="w-full md:w-[400px] lg:w-[600px] bg-[#ffffff] dark:bg-[#3f55cf] rounded shadow-lg p-4 px-4 md:p-12 mb-6">
        <h1 className="dark:text-white text-2xl text-center font-bold mb-6">
          Connexion
        </h1>
        <form onSubmit={handleSubmit}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {error.email && (
                  <p className="text-red-500 text-sm">{error.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black dark:text-white"
                >
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 "
                  />
                  {showPassword ? (
                    <HiOutlineEye
                      className="cursor-pointer text-gray-500 hover:text-gray-700 absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    />
                  ) : (
                    <HiOutlineEyeOff
                      className="cursor-pointer text-gray-500 hover:text-gray-700 absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    />
                  )}
                </div>
                {error.password && (
                  <p className="text-red-500 text-sm">{error.password}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Se connecter
              </button>
              <div className="mt-6 text-center text-sm text-white">
                Don't have an account ?
                <a
                  onClick={() => navigate("/inscription")}
                  className="text-white font-medium ml-2 hover:underline cursor-pointer"
                >
                  S'inscire
                </a>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
};

export default Login;
