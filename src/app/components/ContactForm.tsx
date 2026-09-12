"use client";
import { FormEvent, useState } from "react";
export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/rishabhgupta4523@gmail.com",
        {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        },
      );
      const result = await response.json();
      if (
        !response.ok ||
        (result.success !== true && result.success !== "true")
      )
        throw new Error("Could not send");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }
  return (
    <form onSubmit={submit} className="contact-form">
      <p className="eyebrow mb-8">A NOTE TO RISHABH</p>
      <label htmlFor="email">01 / YOUR EMAIL</label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="you@somewhere.good"
      />
      <label htmlFor="message">02 / WHAT ARE YOU THINKING?</label>
      <textarea
        id="message"
        name="message"
        required
        minLength={10}
        rows={4}
        placeholder="An idea, an opportunity, a wonderfully odd question…"
        aria-describedby="message-help"
      />
      <p id="message-help" className="text-xs mb-6">
        A little context goes a long way. At least 10 characters.
      </p>
      <input
        type="text"
        name="_honey"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <button
        className="send-button"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending your note…" : "Send it into the world"}
        <span>↗</span>
      </button>
      <div role="status" className="form-status">
        {status === "success" &&
          "Your note is on its way. Thanks for reaching out."}
        {status === "error" && (
          <>
            That didn’t go through. Your message is still here. Try again, or{" "}
            <a href="mailto:rishabhgupta4523@gmail.com" className="underline">
              email me directly
            </a>
            .
          </>
        )}
      </div>
      <p className="text-xs opacity-75">
        Delivered via FormSubmit. Prefer your own inbox? Use the email link.
      </p>
    </form>
  );
}
