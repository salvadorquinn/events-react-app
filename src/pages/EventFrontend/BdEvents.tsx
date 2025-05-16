// File: BdEvents.tsx
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import EventForm from "../../components/events/EventForm";
import EventBranch from "../../components/events/EventBranch";
import EventStories from "../../components/events/EventStories";
import EventReferral from "../../components/events/EventReferral";
import EventBenefit from "../../components/events/EventBenefit";

const BdEvents = () => {
  return (
  <div>
  <Header />
  <EventForm />
  <EventBenefit />
  <EventReferral />
  <EventBranch />
  <EventStories />
  <Footer />
  </div>

  );
};

export default BdEvents;