"use client";

import { FormEvent, useState } from "react";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
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

        <button type="submit">Submit</button>
      </form>
      {submitted && <p>Details submitted.</p>}
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
