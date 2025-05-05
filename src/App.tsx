// Project: StudyNet
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BdEvents from "./pages/BdEvents";
import AuEvents from "./pages/AuEvents";
import './App.css'


const App = () => {
 
  
  return (
    
    <BrowserRouter basename="/events-react-app">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/BdEvents" element={<BdEvents />} />
        <Route path="/AdEvents" element={<AuEvents />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;