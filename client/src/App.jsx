import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import './assets/styles/index.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "assets/styles/tailwind.css";

// Layouts
import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";

// Views without layouts
import Landing from "./views/user/Landing";
import Profile from "./views/user/Profile";
import Index from "./views/user/Index";
import AboutHero from "./components/User/About/AboutHero";
import ContactPage from "./components/User/Contact/ContactPage";
import ServicesPage from "./components/User/Service/ServicesPage";
import CompanyDetailsPage from "./views/admin/CompanyDetail";
import { Toaster } from "react-hot-toast";

const App = () => {
    return (
        <BrowserRouter>
        <Toaster/>
        <Routes>
          {/* Routes with layouts */}
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/auth/*" element={<Auth />} />
    
          {/* Routes without layouts */}
          <Route path="/" element={<Index />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<AboutHero />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<ServicesPage />} />
    
          {/* Route for company details page */}
          <Route path="/company/:symbol" element={<CompanyDetailsPage />} />
          
          {/* Redirect for unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>
    )

}

export default App;


