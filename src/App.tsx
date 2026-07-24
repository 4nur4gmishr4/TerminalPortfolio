import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/layout";
import { ScrollManager } from "./components/layout/ScrollManager";
import CanvasBackground from "./components/ui/CanvasBackground";
import { TerminalOverlay } from "./components/ui/TerminalOverlay";
import Contact from "./pages/Contact";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import ProjectDetail from "./pages/ProjectDetail";
import Projects from "./pages/Projects";
const AppRoutes = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const backgroundLocation = state?.backgroundLocation;

  return (
    <>
      <CanvasBackground />
      <TerminalOverlay />
      <ScrollManager />
      <Routes location={backgroundLocation || location}>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/work" element={<Projects />} />
          <Route path="/projects" element={<Navigate to="/work" replace />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/projects/:slug" element={<ProjectDetail isModal />} />
        </Routes>
      )}
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
