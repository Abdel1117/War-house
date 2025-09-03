import { User } from "../../types/userType/userType";

const apiUrl: string = import.meta.env.VITE_API_URL;

/**
 * Stocke le token de l'utilisateur dans sessionStorage.
 * @param userToken Le token à stocker.
 */
export const setToken = (userToken: string): void => {
  sessionStorage.setItem("token", userToken);
};

/**
 * Récupère la valeur associée à une clé dans sessionStorage.
 * @param key La clé à rechercher.
 * @returns La valeur de la clé ou null si elle n'existe pas.
 */
export const getToken = (key: string): string | null => {
  return sessionStorage.getItem(key);
};

/**
 * Vérifie auprès du backend si le token est toujours valide.
 * @returns Les données utilisateur ou null si invalide.
 */
export const checkToken = async (): Promise<User | null> => {
  try {
    const token = sessionStorage.getItem("token");
    if (token !== null) {
      const request = await fetch(`${apiUrl}/users/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (request.ok) {
        return await request.json();
      }
      return null;
    }
    return null;
  } catch (err) {
    console.error("Erreur lors de la vérification du token :", err);
    return null;
  }
};

