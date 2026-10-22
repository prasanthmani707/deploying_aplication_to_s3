"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(false);
    setError("");

    const endpoint = process.env.NEXT_PUBLIC_MAIN_API;
    if (!endpoint) {
      setError("The API endpoint is not configured.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const payload = {
      email: String(formData.get("email")),
      name: String(formData.get("name")),
      phone: String(formData.get("phone")),
    };

    setSubmitting(true);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}.`);
      }

      setSubmitted(true);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to submit details.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main
      style={{
        maxWidth: 480,
        margin: "48px auto",
        padding: 24,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>User details</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" required />

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />

        <label htmlFor="phone">Phone</label>
        <input id="phone" name="phone" type="tel" required />

        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
      {submitted && <p role="status">Details submitted.</p>}
      {error && <p role="alert">{error}</p>}
      <style jsx>{`
        form {
          display: grid;
          gap: 12px;
        }
        input {
          box-sizing: border-box;
          width: 100%;
          padding: 10px;
        }
        button {
          padding: 10px;
          cursor: pointer;
        }
      `}</style>
    </main>
  );
}
