import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

const heroParts = [0, 1, 2, 3, 4].map(
  (index) => `/hero-bg/part-${String(index).padStart(2, "0")}.b64`,
);

Promise.all(heroParts.map((path) => fetch(path).then((response) => response.text())))
  .then((parts) => {
    const image = `url("data:image/webp;base64,${parts.join("")}")`;
    document.documentElement.style.setProperty("--hero-bg-image", image);
  })
  .catch(() => {
    // The CSS keeps an illustrated fallback if the custom background cannot load.
  });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
