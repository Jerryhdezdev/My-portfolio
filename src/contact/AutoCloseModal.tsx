import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../components/ThemeContext";
import emailErrorLight from "../assets/images/emailErrorLight.webp";
import emailErrorDark from "../assets/images/emailErrorDark.webp";
import emailSuccessLight from "../assets/images/emailSuccessLight.webp";
import emailSuccessDark from "../assets/images/emailSuccessDark.webp";

/* Types */
interface AutoCloseModalProps {
  type: "submitStatusSuccess" | "submitStatusFailed";
  onClose: () => void;
  duration?: number;
  values?: Record<string, string | number>;
}

/* Component */
export function AutoCloseModal({
  type,
  onClose,
  duration = 4000,
  values = {},
}: AutoCloseModalProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  /* Select image based on status + theme */
  const statusImage =
    type === "submitStatusSuccess"
      ? isDark
        ? emailSuccessDark
        : emailSuccessLight
      : isDark
        ? emailErrorDark
        : emailErrorLight;

  /* Auto-close after duration */
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  /* Close on Escape */
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-live="assertive"
        className="
          bg-(--color-bg-navbarAndFooter)
          text-(--color-text-navbar)
          rounded-lg
          border-t-4 border-(--color-text-secondary)
          p-6
          w-11/12
          max-w-sm
          text-center
          shadow-lg
        "
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[20px]">
          {t(`alerts.${type}`, values)}
        </p>

        <img
          src={statusImage}
          alt={
            type === "submitStatusSuccess"
              ? t("alerts.successImageAlt", "Email sent successfully")
              : t("alerts.errorImageAlt", "Email sending failed")
          }
          className="mx-auto mt-4 w-32 h-auto select-none pointer-events-none"
          loading="eager"
        />
      </div>
    </div>
  );
}