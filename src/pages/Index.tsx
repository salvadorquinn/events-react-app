// File: src/pages/index.tsx
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Events from "../components/home/Events";
import Hero from "../components/home/Hero";
import TopUniversities from "../components/home/TopUniversities";

const Index = () => {
    return (
    <div>
    <Header />
    <Hero />  
    <Events />
    <TopUniversities />  
    <Footer />
    </div>
    );
  };
  
  export default Index;