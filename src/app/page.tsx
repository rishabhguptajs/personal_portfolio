import { ext, resume, socials } from "./constants/site";

export default function Home() {
  return (
    <main id="main" className="k-main k-home">
      <section>
        <p className="k-poem">
          a small keeda in a big daldal,
          <br />
          yes, i&apos;m{" "}
          <a href="https://instagram.com/daldalikeeda" {...ext}>
            daldalikeeda
          </a>
          .
          <br />
          the mud is deep, i crawl anyway<span className="caret" />
        </p>
        <p>namaste, i&apos;m rishabh.</p>
        <p>full stack dev. i build agents and apps, and i try to actually ship them.</p>
        <p>i&apos;ve built production stuff for startups in logistics, healthtech and ai.</p>
        <p>building from shahjahanpur, india.</p>
        <p className="k-links">
          {socials.slice(0, 3).map(([label, href]) => (
            <span key={href}>
              <a href={href} {...ext}>
                {label}
              </a>{" "}
              /{" "}
            </span>
          ))}
          <a href={resume} {...ext}>
            résumé
          </a>
        </p>
        <p className="k-hint">psst, that&apos;s the keeda. poke it.</p>
      </section>
    </main>
  );
}
