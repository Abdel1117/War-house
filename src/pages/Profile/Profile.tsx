import React, { useState } from "react";
import { useUserContext } from "../../context/useUserContext";
import { UserProfileDisplay } from "../../components/UserProfileDisplay/UserProfileDisplay";
import { ProfileActions } from "../../components/ProfileActions/ProfileActions";
import { Toast } from "../../components/Toast/Toast";

/**
 * Page de profil utilisateur
 * Principe SRP: Gère uniquement l'orchestration des composants de profil
 * Principe DIP: Dépend des abstractions (contexts et composants)
 * Principe OCP: Extensible en ajoutant de nouveaux composants
 */
export const Profile: React.FC = () => {
  const { user } = useUserContext();
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "error" | "warning">(
    "success"
  );

  // Fonctions de callback pour les actions (principe ISP - Interface Segregation)
  const handleEditProfile = () => {
    setToastMessage("Fonctionnalité en cours de développement");
    setToastType("warning");
  };

  const handleChangePassword = () => {
    setToastMessage("Fonctionnalité en cours de développement");
    setToastType("warning");
  };

  const handleDeleteAccount = () => {
    setToastMessage("Fonctionnalité en cours de développement");
    setToastType("warning");
  };

  // Cette vérification ne devrait jamais être vraie grâce à ProtectedRoute
  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* En-tête de la page */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Mon Profil
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Gérez vos informations personnelles et paramètres de compte
          </p>
        </div>

        {/* Grille responsive pour le contenu */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informations du profil - 2/3 de l'espace */}
          <div className="lg:col-span-2">
            <UserProfileDisplay user={user} />
          </div>

          {/* Actions du profil - 1/3 de l'espace */}
          <div className="lg:col-span-1">
            <ProfileActions
              onEditProfile={handleEditProfile}
              onChangePassword={handleChangePassword}
              onDeleteAccount={handleDeleteAccount}
            />
          </div>
        </div>

        {/* Sections supplémentaires (extensibles) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Statistiques utilisateur */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Statistiques
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  Compte créé
                </span>
                <span className="text-gray-900 dark:text-white">Récemment</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  Dernière connexion
                </span>
                <span className="text-gray-900 dark:text-white">
                  Maintenant
                </span>
              </div>
            </div>
          </div>

          {/* Préférences */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Préférences
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">
                  Notifications
                </span>
                <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                  Configurer
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">
                  Confidentialité
                </span>
                <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                  Gérer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast pour les notifications */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          duration={3000}
          position="top-0 right-0"
        />
      )}
    </div>
  );
};
