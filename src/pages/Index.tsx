// File: src/pages/index.tsx
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Events from "../components/home/Events";
import Hero from "../components/home/Hero";
import TopUniversities from "../components/home/TopUniversities";
import TestEventForm from "../components/home/TestEventForm";

const Index = () => {
    return (
    <div>
    <Header />
    <Hero />  
    <div className="bg-gradient-to-r from-[#9b1f62] via-[#682161] to-[#3e3764] py-16">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
                Register for Upcoming Events
            </h2>
            <TestEventForm />
        </div>
    </div>
    <Events />
    <TopUniversities />  
    <Footer />
    </div>
    );
  };
  
  export default Index;