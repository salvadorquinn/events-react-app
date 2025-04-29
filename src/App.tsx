// Project: StudyNet
import './App.css'

function App() {
  return (
    <>
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
    {/* Navbar */}
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="index.html">
          <img src="studynet.png" alt="studynet" />
        </a>
      </div>
    </nav>
    <div
      className="cards-background"
      style={{ backgroundImage: 'url("header_back.jpg")' }}
    >
      <div className="background-overlay">
        <div className="container content-layer">
          <div className="top-section">
            <div className="headline">
              {/* <small>Exceeding Event Expectations</small> */}
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
          <a href="#">View details →</a>
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
          <a href="#">View details →</a>
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
          <a href="bd_event.html">View details →</a>
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
          <a href="au_event.html">View details →</a>
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
          <a href="au_event.html">View details →</a>
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
          <a href="au_event.html">View details →</a>
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
    {/* Footer */}
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <img
              src="white-logo.png"
              alt="studynet"
              style={{ width: "30%" }}
            />
            <p>
              StudyNet, an Australia based Education consultancy, a unique
              platform to empower the international student recruitment industry
              by providing tools, expertise, premium support and connecting
              educational institutions with vetted recruitment partners and
              students in leading and emerging source countries.
            </p>
            <div className="icon-text-wrapper">
              <div className="icon-wrapper">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.7707 11.1045L8.94202 13.9331C8.81831 14.057 8.67142 14.1552 8.50972 14.2222C8.34803 14.2892 8.17472 14.3237 7.99968 14.3237C7.82465 14.3237 7.65134 14.2892 7.48965 14.2222C7.32795 14.1552 7.18106 14.057 7.05735 13.9331L4.22802 11.1045C3.48217 10.3586 2.97424 9.40827 2.76848 8.37371C2.56271 7.33916 2.66834 6.26681 3.07202 5.29229C3.4757 4.31777 4.15928 3.48483 5.03634 2.89881C5.9134 2.31279 6.94453 2 7.99935 2C9.05417 2 10.0853 2.31279 10.9624 2.89881C11.8394 3.48483 12.523 4.31777 12.9267 5.29229C13.3304 6.26681 13.436 7.33916 13.2302 8.37371C13.0245 9.40827 12.5165 10.3586 11.7707 11.1045V11.1045Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 7.33398C10 7.86442 9.78929 8.37313 9.41421 8.7482C9.03914 9.12327 8.53043 9.33398 8 9.33398C7.46957 9.33398 6.96086 9.12327 6.58579 8.7482C6.21071 8.37313 6 7.86442 6 7.33398C6 6.80355 6.21071 6.29484 6.58579 5.91977C6.96086 5.5447 7.46957 5.33398 8 5.33398C8.53043 5.33398 9.03914 5.5447 9.41421 5.91977C9.78929 6.29484 10 6.80355 10 7.33398V7.33398Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-wrapper">
                Sydney | Melbourne | Brisbane | Perth | Adelaide | Dhaka |
                Chattogram | Sylhet
              </div>
            </div>
            <div className="icon-text-wrapper">
              <a href="tel:+61289648826">
                <div className="icon-wrapper">
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_714_859)">
                      <path
                        d="M1.5 4.5C1.5 10.0227 5.97733 14.5 11.5 14.5H13C13.3978 14.5 13.7794 14.342 14.0607 14.0607C14.342 13.7794 14.5 13.3978 14.5 13V12.0853C14.5 11.7413 14.266 11.4413 13.932 11.358L10.9833 10.6207C10.69 10.5473 10.382 10.6573 10.2013 10.8987L9.55467 11.7607C9.36667 12.0113 9.042 12.122 8.748 12.014C7.65659 11.6128 6.66544 10.9791 5.84319 10.1568C5.02094 9.33456 4.38725 8.34341 3.986 7.252C3.878 6.958 3.98867 6.63333 4.23933 6.44533L5.10133 5.79867C5.34333 5.618 5.45267 5.30933 5.37933 5.01667L4.642 2.068C4.60143 1.9058 4.50781 1.7618 4.37604 1.65889C4.24426 1.55598 4.08187 1.50006 3.91467 1.5H3C2.60218 1.5 2.22064 1.65804 1.93934 1.93934C1.65804 2.22064 1.5 2.60218 1.5 3V4.5Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_714_859">
                        <rect width={16} height={16} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </a>
              <div className="text-wrapper">+61 2 8964 8826</div>
            </div>
            <div className="icon-text-wrapper">
              <a href="tel:+8809606506060">
                <div className="icon-wrapper">
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_714_859)">
                      <path
                        d="M1.5 4.5C1.5 10.0227 5.97733 14.5 11.5 14.5H13C13.3978 14.5 13.7794 14.342 14.0607 14.0607C14.342 13.7794 14.5 13.3978 14.5 13V12.0853C14.5 11.7413 14.266 11.4413 13.932 11.358L10.9833 10.6207C10.69 10.5473 10.382 10.6573 10.2013 10.8987L9.55467 11.7607C9.36667 12.0113 9.042 12.122 8.748 12.014C7.65659 11.6128 6.66544 10.9791 5.84319 10.1568C5.02094 9.33456 4.38725 8.34341 3.986 7.252C3.878 6.958 3.98867 6.63333 4.23933 6.44533L5.10133 5.79867C5.34333 5.618 5.45267 5.30933 5.37933 5.01667L4.642 2.068C4.60143 1.9058 4.50781 1.7618 4.37604 1.65889C4.24426 1.55598 4.08187 1.50006 3.91467 1.5H3C2.60218 1.5 2.22064 1.65804 1.93934 1.93934C1.65804 2.22064 1.5 2.60218 1.5 3V4.5Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_714_859">
                        <rect width={16} height={16} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </a>
              <div className="text-wrapper">+880 9606 506060</div>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="f-title">
              <h5>QUICK LINKS</h5>
            </div>
            <div className="links-wrapper">
              <ul>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.studynet.com.au/study-net/our-story"
                  >
                    Our Story
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.studynet.com.au/about-us/our-partners"
                  >
                    Our Partners
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.studynet.com.au/study-net/our-success-stories"
                  >
                    Our Success stories
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.topuniversities.com/university-rankings-articles/world-university-rankings/top-universities-australia"
                  >
                    Check Australian Universities Ranking
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://studynetspeaktous.as.me/"
                  >
                    Book an Appointment
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.studynet.com.au/speak-to-us"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="f-title">
              <h5>OUR SERVICES</h5>
            </div>
            <div className="links-wrapper">
              <ul>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.studynet.com.au/our-services/visa-services"
                  >
                    Visa Services
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.studynet.com.au/study-in-australia"
                  >
                    Admission Services
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.studynet.com.au/professional-year0"
                  >
                    Professional Year
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.studynet.com.au/study-in-regional-areas"
                  >
                    Study Regional
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.studynet.com.au/best-scholarship-australia"
                  >
                    Get Scholarship
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="f-title">
              <h5>STUDY</h5>
            </div>
            <div className="links-wrapper">
              <ul>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.studynet.com.au/study-in-nursing"
                  >
                    Study in Nursing Courses
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.studynet.com.au/study-in-health"
                  >
                    Study in Health Courses
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.studynet.com.au/study-in-teaching-and-education-courses"
                  >
                    Study in Teaching Courses
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.studynet.com.au/study-in-social-work-courses"
                  >
                    Study in Social Work Courses
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.studynet.com.au/study-in-information-technology"
                  >
                    Study in IT courses
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.studynet.com.au/study-in-cookery-courses"
                  >
                    Study in Cookery Courses
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.studynet.com.au/study-in-engineering-courses"
                  >
                    Study in Engineering Courses
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.studynet.com.au/study-in-trade-courses"
                  >
                    Study in Trade Courses
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="f-title">
              <h5>Top Universities</h5>
            </div>
            <div className="links-wrapper">
              <ul>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.studynet.com.au/university-of-adelaide"
                  >
                    University of Adelaide
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.studynet.com.au/macquarie-university"
                  >
                    Macquarie University
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.studynet.com.au/western-sydney-university"
                  >
                    Western Sydney University
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.studynet.com.au/university-of-wollongong"
                  >
                    University of Wollongong
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.studynet.com.au/university-of-newcastle"
                  >
                    University of Newcastle
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.studynet.com.au/flinders-university"
                  >
                    Flinders University
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.studynet.com.au/university-of-tasmania"
                  >
                    University of Tasmania
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.studynet.com.au/top-universities/see-more"
                  >
                    See More..
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row footer-line-section">
          <div className="col-sm-12 ">
            <div className="footer-line">
              <div className="line-wrapper">
                <div className="line" />
              </div>
              <div className="social-icon-wrapper">
                {/* <a href="studynetapp.html">
                            <div class="icon-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white"
                                    class="bi bi-google-play" viewBox="0 0 16 16">
                                    <path
                                        d="M14.222 9.374c1.037-.61 1.037-2.137 0-2.748L11.528 5.04 8.32 8l3.207 2.96zm-3.595 2.116L7.583 8.68 1.03 14.73c.201 1.029 1.36 1.61 2.303 1.055zM1 13.396V2.603L6.846 8zM1.03 1.27l6.553 6.05 3.044-2.81L3.333.215C2.39-.341 1.231.24 1.03 1.27" />
                                </svg>
                            </div>
                        </a>
                        <a href="studynetapp.html">
                            <div class="icon-wrapper">
  
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white"
                                    class="bi bi-apple" viewBox="0 0 16 16">
                                    <path
                                        d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
                                    <path
                                        d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
                                </svg>
                            </div>
                        </a> */}
                <a href="https://www.facebook.com/StudyNet.au/">
                  <div className="icon-wrapper">
                    <svg
                      width={9}
                      height={16}
                      viewBox="0 0 9 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.28613 0.113171V2.63805L6.78311 2.64195C5.60497 2.64195 5.37796 3.2 5.37796 4.01561V5.82244H8.18436L7.82035 8.6478H5.37796V16H2.45061V8.6478H0V5.82244H2.45061V3.73854C2.45061 1.31902 3.92975 0 6.09815 0C7.13186 0 8.02388 0.0780487 8.28613 0.113171Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </a>
                <a href="https://www.instagram.com/studynet">
                  <div className="icon-wrapper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="white"
                      className="bi bi-instagram"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                    </svg>
                  </div>
                </a>
                <a href="https://twitter.com/Study_Net">
                  <div className="icon-wrapper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="white"
                      className="bi bi-twitter-x"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                    </svg>
                  </div>
                </a>
                <a href="https://au.linkedin.com/company/studynet-pty-ltd">
                  <div className="icon-wrapper">
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16 16H12.8V10.4008C12.8 8.86478 12.1224 8.00781 10.9072 8.00781C9.5848 8.00781 8.8 8.90078 8.8 10.4008V16H5.6V5.6H8.8V6.76953C8.8 6.76953 9.80399 5.00781 12.0664 5.00781C14.3296 5.00781 16 6.38888 16 9.24648V16ZM1.9536 3.93672C0.874401 3.93672 0 3.05517 0 1.96797C0 0.881569 0.874401 0 1.9536 0C3.032 0 3.9064 0.881569 3.9064 1.96797C3.9072 3.05517 3.032 3.93672 1.9536 3.93672ZM0 16H4V5.6H0V16Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </a>
                <a href="https://www.youtube.com/channel/UCVy7bISCHBxyyo8q1tHHuYA">
                  <div className="icon-wrapper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="white"
                      className="bi bi-youtube"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row copyright-section">
          <div className="col-sm-12">
            <div className="cp-f">
              <div>
                <a href="https://studynet.com.au/privacy-policy">
                  Privacy Policy
                </a>
                <a href="https://www.studynet.com.au/terms-and-conditions">
                  Terms of use
                </a>
              </div>
              <div>
                <p>Copyright © 2025 StudyNet. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    {/* Success Message Modal */}
    {/* <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="successModalLabel">Registration Successful</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Your registration was successful. You will be redirected to the sign-in page shortly.
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
            </div>
        </div>
    </div>
      </div> */}
    {/* Scripts */}
  </>
  
  )
}

export default App
