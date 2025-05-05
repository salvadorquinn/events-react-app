
const Hero = () => {
  return (
    <div>
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
    </div>
  );
};

export default Hero;