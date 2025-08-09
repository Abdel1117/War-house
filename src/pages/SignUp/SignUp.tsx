import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import { useGetCityHook } from "../../hooks/usegetCityHook/useGetCityHook";
import { useGetCountry } from "../../hooks/useGetCountry/useGetCountry";

interface formDataType {
  full_name: string;
  email: string;
  address: string;
  city: string;
  country: string;
}

export const SignUp = () => {
  const [formData, setFormData] = useState<formDataType>({
    full_name: "",
    email: "",
    address: "",
    city: "",
    country: "",
  });
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
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="min-h-screen p-6 flex items-center justify-center bg-[#f1f1f1] dark:bg-[#303030]">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <div className="bg-[#ffffff] dark:bg-[#3f55cf] rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="dark:text-white font-medium text-lg">
                  Inscription
                </p>
                <p className="dark:text-white ">
                  Informations pour vous inscrire à la plateforme.
                </p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-12">
                    <label className="dark:text-white" htmlFor="full_name">
                      Nom Complet
                    </label>
                    <input
                      onChange={(e) => handleChange(e)}
                      type="text"
                      name="full_name"
                      id="full_name"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.full_name}
                    />
                  </div>

                  <div className="md:col-span-12">
                    <label className="dark:text-white" htmlFor="email">
                      Adresse Email
                    </label>
                    <input
                      onChange={(e) => handleChange(e)}
                      type="text"
                      name="email"
                      id="email"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.email}
                      placeholder="email@domain.com"
                    />
                  </div>
                  <div className="md:col-span-12">
                    <label className="dark:text-white" htmlFor="city">
                      Pays
                    </label>
                    <select
                      name="country"
                      onChange={(e) => handleChange(e)}
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer"
                    >
                      {asLoadingCountrie ? (
                        <option>Loading...</option>
                      ) : (
                        countries?.map((countrie: any, id: number) => (
                          <option key={id} value={countrie.name}>
                            {countrie.name_fr}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  <div className="md:col-span-12">
                    <label className="dark:text-white" htmlFor="city">
                      Ville
                    </label>
                    <select
                      id="countries"
                      name="city"
                      onChange={(e) => handleChange(e)}
                      disabled={formData.country.length === 0 ? true : false}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer"
                    >
                      {asLoadingCities && cities != null ? (
                        <option>Loading...</option>
                      ) : (
                        cities?.map((city: any, id: number) => (
                          <option key={id} value={city}>
                            {city}
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  <div className="md:col-span-5 text-left">
                    <div className="flex items-center space-x-4 justify-start mt-5">
                      <button className=" flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Envoyer
                      </button>

                      {/*  <button className="flex  items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Connectez-vous avec Google
                        <FcGoogle size={15} className="text-2xl ml-2" />
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
