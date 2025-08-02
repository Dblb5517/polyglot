import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import LoginModal from "./components/LoginModal";
import AboutPage from "./pages/AboutPage";
import TeacherPage from "./pages/TeacherPage";
import StudentPage from "./pages/StudentPage";

const App = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <Router>
      <Header openModal={openModal} />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="/student" element={<StudentPage />} />
      </Routes>
      <LoginModal isOpen={modalIsOpen} onClose={closeModal} />
    </Router>
  );
};

export default App;
