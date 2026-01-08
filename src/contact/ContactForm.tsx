import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RetroButton } from "../components/RetroButton";
import { AutoCloseModal } from "../contact/AutoCloseModal";
import { sendEmail } from "../utils/emailSender";

/* Types */
type SupportedLanguage = "es" | "en" | "fr";

type ModalType = "submitStatusSuccess" | "submitStatusFailed";

type FormData = {
  name: string;
  email: string;
  message: string;
  language: string;
  formType: string;
};

type FormErrors = {
  name: string;
  email: string;
  message: string;
};

/* Constants */
const MAX_EMAIL_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 500;
const NAME_REGEX = /^[a-zA-ZÀ-ÿ\s'-]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const languageNames: Record<SupportedLanguage, string> = {
  es: "Español",
  en: "English",
  fr: "Français",
};

/* Helpers */
function getLanguageLabel(lang: string): string {
  const normalized = lang.split("-")[0] as SupportedLanguage;
  return languageNames[normalized] || lang;
}

/* Component */
export function ContactForm() {
  const { t, i18n } = useTranslation();

  /* State */
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    language: getLanguageLabel(i18n.language),
    formType: "Contact Form",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    message: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const remainingChars = MAX_MESSAGE_LENGTH - formData.message.length;

  /* Effects */
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      language: getLanguageLabel(i18n.language),
    }));
  }, [i18n.language]);

  useEffect(() => {
    validateForm(formData);
  }, [formData]);

  /* Validation */
  function validateForm(data: FormData): FormErrors {
    const newErrors: FormErrors = {
      name: "",
      email: "",
      message: "",
    };

    const nameTrimmed = data.name.trim();

    newErrors.name =
      nameTrimmed === ""
        ? t("sections.contact.formRequiredField")
        : nameTrimmed.length < 2
        ? t("sections.contact.formMinLength")
        : nameTrimmed.length > 50
        ? t("sections.contact.formMaxLength")
        : !NAME_REGEX.test(nameTrimmed)
        ? t("sections.contact.formInvalidFormat")
        : "";

    const emailTrimmed = data.email.trim().toLowerCase();

    newErrors.email =
      emailTrimmed === ""
        ? t("sections.contact.formRequiredField")
        : emailTrimmed.length > MAX_EMAIL_LENGTH
        ? t("sections.contact.formMaxLength")
        : !EMAIL_REGEX.test(emailTrimmed)
        ? t("sections.contact.formInvalidEmail")
        : "";

    const messageTrimmed = data.message.trim();

    newErrors.message =
      messageTrimmed === ""
        ? t("sections.contact.formRequiredField")
        : messageTrimmed.length < 5
        ? t("sections.contact.formMinLength")
        : messageTrimmed.length > MAX_MESSAGE_LENGTH
        ? t("sections.contact.formMaxLength")
        : "";

    setErrors(newErrors);
    setIsFormValid(Object.values(newErrors).every((err) => err === ""));
    return newErrors;
  }

  /* Handlers */
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    let cleanValue = value.replace(/^\s+/, "").replace(/\s{2,}/g, " ");

    if (name === "email") {
      cleanValue = value.trim().replace(/\s+/g, "").toLowerCase();
    }

    setFormData((prev) => ({
      ...prev,
      [name]: cleanValue,
    }));
  }

  function handleBlur(
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    if (name === "email") {
      setFormData((prev) => ({
        ...prev,
        email: value.trim().toLowerCase(),
      }));
    }

    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (!Object.values(validationErrors).every((err) => err === "")) return;

    setIsSubmitting(true);

    try {
      await sendEmail(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      await sendEmail(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID,
        {
          subject: t("email.autoReply.subject"),
          message: t("email.autoReply.message", { name: formData.name }),
          email: formData.email,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setModalType("submitStatusSuccess");

      setFormData({
        name: "",
        email: "",
        message: "",
        language: getLanguageLabel(i18n.language),
        formType: "Contact Form",
      });

      setTouched({ name: false, email: false, message: false });
      setErrors({ name: "", email: "", message: "" });
      setIsFormValid(false);
    } catch (error) {
      console.error("EmailJS error:", error);
      setModalType("submitStatusFailed");
    } finally {
      setIsSubmitting(false);
    }
  }

  function shouldShowError(field: keyof FormErrors): boolean {
    const otherFieldsFilled = Object.keys(formData)
      .filter(
        (key) => key !== field && key !== "language" && key !== "formType"
      )
      .every((key) => formData[key as keyof FormData].trim() !== "");

    return (
      touched[field] || (otherFieldsFilled && formData[field].trim() === "")
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-xl mt-5"
      >
        <input
          id="name"
          name="name"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={t("sections.contact.formName")}
          className="p-3 rounded-xl text-black border-2 bg-(--color-bg-form) shadow-(--retro-shadow-tech) tracking-widest focus:outline-8 focus:ring-0 focus:border-(--color-bg-divider-primary)"
        />
        {shouldShowError("name") && (
          <span className="text-red-500 text-sm tracking-widest">
            {errors.name}
          </span>
        )}

        <input
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={t("sections.contact.formEmail")}
          className="p-3 rounded-xl text-black border-2 bg-(--color-bg-form) shadow-(--retro-shadow-tech) tracking-widest focus:outline-8 focus:ring-0 focus:border-(--color-bg-divider-primary)"
        />
        {shouldShowError("email") && (
          <span className="text-red-500 text-sm tracking-widest">
            {errors.email}
          </span>
        )}

        <textarea
          id="message"
          name="message"
          autoComplete="off"
          maxLength={MAX_MESSAGE_LENGTH}
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={t("sections.contact.formMessage")}
          className="p-3 rounded-xl h-32 text-black border-2 resize-none bg-(--color-bg-form) shadow-(--retro-shadow-tech) tracking-widest focus:outline-8 focus:ring-0 focus:border-(--color-bg-divider-primary)"
        />

        {/* Progressive character warning */}
        {remainingChars <= 100 && (
          <div
            className={`text-right text-xs tracking-widest ${
              remainingChars <= 50
                ? "text-red-500 animate-pulse"
                : "text-yellow-600"
            }`}
            aria-live="polite"
          >
            {remainingChars} / {MAX_MESSAGE_LENGTH}
          </div>
        )}

        {shouldShowError("message") && (
          <span className="text-red-500 text-sm tracking-widest">
            {errors.message}
          </span>
        )}

        <input type="hidden" name="language" value={formData.language} />
        <input type="hidden" name="formType" value={formData.formType} />

        <RetroButton
          type="submit"
          disabled={!isFormValid || isSubmitting}
          isLoading={isSubmitting}
        >
          {isSubmitting
            ? t("sections.contact.formButtonSending")
            : t("sections.contact.formButtonSend")}
        </RetroButton>
      </form>

      {modalType && (
        <AutoCloseModal type={modalType} onClose={() => setModalType(null)} />
      )}
    </>
  );
}
