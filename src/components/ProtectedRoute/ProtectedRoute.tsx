import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/useUserContext";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

/**
 * HOC pour protéger les routes qui nécessitent une authentification
 * Principe SRP (Single Responsibility): Se concentre uniquement sur la protection des routes
 * Principe OCP (Open/Closed): Extensible via les props sans modification du code
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = "/login",
}) => {
  const { user, isLoading } = useUserContext();

  // Affichage du spinner pendant la vérification de l'authentification
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <LoadingSpinner />
      </div>
    );
  }

  // Redirection si l'utilisateur n'est pas authentifié
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Rendu des enfants si l'utilisateur est authentifié
  return <>{children}</>;
};

export default ProtectedRoute;
