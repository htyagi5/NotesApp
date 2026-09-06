import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Writing from "./components/Writing";
import Home from "./components/Home";
import Read from "./components/Read";
import Draw from "./components/Drawer/Draw.jsx";
import NotFound from "./components/NotFound";
import { NoteProvider } from "./components/Notes.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="write" element={<Writing />} />
      <Route path="read" element={<Read />} />
      <Route path="read/:id" element={<Read />} />
      <Route path="draw" element={<Draw />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <NoteProvider>
    <RouterProvider router={router} />
  </NoteProvider>
);