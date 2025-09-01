import { useState } from "react";
import { useGetCityHook } from "../../hooks/usegetCityHook/useGetCityHook";
import { useGetCountry } from "../../hooks/useGetCountry/useGetCountry";
import { Toast } from "../../components/Toast/Toast";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";

interface formDataType {
  pseudo: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  country: string;
  city: string;
  acceptPrivacyPolicy: boolean;
  server?: string; // Pour les erreurs générales du serveur
}

interface ServerError {
  type: string;
  msg: string;
  path: string;
  location: string;
}

export const SignUp = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState<formDataType>({
    pseudo: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    country: "",
    city: "",
    acceptPrivacyPolicy: false,
  });
  const [errors, setErrors] = useState<Partial<formDataType>>({});

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [fail, setFail] = useState<boolean>(false);

  const {
    countries,
    loading: asLoadingCountrie,
    error: errorCountrie,
  } = useGetCountry();
  const {
    cities,
    loading: asLoadingCities,
    error: errorCities,
  } = useGetCityHook(formData?.country);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear error when user starts typing
    if (errors[name as keyof formDataType]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<formDataType> = {};

    if (!formData.pseudo.trim()) newErrors.pseudo = "Le pseudo est requis";
    if (!formData.firstName.trim())
      newErrors.firstName = "Le prénom est requis";
    if (!formData.lastName.trim()) newErrors.lastName = "Le nom est requis";
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    if (!formData.birthDate)
      newErrors.birthDate = "La date de naissance est requise";
    if (!formData.country) newErrors.country = "Le pays est requis";
    if (!formData.city) newErrors.city = "La ville est requise";
    if (!formData.acceptPrivacyPolicy) {
      newErrors.acceptPrivacyPolicy =
        "Vous devez accepter la politique de confidentialité";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form is valid, submitting:", formData);

      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess(true);
          navigate("/login");
          // Redirection ou message de succès
        } else {
          // Traiter les erreurs du serveur
          if (data.errors && Array.isArray(data.errors)) {
            const serverErrors: Partial<formDataType> = {};

            data.errors.forEach((error: ServerError) => {
              // Mapper les noms de champs du backend vers le frontend
              const fieldMap: { [key: string]: keyof formDataType } = {
                hasAcceptedTerms: "acceptPrivacyPolicy",
                acceptPrivacyPolicy: "acceptPrivacyPolicy",
                pseudo: "pseudo",
                firstName: "firstName",
                lastName: "lastName",
                email: "email",
                password: "password",
                confirmPassword: "confirmPassword",
                birthDate: "birthDate",
                country: "country",
                city: "city",
              };

              const frontendField = fieldMap[error.path];
              if (frontendField) {
                // Les erreurs serveur écrasent les erreurs locales
                serverErrors[frontendField] = error.msg;
              }
            });

            // Mettre à jour les erreurs avec celles du serveur
            setErrors((prev) => ({ ...prev, ...serverErrors }));
          } else {
            // Erreur générale
            setErrors((prev) => ({
              ...prev,
              server: data.message || "Erreur lors de l'inscription",
            }));
          }
        }
      } catch (error) {
        console.error("Erreur réseau:", error);
        setErrors((prev) => ({
          ...prev,
          server: "Erreur de connexion au serveur",
        }));
        setFail(true);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="min-h-screen p-6 flex items-center justify-center bg-[#f1f1f1] dark:bg-[#303030] relative">
      {success && (
        <Toast
          type={"success"}
          message={
            "Inscription réussie ! Vous allez être redirigé vers la page d'accueil."
          }
          duration={3000}
          position={"top-0 right-0"}
        />
      )}

      {fail && (
        <Toast
          type={"error"}
          message={
            "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
          }
          duration={3000}
          position={"top-0 right-0"}
        />
      )}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className=" mx-auto">
          <div>
            <div className="bg-[#ffffff] dark:bg-[#3f55cf] rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-4">
                <div className="bg-hide lg:bg-hero bg-cover bg-center bg-no-repeat lg:col-span-2 text-gray-600">
                  <p className="dark:text-white font-medium text-lg">
                    Inscription
                  </p>
                  <p className="dark:text-white">
                    Créez votre compte pour rejoindre la plateforme War House.
                  </p>
                </div>

                <div className="lg:col-span-2">
                  {/* Affichage des erreurs générales du serveur */}
                  {errors.server && (
                    <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                      {errors.server}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                      {/* Pseudo */}
                      <div className="md:col-span-2">
                        <label className="dark:text-white" htmlFor="pseudo">
                          Pseudo *
                        </label>
                        <input
                          onChange={handleChange}
                          type="text"
                          name="pseudo"
                          id="pseudo"
                          className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${
                            errors.pseudo ? "border-red-500" : "border-gray-300"
                          }`}
                          value={formData.pseudo}
                          placeholder="Votre pseudo"
                        />
                        {errors.pseudo && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.pseudo}
                          </p>
                        )}
                      </div>

                      {/* Prénom */}
                      <div className="md:col-span-1">
                        <label className="dark:text-white" htmlFor="firstName">
                          Prénom *
                        </label>
                        <input
                          onChange={handleChange}
                          type="text"
                          name="firstName"
                          id="firstName"
                          className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${
                            errors.firstName
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          value={formData.firstName}
                          placeholder="Votre prénom"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      {/* Nom */}
                      <div className="md:col-span-1">
                        <label className="dark:text-white" htmlFor="lastName">
                          Nom *
                        </label>
                        <input
                          onChange={handleChange}
                          type="text"
                          name="lastName"
                          id="lastName"
                          className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${
                            errors.lastName
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          value={formData.lastName}
                          placeholder="Votre nom"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.lastName}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="md:col-span-2">
                        <label className="dark:text-white" htmlFor="email">
                          Adresse Email *
                        </label>
                        <input
                          onChange={handleChange}
                          type="email"
                          name="email"
                          id="email"
                          className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                          value={formData.email}
                          placeholder="email@exemple.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Mot de passe */}
                      <div className="md:col-span-1">
                        <label className="dark:text-white" htmlFor="password">
                          Mot de passe *
                        </label>
                        <input
                          onChange={handleChange}
                          type="password"
                          name="password"
                          id="password"
                          className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${
                            errors.password
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          value={formData.password}
                          placeholder="••••••••"
                        />
                        {errors.password && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.password}
                          </p>
                        )}
                      </div>

                      {/* Confirmation mot de passe */}
                      <div className="md:col-span-1">
                        <label
                          className="dark:text-white"
                          htmlFor="confirmPassword"
                        >
                          Confirmer le mot de passe *
                        </label>
                        <input
                          onChange={handleChange}
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword"
                          className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${
                            errors.confirmPassword
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          value={formData.confirmPassword}
                          placeholder="••••••••"
                        />
                        {errors.confirmPassword && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>

                      {/* Date de naissance */}
                      <div className="md:col-span-2">
                        <label className="dark:text-white" htmlFor="birthDate">
                          Date de naissance *
                        </label>
                        <input
                          onChange={handleChange}
                          type="date"
                          name="birthDate"
                          id="birthDate"
                          className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${
                            errors.birthDate
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          value={formData.birthDate}
                        />
                        {errors.birthDate && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.birthDate}
                          </p>
                        )}
                      </div>

                      {/* Pays */}
                      <div className="md:col-span-1">
                        <label className="dark:text-white" htmlFor="country">
                          Pays *
                        </label>
                        <select
                          name="country"
                          onChange={handleChange}
                          id="country"
                          className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer ${
                            errors.country
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          value={formData.country}
                        >
                          <option value="">Sélectionnez un pays</option>
                          {asLoadingCountrie ? (
                            <option>Chargement...</option>
                          ) : (
                            countries?.map(
                              (
                                country: { name: string; name_fr: string },
                                id: number
                              ) => (
                                <option key={id} value={country.name}>
                                  {country.name_fr || country.name}
                                </option>
                              )
                            )
                          )}
                        </select>
                        {errors.country && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.country}
                          </p>
                        )}
                      </div>

                      {/* Ville */}
                      <div className="md:col-span-1">
                        <label className="dark:text-white" htmlFor="city">
                          Ville *
                        </label>
                        <select
                          id="city"
                          name="city"
                          onChange={handleChange}
                          disabled={!formData.country}
                          className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer ${
                            errors.city ? "border-red-500" : "border-gray-300"
                          } ${!formData.country ? "opacity-50" : ""}`}
                          value={formData.city}
                        >
                          <option value="">Sélectionnez une ville</option>
                          {asLoadingCities ? (
                            <option>Chargement...</option>
                          ) : (
                            cities?.map((city: string, id: number) => (
                              <option key={id} value={city}>
                                {city}
                              </option>
                            ))
                          )}
                        </select>
                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.city}
                          </p>
                        )}
                      </div>

                      {/* Politique de confidentialité */}
                      <div className="md:col-span-2 mt-4">
                        <div className="flex items-start">
                          <input
                            onChange={handleChange}
                            type="checkbox"
                            name="acceptPrivacyPolicy"
                            id="acceptPrivacyPolicy"
                            className="mt-1 mr-2"
                            checked={formData.acceptPrivacyPolicy}
                          />
                          <label
                            className={`dark:text-white text-sm ${
                              errors.acceptPrivacyPolicy ? "text-red-500" : ""
                            }`}
                            htmlFor="acceptPrivacyPolicy"
                          >
                            J'accepte la{" "}
                            <a
                              href="/privacy-policy"
                              className="text-blue-600 dark:text-blue-200 hover:underline"
                            >
                              politique de confidentialité
                            </a>{" "}
                            et les{" "}
                            <a
                              href="/terms"
                              className="text-blue-600  dark:text-blue-200 hover:underline"
                            >
                              conditions d'utilisation
                            </a>{" "}
                            de War House *
                          </label>
                        </div>
                        {errors.acceptPrivacyPolicy && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.acceptPrivacyPolicy}
                          </p>
                        )}
                      </div>

                      {/* Boutons */}
                      <div className="md:col-span-2 text-left">
                        <div className="flex items-center space-x-4 justify-start mt-6">
                          <button
                            type="submit"
                            className="flex items-center justify-center bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors duration-200"
                          >
                            Créer mon compte
                          </button>

                          <div className="flex items-center">
                            <span className="dark:text-white text-sm">
                              Déjà un compte ?{" "}
                              <a
                                href="/login"
                                className="text-blue-600 dark:text-blue-200 hover:underline"
                              >
                                Se connecter
                              </a>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
