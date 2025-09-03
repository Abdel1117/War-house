import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import { UserContext } from "../../context/UserContext";
import { User } from "../../types/userType/userType";

// Composants de test simples
const TestComponent = () => <div>Protected Content</div>;
const LoginComponent = () => <div>Login Page</div>;

// Mock du contexte utilisateur
const mockUser: User = {
  id: "123",
  email: "test@example.com",
  pseudo: "TestUser",
  role: "user",
};

const createUserContextValue = (
  user: User | null = null,
  isLoading = false
) => ({
  user,
  logged: !!user,
  isLoading,
  setUser: vi.fn(),
  setLogged: vi.fn(),
  logout: vi.fn(),
});

// Utilisation de MemoryRouter pour éviter les problèmes d'URL
const renderWithRouter = (
  contextValue: ReturnType<typeof createUserContextValue>,
  redirectTo?: string,
  initialEntries = ["/protected"]
) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <UserContext.Provider value={contextValue}>
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/custom-login" element={<div>Custom Login</div>} />
          <Route path="/custom-path" element={<div>Custom Path</div>} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute redirectTo={redirectTo}>
                <TestComponent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserContext.Provider>
    </MemoryRouter>
  );
};

// Mock du composant Navigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Navigate: ({ to }: { to: string }) => (
      <div data-testid="navigate">Navigating to {to}</div>
    ),
  };
});

describe("ProtectedRoute Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Authentication States", () => {
    it("should render children when user is authenticated", () => {
      const contextValue = createUserContextValue(mockUser, false);
      renderWithRouter(contextValue);

      expect(screen.getByText("Protected Content")).toBeInTheDocument();
      expect(screen.queryByTestId("navigate")).not.toBeInTheDocument();
    });

    it("should redirect to login when user is not authenticated", () => {
      const contextValue = createUserContextValue(null, false);
      renderWithRouter(contextValue);

      expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
      expect(screen.getByTestId("navigate")).toHaveTextContent(
        "Navigating to /login"
      );
    });

    it("should show loading spinner when authentication is loading", () => {
      const contextValue = createUserContextValue(null, true);
      renderWithRouter(contextValue);

      expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
      expect(screen.queryByTestId("navigate")).not.toBeInTheDocument();
      // Le LoadingSpinner devrait être présent
      expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    });
  });

  describe("Custom Redirect Path", () => {
    it("should redirect to custom path when specified", () => {
      const contextValue = createUserContextValue(null, false);
      renderWithRouter(contextValue, "/custom-login");

      expect(screen.getByTestId("navigate")).toHaveTextContent(
        "Navigating to /custom-login"
      );
    });

    it("should use default login path when not specified", () => {
      const contextValue = createUserContextValue(null, false);
      renderWithRouter(contextValue);

      expect(screen.getByTestId("navigate")).toHaveTextContent(
        "Navigating to /login"
      );
    });
  });

  describe("Props and Children", () => {
    it("should render multiple children when authenticated", () => {
      const contextValue = createUserContextValue(mockUser, false);

      render(
        <MemoryRouter>
          <UserContext.Provider value={contextValue}>
            <ProtectedRoute>
              <div>Child 1</div>
              <div>Child 2</div>
            </ProtectedRoute>
          </UserContext.Provider>
        </MemoryRouter>
      );

      expect(screen.getByText("Child 1")).toBeInTheDocument();
      expect(screen.getByText("Child 2")).toBeInTheDocument();
    });

    it("should handle different types of children", () => {
      const contextValue = createUserContextValue(mockUser, false);

      render(
        <MemoryRouter>
          <UserContext.Provider value={contextValue}>
            <ProtectedRoute>
              <h1>Title</h1>
              <p>Paragraph</p>
              <button>Button</button>
            </ProtectedRoute>
          </UserContext.Provider>
        </MemoryRouter>
      );

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Title"
      );
      expect(screen.getByText("Paragraph")).toBeInTheDocument();
      expect(screen.getByRole("button")).toHaveTextContent("Button");
    });
  });

  describe("Loading State", () => {
    it("should display loading state when authentication is loading", () => {
      const contextValue = createUserContextValue(null, true);
      renderWithRouter(contextValue);

      expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    });

    it("should not show loading when authentication check is complete", () => {
      const contextValue = createUserContextValue(mockUser, false);
      renderWithRouter(contextValue);

      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });
  });

  describe("SOLID Principles Compliance", () => {
    it("should follow Single Responsibility Principle", () => {
      // ProtectedRoute ne fait qu'une seule chose : protéger les routes
      const contextValue = createUserContextValue(mockUser, false);
      renderWithRouter(contextValue);

      // Le composant rend le contenu quand autorisé
      expect(screen.getByText("Protected Content")).toBeInTheDocument();
    });

    it("should be Open/Closed Principle compliant", () => {
      // Le composant est extensible via les props sans modification
      const contextValue = createUserContextValue(null, false);

      // Test avec redirectTo personnalisé
      renderWithRouter(contextValue, "/custom-path");
      expect(screen.getByTestId("navigate")).toHaveTextContent(
        "Navigating to /custom-path"
      );
    });
  });

  describe("Edge Cases", () => {
    it("should handle undefined user context gracefully", () => {
      // Mock du hook useUserContext pour retourner undefined
      const originalError = console.error;
      console.error = vi.fn(); // Supprimer les erreurs de console pour ce test

      expect(() => {
        render(
          <MemoryRouter>
            <UserContext.Provider value={undefined}>
              <ProtectedRoute>
                <TestComponent />
              </ProtectedRoute>
            </UserContext.Provider>
          </MemoryRouter>
        );
      }).toThrow("useUserContext must be used within a UserProvider");

      console.error = originalError;
    });

    it("should handle empty children when authenticated", () => {
      const contextValue = createUserContextValue(mockUser, false);

      render(
        <MemoryRouter>
          <UserContext.Provider value={contextValue}>
            <ProtectedRoute>
              <div>Content exists</div>
            </ProtectedRoute>
          </UserContext.Provider>
        </MemoryRouter>
      );

      expect(screen.getByText("Content exists")).toBeInTheDocument();
      expect(screen.queryByTestId("navigate")).not.toBeInTheDocument();
    });

    it("should handle falsy children correctly", () => {
      const contextValue = createUserContextValue(mockUser, false);

      render(
        <MemoryRouter>
          <UserContext.Provider value={contextValue}>
            <ProtectedRoute>
              {false && <div>Should not render</div>}
              {null}
              {undefined}
              <div>Should render</div>
            </ProtectedRoute>
          </UserContext.Provider>
        </MemoryRouter>
      );

      expect(screen.getByText("Should render")).toBeInTheDocument();
      expect(screen.queryByText("Should not render")).not.toBeInTheDocument();
    });
  });

  describe("Authentication Flow", () => {
    it("should handle transition from loading to authenticated", () => {
      const contextValue = createUserContextValue(null, true);
      const { rerender } = renderWithRouter(contextValue);

      // Initialement en chargement
      expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();

      // Puis utilisateur authentifié
      const authenticatedContext = createUserContextValue(mockUser, false);
      rerender(
        <MemoryRouter initialEntries={["/protected"]}>
          <UserContext.Provider value={authenticatedContext}>
            <Routes>
              <Route path="/login" element={<LoginComponent />} />
              <Route
                path="/protected"
                element={
                  <ProtectedRoute>
                    <TestComponent />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </UserContext.Provider>
        </MemoryRouter>
      );

      expect(screen.getByText("Protected Content")).toBeInTheDocument();
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });

    it("should handle transition from loading to unauthenticated", () => {
      const contextValue = createUserContextValue(null, true);
      const { rerender } = renderWithRouter(contextValue);

      // Initialement en chargement
      expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();

      // Puis utilisateur non authentifié
      const unauthenticatedContext = createUserContextValue(null, false);
      rerender(
        <MemoryRouter initialEntries={["/protected"]}>
          <UserContext.Provider value={unauthenticatedContext}>
            <Routes>
              <Route path="/login" element={<LoginComponent />} />
              <Route
                path="/protected"
                element={
                  <ProtectedRoute>
                    <TestComponent />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </UserContext.Provider>
        </MemoryRouter>
      );

      expect(screen.getByTestId("navigate")).toHaveTextContent(
        "Navigating to /login"
      );
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });
  });
});
