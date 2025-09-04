import React from "react";
import { useUserContext } from "../../context/useUserContext";

interface ProfileActionsProps {
  onEditProfile?: () => void;
  onChangePassword?: () => void;
  onDeleteAccount?: () => void;
}

/**
 * Composant pour les actions du profil utilisateur
 * Principe SRP: Se concentre uniquement sur les actions du profil
 * Principe OCP: Extensible via les props de callback
 */
export const ProfileActions: React.FC<ProfileActionsProps> = ({
  onEditProfile,
  onChangePassword,
  onDeleteAccount,
}) => {
  const { logout } = useUserContext();

  const handleLogout = () => {
    logout();
    // Redirection sera gérée par ProtectedRoute
  };

  return (
    <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Actions du compte
      </h3>

      <div className="space-y-3">
        {onEditProfile && (
          <button
            onClick={onEditProfile}
            className="w-full px-4 py-2 text-left text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors duration-200"
          >
            ✏️ Modifier le profil
          </button>
        )}

        {onChangePassword && (
          <button
            onClick={onChangePassword}
            className="w-full px-4 py-2 text-left text-sm font-medium text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-colors duration-200"
          >
            🔒 Changer le mot de passe
          </button>
        )}

        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-left text-sm font-medium text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-md transition-colors duration-200"
        >
          🚪 Se déconnecter
        </button>

        {onDeleteAccount && (
          <button
            onClick={onDeleteAccount}
            className="w-full px-4 py-2 text-left text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors duration-200"
          >
            🗑️ Supprimer le compte
          </button>
        )}
      </div>
    </div>
  );
};
