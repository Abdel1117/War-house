import React from "react";
import { User } from "../../types/userType/userType";

interface UserProfileDisplayProps {
  user: User;
}

/**
 * Composant pour afficher les informations du profil utilisateur
 * Principe SRP: Se concentre uniquement sur l'affichage des données
 */
export const UserProfileDisplay: React.FC<UserProfileDisplayProps> = ({
  user,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xl font-bold">
            {user.pseudo.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user.pseudo}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 capitalize">
            {user.role}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Informations personnelles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                ID Utilisateur
              </label>
              <p className="mt-1 text-sm text-gray-900 dark:text-white font-mono">
                {user.id}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {user.email}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Pseudo
              </label>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {user.pseudo}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Rôle
              </label>
              <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                {user.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
