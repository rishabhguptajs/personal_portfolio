import Image from "next/image";
export default function Portrait({ large = false }: { large?: boolean }) {
  return (
    <figure className={`portrait ${large ? "portrait-large" : ""}`}>
      <div className="portrait-tape" aria-hidden="true" />
      <div className="portrait-image">
        <Image
          src="/PROFILE_WHITE.png"
          alt="Rishabh Gupta, full stack developer"
          fill
          sizes={large ? "(max-width: 768px) 80vw, 400px" : "220px"}
          className="object-cover"
          priority={!large}
        />
      </div>
      <figcaption>FIG. 01 — THE HUMAN BEHIND THE CODE</figcaption>
    </figure>
  );
}
