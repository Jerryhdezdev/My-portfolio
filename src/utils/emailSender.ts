import emailjs from "@emailjs/browser";
import { mockSendEmail } from "./mockEmail";

const USE_MOCK_EMAIL = false; // switch to true for dev / false for prod 

export const sendEmail = USE_MOCK_EMAIL
  ? mockSendEmail
  : emailjs.send;