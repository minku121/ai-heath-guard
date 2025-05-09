import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/layout";
import IndexPage from "./pages/index";
import AboutPage from "./pages/about";
import BlogPage from "./pages/blog";
import DocsPage from "./pages/docs";
import PricingPage from "./pages/pricing";
import PregnancyPage from "./pages/pregnancy";
import HeartPage from "./pages/heart";
import DiabetesPage from "./pages/diabetes";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <Layout>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<IndexPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/pregnancy" element={<PregnancyPage />} />
            <Route path="/heart" element={<HeartPage />} />
            <Route path="/diabetes" element={<DiabetesPage />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </ThemeProvider>
  );
}
