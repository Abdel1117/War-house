import { ReactNode, createContext, useState } from "react";

export interface CookiePreferences {
  analytics: boolean;
  marketing: boolean;
}

export interface CookieConsent extends CookiePreferences {
  necessary: true;
}

interface StoredConsent extends CookieConsent {
  version: number;
  date: string;
}

interface CookieConsentContextType {
  /** null tant que l'utilisateur n'a pas fait de choix */
  /* Choix obligatoire */
  consent: CookieConsent | null;
  isBannerOpen: boolean;
  acceptAll: () => void;
  refuseAll: () => void;
  savePreferences: (preferences: CookiePreferences) => void;
  openBanner: () => void;
  closeBanner: () => void;
}

export const CookieConsentContext = createContext<
  CookieConsentContextType | undefined
>(undefined);

export const COOKIE_CONSENT_KEY = "cookie-consent";
/** Incrémenter pour redemander le consentement (ex : nouvelle catégorie de cookies) */
const CONSENT_VERSION = 1;
/** La CNIL recommande de redemander le choix au bout de 6 mois */
const CONSENT_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 182;

const readStoredConsent = (): CookieConsent | null => {
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;

    const stored: StoredConsent = JSON.parse(raw);
    const age = Date.now() - new Date(stored.date).getTime();

    if (stored.version !== CONSENT_VERSION || !(age < CONSENT_MAX_AGE_MS)) {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
      return null;
    }

    return {
      necessary: true,
      analytics: stored.analytics === true,
      marketing: stored.marketing === true,
    };
  } catch {
    return null;
  }
};

/**
 * Stocke le choix de l'utilisateur concernant les cookies et le rend
 * accessible à toute l'application.
 * @param {CookieConsentProviderProps} param0
 * @returns {JSX.Element}
 */

interface CookieConsentProviderProps {
  children: ReactNode;
}

export const CookieConsentProvider = ({
  children,
}: CookieConsentProviderProps): JSX.Element => {
  const [consent, setConsent] = useState<CookieConsent | null>(
    readStoredConsent,
  );
  const [isBannerOpen, setIsBannerOpen] = useState<boolean>(
    () => consent === null,
  );

  const persist = (preferences: CookiePreferences) => {
    const next: CookieConsent = { necessary: true, ...preferences };
    const stored: StoredConsent = {
      ...next,
      version: CONSENT_VERSION,
      date: new Date().toISOString(),
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(stored));
    setConsent(next);
    setIsBannerOpen(false);
  };

  const acceptAll = () => persist({ analytics: true, marketing: true });
  const refuseAll = () => persist({ analytics: false, marketing: false });

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        isBannerOpen,
        acceptAll,
        refuseAll,
        savePreferences: persist,
        openBanner: () => setIsBannerOpen(true),
        closeBanner: () => setIsBannerOpen(false),
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};
