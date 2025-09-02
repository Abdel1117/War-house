export const refreshToken = async (): Promise<Response> => {
    const API_URL: string = import.meta.env.VITE_API_URL;
    try {
        const response = await fetch(`${API_URL}/auth/refresh`, { 
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                
            },
        });
        console.log("Refresh response:", response);
        return response;
    } catch (error) {
        console.error("Erreur lors du rafraîchissement du token :", error);
        throw error;
    }
};