import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import MobileCTAs from "@/components/MobileCTAs";
import HomePage from "@/pages/HomePage";
import PropiedadesPage from "@/pages/PropiedadesPage";
import VendedoresPage from "@/pages/VendedoresPage";
import HeredarosPage from "@/pages/HeredarosPage";
import CompradoresPage from "@/pages/CompradoresPage";
import ComercialPage from "@/pages/ComercialPage";
import ContactoPage from "@/pages/ContactoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/propiedades" element={<PropiedadesPage />} />
          <Route path="/vendedores" element={<VendedoresPage />} />
          <Route path="/herederos" element={<HeredarosPage />} />
          <Route path="/compradores" element={<CompradoresPage />} />
          <Route path="/comercial" element={<ComercialPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
        </Routes>
      </main>
      <MobileCTAs />
    </BrowserRouter>
  );
}
