import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Profile } from "../../pages/Profile/Profile";
import { UserContext } from "../../context/UserContext";
import { User } from "../../types/userType/userType";

// Mock du contexte utilisateur
const mockUser: User = {
  id: "123",
  email: "test@example.com",
  pseudo: "TestUser",
  role: "user",
};

const mockUserContextValue = {
  user: mockUser,
  logged: true,
  isLoading: false,
  setUser: vi.fn(),
  setLogged: vi.fn(),
  logout: vi.fn(),
};

const renderWithContext = (contextValue = mockUserContextValue) => {
  return render(
    <BrowserRouter>
      <UserContext.Provider value={contextValue}>
        <Profile />
      </UserContext.Provider>
    </BrowserRouter>
  );
};

describe("Profile Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render profile page with user information", () => {
      renderWithContext();

      expect(screen.getByText("Mon Profil")).toBeInTheDocument();
      expect(screen.getAllByText("TestUser")).toHaveLength(2); // Une fois en titre, une fois dans les détails
      expect(screen.getByText("test@example.com")).toBeInTheDocument();
      expect(screen.getAllByText("user")).toHaveLength(2); // Une fois sous le titre, une fois dans le badge
    });

    it("should display user avatar with first letter of pseudo", () => {
      renderWithContext();

      expect(screen.getByText("T")).toBeInTheDocument();
    });

    it("should render all profile sections", () => {
      renderWithContext();

      expect(screen.getByText("Informations personnelles")).toBeInTheDocument();
      expect(screen.getByText("Actions du compte")).toBeInTheDocument();
      expect(screen.getByText("Statistiques")).toBeInTheDocument();
      expect(screen.getByText("Préférences")).toBeInTheDocument();
    });
  });

  describe("User Information Display", () => {
    it("should display all user fields correctly", () => {
      renderWithContext();

      expect(screen.getByText("ID Utilisateur")).toBeInTheDocument();
      expect(screen.getByText("123")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("test@example.com")).toBeInTheDocument();
      expect(screen.getByText("Pseudo")).toBeInTheDocument();
      expect(screen.getAllByText("TestUser")).toHaveLength(2); // En titre et en détail
    });

    it("should display role as a badge", () => {
      renderWithContext();

      const roleBadges = screen.getAllByText("user");
      expect(roleBadges).toHaveLength(2); // Une fois dans l'en-tête, une fois dans le badge
    });
  });

  describe("Profile Actions", () => {
    it("should render all action buttons", () => {
      renderWithContext();

      expect(screen.getByText("✏️ Modifier le profil")).toBeInTheDocument();
      expect(
        screen.getByText("🔒 Changer le mot de passe")
      ).toBeInTheDocument();
      expect(screen.getByText("🚪 Se déconnecter")).toBeInTheDocument();
      expect(screen.getByText("🗑️ Supprimer le compte")).toBeInTheDocument();
    });

    it("should call logout function when logout button is clicked", () => {
      renderWithContext();

      const logoutButton = screen.getByText("🚪 Se déconnecter");
      fireEvent.click(logoutButton);

      expect(mockUserContextValue.logout).toHaveBeenCalledTimes(1);
    });

    it("should show warning toast for development features", () => {
      renderWithContext();

      const editButton = screen.getByText("✏️ Modifier le profil");
      fireEvent.click(editButton);

      expect(
        screen.getByText("Fonctionnalité en cours de développement")
      ).toBeInTheDocument();
    });
  });

  describe("Additional Sections", () => {
    it("should render statistics section", () => {
      renderWithContext();

      expect(screen.getByText("Compte créé")).toBeInTheDocument();
      expect(screen.getByText("Dernière connexion")).toBeInTheDocument();
      expect(screen.getByText("Récemment")).toBeInTheDocument();
      expect(screen.getByText("Maintenant")).toBeInTheDocument();
    });

    it("should render preferences section with configurable options", () => {
      renderWithContext();

      expect(screen.getByText("Notifications")).toBeInTheDocument();
      expect(screen.getByText("Confidentialité")).toBeInTheDocument();
      expect(screen.getByText("Configurer")).toBeInTheDocument();
      expect(screen.getByText("Gérer")).toBeInTheDocument();
    });
  });

  describe("Responsive Design", () => {
    it("should have responsive grid classes", () => {
      const { container } = renderWithContext();

      const gridContainers = container.querySelectorAll(".grid");
      expect(gridContainers.length).toBeGreaterThan(0);

      // Vérifier que les classes responsive sont présentes
      const hasResponsiveClasses = Array.from(gridContainers).some(
        (element) =>
          element.className.includes("lg:col-span") ||
          element.className.includes("md:grid-cols")
      );
      expect(hasResponsiveClasses).toBe(true);
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading hierarchy", () => {
      renderWithContext();

      const h1 = screen.getByRole("heading", { level: 1 });
      expect(h1).toHaveTextContent("Mon Profil");

      const h2 = screen.getByRole("heading", { level: 2 });
      expect(h2).toHaveTextContent("TestUser");

      const h3Elements = screen.getAllByRole("heading", { level: 3 });
      expect(h3Elements).toHaveLength(4); // Informations personnelles, Actions, Statistiques, Préférences
    });

    it("should have proper button accessibility", () => {
      renderWithContext();

      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        expect(button).toBeInTheDocument();
        expect(button).not.toHaveAttribute("disabled");
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle user with empty pseudo gracefully", () => {
      const userWithEmptyPseudo = { ...mockUser, pseudo: "" };
      const contextWithEmptyPseudo = {
        ...mockUserContextValue,
        user: userWithEmptyPseudo,
      };

      renderWithContext(contextWithEmptyPseudo);

      // Devrait quand même afficher quelque chose, même si le pseudo est vide
      expect(screen.getByText("Actions du compte")).toBeInTheDocument();
    });

    it("should handle user with special characters in pseudo", () => {
      const userWithSpecialChars = { ...mockUser, pseudo: "Tëst-User_123" };
      const contextWithSpecialChars = {
        ...mockUserContextValue,
        user: userWithSpecialChars,
      };

      renderWithContext(contextWithSpecialChars);

      expect(screen.getAllByText("Tëst-User_123")).toHaveLength(2); // En titre et en détail
      expect(screen.getByText("T")).toBeInTheDocument(); // Premier caractère pour l'avatar
    });
  });
});
