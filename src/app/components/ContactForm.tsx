"use client";
import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch("https://formsubmit.co/ajax/rishabhgupta4523@gmail.com", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      const result = await response.json();
      if (!response.ok || (result.success !== true && result.success !== "true")) throw new Error("Could not send");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={submit} className="k-form">
      <label htmlFor="email">your email</label>
      <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@somewhere.good" />
      <label htmlFor="message">what are you thinking?</label>
      <textarea
        id="message"
        name="message"
        required
        minLength={10}
        rows={5}
        placeholder="tell me what's on your mind"
      />
      <input type="text" name="_honey" className="k-hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "sending…" : "send it ↗"}
      </button>
      <p role="status" className="k-meta">
        {status === "success" && "sent. thanks, i'll get back to you."}
        {status === "error" && (
          <>
            that didn&apos;t go through. your message is still here. try again, or{" "}
            <a href="mailto:rishabhgupta4523@gmail.com">email me directly</a>.
          </>
        )}
      </p>
    </form>
  );
}
