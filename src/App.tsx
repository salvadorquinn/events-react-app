// Project: StudyNet
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BdEvents from "./pages/EventFrontend/BdEvents";
import AuEvents from "./pages/EventFrontend/AuEvents";
import './App.css'
import LoginPage from "./pages/EventBackend/LoginPage";
import EventDashboard from "./pages/EventBackend/EventDashboard";
import EventForm from "./pages/EventBackend/EventForm";
const App = () => {
 
  
  return (
    
    <BrowserRouter basename="/events-react-app">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/BdEvents" element={<BdEvents />} />
        <Route path="/AuEvents" element={<AuEvents />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/EventDashboard" element={<EventDashboard />} />
        <Route path="/admin/events/:mode/:id?" element={<EventForm />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;