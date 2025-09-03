## Tests de la page Profile

Ce dossier contient les tests pour la page de profil utilisateur protégée.

### Structure des tests

- **Profile.test.tsx** : Tests principaux de la page Profile
- **ProtectedRoute.test.tsx** : Tests du composant de protection des routes

### Fonctionnalités testées

#### Page Profile
- ✅ Affichage des informations utilisateur
- ✅ Actions du profil (déconnexion, édition, etc.)
- ✅ Sections additionnelles (statistiques, préférences)
- ✅ Responsive design
- ✅ Accessibilité
- ✅ Cas limites

#### ProtectedRoute
- ✅ Protection des routes pour utilisateurs non authentifiés
- ✅ Gestion des états de chargement
- ✅ Redirection personnalisable
- ✅ Respect des principes SOLID

### Exécution des tests

```bash
# Tests spécifiques au profil
npm run test src/__tests__/ProfileTest/

# Tests du composant ProtectedRoute
npm run test src/__tests__/ProtectedRouteTest/

# Tous les tests avec couverture
npm run test -- --coverage
```

### Mocks utilisés

- **UserContext** : Mock du contexte utilisateur avec différents états
- **react-router-dom** : Mock de la navigation pour les tests de redirection
- **LoadingSpinner** : Import correct du composant de chargement
