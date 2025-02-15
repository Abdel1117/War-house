// Accueil.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import Accueil from "../../pages/Accueil/Accueil";
import { useAppSelector } from "../../app/hooks";

// On mocke le hook useThemeContext
vi.mock("../../context/useThemeContext", () => {
  return {
    default: () => ({
      theme: "light",
      toggleTheme: vi.fn(),
    }),
  };
});

/* On mock le useNavigate */
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));
vi.mock("../../app/hooks.ts", async () => {
  const actual = await vi.importActual("../../app/hooks.ts");
  return {
    ...actual,
    useAppDispatch: () => vi.fn(),
    useAppSelector: () => vi.fn(),
  };
});

describe("Accueil Component", () => {
  beforeEach(() => {
    render(<Accueil />);
  });
  it("Should render the homePage", () => {
    const title = screen.getByTestId("HomeApp");
    expect(title).toBeInTheDocument();
  });
});
