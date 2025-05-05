// Events
import React from 'react';
import { Link } from 'react-router-dom'

const ContactSection: React.FC = () => {
    return (
    <div>
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
    </div>
    );
};

export default ContactSection;