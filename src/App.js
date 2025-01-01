import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";
import SummaryPage from "./pages/SummaryPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
