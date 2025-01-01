import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";
import SummaryPage from "./pages/SummaryPage";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<CalendarPage />} />
            <Route path="/summary" element={<SummaryPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
