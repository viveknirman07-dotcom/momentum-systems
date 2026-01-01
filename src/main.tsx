import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Check if this is the first visit (for opening animation)
const hasVisited = sessionStorage.getItem('bf_visited');
const rootElement = document.getElementById("root")!;

if (!hasVisited) {
  rootElement.classList.add('site-enter');
  sessionStorage.setItem('bf_visited', 'true');
}

createRoot(rootElement).render(<App />);
