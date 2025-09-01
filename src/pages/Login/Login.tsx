const Login = () => {
  return (
    <section className="min-h-screen p-6 flex items-center justify-center bg-[#f1f1f1] dark:bg-[#303030] relative">
      {/* Work in progress */}
      <h1 className="hidden text-3xl font-bold mb-6">Connexion</h1>
      <div className="bg-[#ffffff] dark:bg-[#3f55cf] rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <form>
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black dark:text-white"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Se connecter
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
