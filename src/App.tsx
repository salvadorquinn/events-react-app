// Project: StudyNet
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from "./components/common/ErrorBoundary";
import LoadingSpinner from "./components/common/LoadingSpinner";

// Lazy load components
const Index = React.lazy(() => import("./pages/Index"));
const BdEvents = React.lazy(() => import("./pages/EventFrontend/BdEvents"));
const AuEvents = React.lazy(() => import("./pages/EventFrontend/AuEvents"));
const LoginPage = React.lazy(() => import("./pages/EventBackend/LoginPage"));
const EventDashboard = React.lazy(() => import("./pages/EventBackend/EventDashboard"));
const EventForm = React.lazy(() => import("./pages/EventBackend/EventForm"));
const CommunicationLayout = React.lazy(() => import('./components/Communication/CommunicationLayout'));
const LeadsPage = React.lazy(() => import('./pages/Communication/LeadsPage'));
const EmailTemplatesPage = React.lazy(() => import('./pages/Communication/EmailTemplatesPage'));
const EmailSignaturesPage = React.lazy(() => import('./pages/Communication/EmailSignaturesPage'));
const ContactFormBuilder = React.lazy(() => import('./pages/Communication/ContactFormBuilder'));

const App = () => {
  return (
    <ErrorBoundary>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/BdEvents" element={<BdEvents />} />
            <Route path="/AuEvents" element={<AuEvents />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/EventDashboard" element={<EventDashboard />} />
            <Route path="/admin/events/:mode/:id?" element={<EventForm />} />
            <Route path="/communication" element={<CommunicationLayout />}>
              <Route path="leads" element={<LeadsPage />} />
              <Route path="templates" element={<EmailTemplatesPage />} />
              <Route path="signatures" element={<EmailSignaturesPage />} />
              <Route path="forms" element={<ContactFormBuilder />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;