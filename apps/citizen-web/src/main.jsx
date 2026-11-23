import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  return (
    <main>
      <header>
        <h1>PaperTrail</h1>
        <p>Citizen services and document wallet</p>
      </header>
      <section aria-label="Available services">
        <article><h2>Document wallet</h2><p>View and share verified documents.</p></article>
        <article><h2>Service requests</h2><p>Start and track public-service workflows.</p></article>
        <article><h2>Appointments</h2><p>Reserve slots and view queue status.</p></article>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
