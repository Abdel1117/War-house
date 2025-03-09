import { useEffect, useState } from "react";

/**
 * This hook is used to get the city data from the API
 * @returns {Promise<any>}
 * @example const countrieData = useGetCountry();
 * 
 */
export const useGetCountry =  () => {

    const [countries, setCountries] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchCountrie = async () => {
            try {
                setLoading(true);
                setError(false);

                const response = await fetch(import.meta.env.VITE_COUNTRY_API_URL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    
                });

                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }

                const {data} = await response.json();
                console.log(data)
                setCountries(data || []); 
            } catch (error) {
                setError(true);
                console.error("Error fetching cities:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCountrie()
    },[]);
    return { countries, loading, error };
}

