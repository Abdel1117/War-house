import { useEffect, useState } from "react";

export const useGetCityHook = (countrie: string) => {
  const [cities, setCities] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      if (!countrie) return; // Ne pas faire le fetch si aucun pays n'est sélectionné

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `${import.meta.env.VITE_CITY_API_URL}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ country : countrie }),
          }
        );
        const {data} = await response.json();
        setCities(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error fetching cities");
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [countrie]);

  return { cities, loading, error };
};