// File: src/pages/index.tsx
import { Link } from 'react-router-dom'
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Index = () => {
    return (
    <div>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>StudyNet : Events</title>
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    {/* Fonts */}
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css"
      integrity="sha512-10/jx2EXwxxWqCLX/hHth/vu2KY3jCF70dCQB8TSgNjbCVAC/8vai53GfMDrO2Emgwccf2pJqxct9ehpzG+MTw=="
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
    />
    {/* Bootstrap */}
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossOrigin="anonymous"
    />
    {/* jQuery */}
    {/* Slider */}
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"
    />
    {/* Custom Styles */}
    <link rel="stylesheet" href="css/style.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css"
    />
    <Header />
    <div
      className="cards-background"
      style={{ backgroundImage: 'url("header_back.jpg")' }}
    >
      <div className="background-overlay">
        <div className="container content-layer">
          <div className="top-section">
            <div className="headline">
              <h1>
                Start your study in{" "}
                <span className="text-stroke" style={{ color: "#3E3664" }}>
                  Australia
                </span>{" "}
                journey with{" "}
                <span className="text-stroke" style={{ color: "#9B2063" }}>
                  StudyNet !
                </span>
              </h1>
            </div>
            <div className="stats">
              <h3 className="typeing-text typing-effect">
                <span className="number1">15+ </span>year of experience
              </h3>
              <h3 className="typeing-text typing-effect">
                <span className="number2">30+ </span>partner Universities
              </h3>
              <h3 className="typeing-text typing-effect">
                <span className="number3">99% </span>visa success rate
              </h3>
            </div>
          </div>
          <div className="cards">
            <div className="card cards1">
              <h4>Free counseelling</h4>
              <p>
                FIND out the RIGHT COURSE that is best suited to YOUR PROFILE,
                BUDGET; PREFERENCES..
              </p>
            </div>
            <div className="card cards2">
              <h4>Avail Up to 75% Scholarship</h4>
              <p>
                Explore the latest scholarships for international students—study
                anytime, anywhere, your way: online, part-time, or full-time.
              </p>
            </div>
            <div className="card cards3">
              <h4>Migration Consultation with our MARA Agent</h4>
              <p>
                Wherever you are, our expert migration agents are ready to help
                with all types of visa applications..
              </p>
            </div>
            <div className="card cards4">
              <h4>Get best price on your Health Insurance</h4>
              <p>
                Get the best deal on OSHC! Big discounts for international
                students—single, couple, or family coverage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Upcoming Events */}
    <section className="events-section-top">
      <h1 className="event_title">Upcoming Events in Australia</h1>
      <div className="events-container">
        {/* Up coming events 1 */}
        <div className="event-card">
          <img
            src="EventJanBD2025.jpg"
            alt="Australian Higher education roadshow 2025"
          />
          <h2>Australian Higher education roadshow - 2025</h2>
          <p>
            Join us in Houston, TX. Explore our Gazer on display and meet our
            team.
          </p>
          <div className="time">
            <strong>TIME</strong>
            <br />
            Nov 2, 2024 - Nov 16, 2024
            <br />
            The Texas Expo Center
            <br />
            5085 Westheimer Rd
            <br />
            Houston, 77056
            <br />
            US
          </div>
          <Link to="/BdEvents">View details →</Link>
        </div>
        {/* Up coming events 2 */}
        <div className="event-card">
          <img
            src="EventJanBD2025.jpg"
            alt="Australian Higher education roadshow 2025"
          />
          <h2>Australian Higher education roadshow - 2025</h2>
          <p>
            Join us in Houston, TX. Explore our Gazer on display and meet our
            team.
          </p>
          <div className="time">
            <strong>TIME</strong>
            <br />
            Nov 2, 2024 - Nov 16, 2024
            <br />
            The Texas Expo Center
            <br />
            5085 Westheimer Rd
            <br />
            Houston, 77056
            <br />
            US
          </div>
          <Link to="/BdEvents">View details →</Link>
        </div>
        {/* Up coming events 3 */}
        <div className="event-card">
          <img
            src="EventJanBD2025.jpg"
            alt="Australian Higher education roadshow 2025"
          />
          <h2>Australian Higher education roadshow - 2025</h2>
          <p>
            Join us in Houston, TX. Explore our Gazer on display and meet our
            team.
          </p>
          <div className="time">
            <strong>TIME</strong>
            <br />
            Nov 2, 2024 - Nov 16, 2024
            <br />
            The Texas Expo Center
            <br />
            5085 Westheimer Rd
            <br />
            Houston, 77056
            <br />
            US
          </div>
          <Link to="/BdEvents">View details →</Link>
        </div>
        {/* ... */}
      </div>
    </section>
    <section className="events-section">
      <h1 className="event_title">Upcoming Events in Bangladesh</h1>
      <div className="events-container">
        {/* Previous Events 1 */}
        <div className="event-card">
          <img
            src="EventJanBD2025.jpg"
            alt="Australian Higher education roadshow 2025"
          />
          <h2>Australian Higher education roadshow - 2025</h2>
          <p>
            Join us in Houston, TX. Explore our Gazer on display and meet our
            team.
          </p>
          <div className="time">
            <strong>TIME</strong>
            <br />
            Nov 2, 2024 - Nov 16, 2024
            <br />
            The Texas Expo Center
            <br />
            5085 Westheimer Rd
            <br />
            Houston, 77056
            <br />
            US
          </div>
          <Link to="/BdEvents">View details →</Link>
        </div>
        {/* Previous Events 2 */}
        <div className="event-card">
          <img
            src="EventJanBD2025.jpg"
            alt="Australian Higher education roadshow 2025"
          />
          <h2>Australian Higher education roadshow - 2025</h2>
          <p>
            Join us in Houston, TX. Explore our Gazer on display and meet our
            team.
          </p>
          <div className="time">
            <strong>TIME</strong>
            <br />
            Nov 2, 2024 - Nov 16, 2024
            <br />
            The Texas Expo Center
            <br />
            5085 Westheimer Rd
            <br />
            Houston, 77056
            <br />
            US
          </div>
          <Link to="/BdEvents">View details →</Link>
        </div>
        {/* Previous Events 3 */}
        <div className="event-card">
          <img
            src="EventJanBD2025.jpg"
            alt="Australian Higher education roadshow 2025"
          />
          <h2>Australian Higher education roadshow - 2025</h2>
          <p>
            Join us in Houston, TX. Explore our Gazer on display and meet our
            team.
          </p>
          <div className="time">
            <strong>TIME</strong>
            <br />
            Nov 2, 2024 - Nov 16, 2024
            <br />
            The Texas Expo Center
            <br />
            5085 Westheimer Rd
            <br />
            Houston, 77056
            <br />
            US
          </div>
          <Link to="/BdEvents">View details →</Link>
        </div>
      </div>
    </section>
    <section className="events-section">
      <h1 className="event_title">Top Universities</h1>
      <div className="slider">
        <div className="slide-track">
          <div className="slide">
            <img src="provider/canberra.png" alt="Harvard" />
          </div>
          <div className="slide">
            <img src="provider/CQUniversity.png" alt="Harvard" />
          </div>
          <div className="slide">
            <img src="provider/ECU-1x2.png" alt="Harvard" />
          </div>
          <div className="slide">
            <img src="provider/FedU.png" alt="Harvard" />
          </div>
          <div className="slide">
            <img src="provider/FLINDERS_1x2.png" alt="Harvard" />
          </div>
          <div className="slide">
            <img src="provider/latrobe.png" alt="Harvard" />
          </div>
          <div className="slide">
            <img src="provider/macquarie-university.png" alt="Harvard" />
          </div>
          <div className="slide">
            <img src="provider/SCU.png" alt="Harvard" />
          </div>
          <div className="slide">
            <img src="provider/swinburn-1x2.png" alt="Harvard" />
          </div>
          <div className="slide">
            <img src="provider/uq_logo.png" alt="Harvard" />
          </div>
          <div className="slide">
            <img src="provider/usq-1x2.png" alt="Harvard" />
          </div>
          <div className="slide">
            <img src="provider/utas-1x2.png" alt="Harvard" />
          </div>
        </div>
      </div>
    </section>
    <Footer />
    </div>
    );
  };
  
  export default Index;