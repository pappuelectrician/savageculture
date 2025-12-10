import { createRoot } from "react-dom/client";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import "./index.css";
import App from "./App";
import AdminApp from "./AdminApp";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

// Check if this is the admin route
const isAdmin = window.location.pathname.includes('admin') || window.location.search.includes('admin=true');

createRoot(document.getElementById("root")!).render(
  <ConvexAuthProvider client={convex}>
    {isAdmin ? <AdminApp /> : <App />}
  </ConvexAuthProvider>,
);
