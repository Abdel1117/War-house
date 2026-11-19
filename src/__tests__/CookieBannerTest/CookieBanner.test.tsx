import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import { CookieBanner } from "../../components/CookieBanner/CookieBanner";
import {
  COOKIE_CONSENT_KEY,
  CookieConsentProvider,
} from "../../context/CookieConsentContext";
import useCookieConsentContext from "../../context/useCookieConsentContext";

const ManageCookiesButton = () => {
  const { openBanner } = useCookieConsentContext();
  return <button onClick={openBanner}>Gérer les cookies</button>;
};

const renderBanner = () =>
  render(
    <CookieConsentProvider>
      <CookieBanner />
      <ManageCookiesButton />
    </CookieConsentProvider>,
  );

const storedConsent = () =>
  JSON.parse(localStorage.getItem(COOKIE_CONSENT_KEY) ?? "null");

describe("CookieBanner", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("s'affiche tant qu'aucun choix n'a été fait", () => {
    renderBanner();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("enregistre l'acceptation et se ferme", async () => {
    renderBanner();
    await userEvent.click(screen.getByRole("button", { name: "Tout accepter" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(storedConsent()).toMatchObject({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  });

  it("enregistre le refus et se ferme", async () => {
    renderBanner();
    await userEvent.click(screen.getByRole("button", { name: "Tout refuser" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(storedConsent()).toMatchObject({
      analytics: false,
      marketing: false,
    });
  });

  it("permet de choisir catégorie par catégorie", async () => {
    renderBanner();
    await userEvent.click(screen.getByRole("button", { name: "Personnaliser" }));

    expect(
      screen.getByRole("switch", { name: /Cookies nécessaires/ }),
    ).toBeDisabled();

    await userEvent.click(
      screen.getByRole("switch", { name: "Mesure d'audience" }),
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Enregistrer mes choix" }),
    );

    expect(storedConsent()).toMatchObject({
      analytics: true,
      marketing: false,
    });
  });

  it("ne s'affiche pas si un choix a déjà été fait, mais peut être rouvert", async () => {
    localStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: false,
        version: 1,
        date: new Date().toISOString(),
      }),
    );
    renderBanner();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: "Gérer les cookies" }),
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByRole("switch", { name: "Mesure d'audience" }),
    ).toBeChecked();

    await userEvent.click(screen.getByRole("button", { name: "Fermer" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("redemande le consentement après 6 mois", () => {
    const sevenMonthsAgo = new Date();
    sevenMonthsAgo.setMonth(sevenMonthsAgo.getMonth() - 7);
    localStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: true,
        version: 1,
        date: sevenMonthsAgo.toISOString(),
      }),
    );
    renderBanner();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
