import type { Metadata } from "next";
import ContactForm from "../components/ContactForm";
import { Asterisk } from "../components/Artwork";
export const metadata: Metadata = { title: "Contact — Start something" };
export default function Contact() {
  return (
    <main id="main" className="contact-page">
      <div className="shell">
        <section className="route-hero contact-hero">
          <p className="eyebrow" data-reveal>
            03 / OPEN A CONVERSATION
          </p>
          <h1 data-reveal>
            LET’S MAKE
            <br />
            <em>good trouble.</em>
            <Asterisk />
          </h1>
          <span className="contact-tape" aria-hidden="true">
            THE INBOX IS OPEN ↙
          </span>
          <p className="max-w-md mt-8" data-reveal>
            The useful kind. Interesting problems. Unlikely collaborations.
            <br />
            There’s room in my inbox for all of it.
          </p>
        </section>
        <section className="contact-grid section-space">
          <div data-scroll>
            <span className="contact-postmark" aria-hidden="true">
              IDEAS WELCOME
              <br />
              INDIA ↗ EVERYWHERE
            </span>
            <h2>
              Let’s see
              <br />
              where it goes.
            </h2>
            <p className="max-w-sm my-7">
              I’m always open to hearing about unique opportunities, thoughtful
              collaborations, and things worth building.
            </p>
            <a
              className="contact-email"
              href="mailto:rishabhgupta4523@gmail.com"
            >
              rishabhgupta4523@gmail.com ↗
            </a>
            <a
              className="text-link inline-block mt-6"
              href="https://cal.com/rishabhguptajs"
              target="_blank"
              rel="noopener noreferrer"
            >
              More of a talking person? Book a call ↗
            </a>
          </div>
          <ContactForm />
        </section>
      </div>
    </main>
  );
}
