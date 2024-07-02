import React from "react";

import { Routes, Route, Link } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Quotations from "./pages/Quotations";
import NotFoutdPage from "./pages/NotFoutdPage";
import Header from "./components/Header";
import { ModalProvider } from "./components/ui/Modal";

function App() {
  return (
    <ModalProvider>
      <div className="flex h-full w-full flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Quotations" element={<Quotations />} />
          <Route path="*" element={<NotFoutdPage />} />
        </Routes>
      </div>
    </ModalProvider>
  );
}

export default App;
