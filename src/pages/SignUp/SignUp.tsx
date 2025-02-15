import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

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
                  Personal Details
                </p>
                <p className="dark:text-white ">
                  Please fill out all the fields.
                </p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label className="dark:text-white" htmlFor="full_name">
                      Full Name
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

                  <div className="md:col-span-5">
                    <label className="dark:text-white" htmlFor="email">
                      Email Address
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

                  <div className="md:col-span-3">
                    <label className="dark:text-white" htmlFor="address">
                      Address / Street
                    </label>
                    <input
                      onChange={(e) => handleChange(e)}
                      type="text"
                      name="address"
                      id="address"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.address}
                      placeholder=""
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="dark:text-white" htmlFor="city">
                      City
                    </label>
                    <input
                      onChange={(e) => handleChange(e)}
                      type="text"
                      name="city"
                      id="city"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.city}
                      placeholder=""
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="dark:text-white" htmlFor="country">
                      Country / region
                    </label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        onChange={(e) => handleChange(e)}
                        name="country"
                        id="country"
                        placeholder="Country"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={formData.country}
                      />
                      <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                        <svg
                          className="w-4 h-4 mx-2 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                      <button className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                        <svg
                          className="w-4 h-4 mx-2 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className="flex items-center space-x-4 justify-end">
                      <button className=" flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Envoyer
                      </button>

                      <button className="flex  items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Connectez-vous avec Google
                        <FcGoogle size={15} className="text-2xl ml-2" />
                      </button>
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
