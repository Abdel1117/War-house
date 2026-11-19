import { useId, useState } from "react";
import { LuCookie } from "react-icons/lu";
import useCookieConsentContext from "../../context/useCookieConsentContext";
import { CookiePreferences } from "../../context/CookieConsentContext";

const focusRing =
  "focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 dark:focus-visible:ring-blue-800";

const primaryButton = `px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 ${focusRing}`;

const secondaryButton = `px-4 py-2 text-sm font-medium rounded-lg text-gray-800 bg-gray-200 hover:bg-gray-300 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200 ${focusRing}`;

interface CookieCategory {
  key: keyof CookiePreferences | "necessary";
  title: string;
  description: string;
}

const categories: CookieCategory[] = [
  {
    key: "necessary",
    title: "Cookies nécessaires",
    description:
      "Indispensables au fonctionnement du site : connexion à votre compte et mémorisation du thème. Ils ne peuvent pas être désactivés.",
  },
  {
    key: "analytics",
    title: "Mesure d'audience",
    description:
      "Nous aident à comprendre comment le site est utilisé pour l'améliorer.",
  },
  {
    key: "marketing",
    title: "Personnalisation",
    description:
      "Permettent de vous proposer du contenu adapté à vos centres d'intérêt.",
  },
];

interface ToggleProps {
  checked: boolean;
  disabled?: boolean;
  labelledBy: string;
  describedBy: string;
  onChange?: (checked: boolean) => void;
}

const Toggle = ({
  checked,
  disabled = false,
  labelledBy,
  describedBy,
  onChange,
}: ToggleProps) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-labelledby={labelledBy}
    aria-describedby={describedBy}
    disabled={disabled}
    onClick={() => onChange?.(!checked)}
    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${focusRing} ${
      checked ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
    }`}
  >
    <span
      aria-hidden="true"
      className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
        checked ? "translate-x-[22px]" : "translate-x-0.5"
      }`}
    />
  </button>
);

/**
 * Bannière de consentement aux cookies, affichée tant que l'utilisateur
 * n'a pas fait de choix ou lorsqu'il la rouvre depuis le pied de page.
 * @returns {JSX.Element | null}
 */
export const CookieBanner = () => {
  const {
    consent,
    isBannerOpen,
    acceptAll,
    refuseAll,
    savePreferences,
    closeBanner,
  } = useCookieConsentContext();

  if (!isBannerOpen) return null;

  return (
    <CookieBannerContent
      hasConsent={consent !== null}
      initialPreferences={{
        analytics: consent?.analytics ?? false,
        marketing: consent?.marketing ?? false,
      }}
      onAcceptAll={acceptAll}
      onRefuseAll={refuseAll}
      onSave={savePreferences}
      onClose={closeBanner}
    />
  );
};

interface CookieBannerContentProps {
  hasConsent: boolean;
  initialPreferences: CookiePreferences;
  onAcceptAll: () => void;
  onRefuseAll: () => void;
  onSave: (preferences: CookiePreferences) => void;
  onClose: () => void;
}

const CookieBannerContent = ({
  hasConsent,
  initialPreferences,
  onAcceptAll,
  onRefuseAll,
  onSave,
  onClose,
}: CookieBannerContentProps) => {
  const id = useId();
  // Rouverte depuis le pied de page : on affiche directement les réglages
  const [showDetails, setShowDetails] = useState<boolean>(hasConsent);
  const [preferences, setPreferences] =
    useState<CookiePreferences>(initialPreferences);

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl animate-cookie-slide-up motion-reduce:animate-none"
    >
      <div className="max-h-[calc(100vh-2rem)] overflow-y-auto rounded-lg bg-white p-5 shadow-lg ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-700 md:p-6">
        <div className="flex items-start gap-4">
          <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 sm:flex">
            <LuCookie size={24} aria-hidden="true" />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <h2
                id={`${id}-title`}
                className="text-lg font-semibold text-gray-900 dark:text-white"
              >
                War House utilise des cookies
              </h2>
              {hasConsent && (
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Fermer"
                  className={`-mr-1 -mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-colors duration-200 ${focusRing}`}
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              )}
            </div>

            <p
              id={`${id}-description`}
              className="mt-2 text-sm text-gray-500 dark:text-gray-400"
            >
              Certains cookies sont indispensables au bon fonctionnement du
              site. Avec votre accord, nous en utilisons d'autres pour mesurer
              l'audience et personnaliser votre expérience. Vous pouvez changer
              d'avis à tout moment via « Gérer les cookies » en bas de page.
            </p>

            {showDetails && (
              <ul className="mt-4 divide-y divide-gray-200 rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700">
                {categories.map((category) => {
                  const isNecessary = category.key === "necessary";
                  const checked = isNecessary
                    ? true
                    : preferences[category.key as keyof CookiePreferences];

                  return (
                    <li
                      key={category.key}
                      className="flex items-start justify-between gap-4 p-4"
                    >
                      <div>
                        <p
                          id={`${id}-${category.key}-label`}
                          className="text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {category.title}
                          {isNecessary && (
                            <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400">
                              Toujours actifs
                            </span>
                          )}
                        </p>
                        <p
                          id={`${id}-${category.key}-description`}
                          className="mt-1 text-sm text-gray-500 dark:text-gray-400"
                        >
                          {category.description}
                        </p>
                      </div>
                      <Toggle
                        checked={checked}
                        disabled={isNecessary}
                        labelledBy={`${id}-${category.key}-label`}
                        describedBy={`${id}-${category.key}-description`}
                        onChange={(value) =>
                          setPreferences((prev) => ({
                            ...prev,
                            [category.key]: value,
                          }))
                        }
                      />
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
              {showDetails ? (
                <button
                  type="button"
                  onClick={() => onSave(preferences)}
                  className={`${secondaryButton} sm:mr-auto`}
                >
                  Enregistrer mes choix
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowDetails(true)}
                  className={`rounded-lg px-1 py-2 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400 sm:mr-auto ${focusRing}`}
                >
                  Personnaliser
                </button>
              )}
              <button
                type="button"
                onClick={onRefuseAll}
                className={secondaryButton}
              >
                Tout refuser
              </button>
              <button
                type="button"
                onClick={onAcceptAll}
                className={primaryButton}
              >
                Tout accepter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
