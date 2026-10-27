import type { Metadata } from "next";
import ContactForm from "../components/ContactForm";
import { email, ext } from "../constants/site";

export const metadata: Metadata = { title: "contact" };

export default function Contact() {
  return (
    <main id="main" className="k-main k-page k-fixed">
      <h1 className="k-title">~/contact</h1>
      <p className="k-lede">got a weird idea, a problem or a question? write to me.</p>
      <div className="k-scroll" tabIndex={0} aria-label="Contact">
      <p>
        mail: <a href={`mailto:${email}`}>{email}</a>
      </p>
      <p>
        or talk:{" "}
        <a href="https://cal.com/rishabhguptajs" {...ext}>
          book a call ↗
        </a>
      </p>
      <h2 className="k-h2">leave a note</h2>
      <ContactForm />
      </div>
    </main>
  );
}
