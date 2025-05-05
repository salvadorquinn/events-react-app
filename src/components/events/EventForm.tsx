const EventForm = () => {
  return (
    <div>
      {/* Form Section */}
  <section id="referee-form-fillup">
    <div className="container" style={{ marginTop: 10 }}>
      <div className="row">
        <div className="col-sm-5" style={{ marginBottom: 40 }}>
          <div className="image-wrapper">
            <img src="form.png" alt="" />
            <span className="image-bar" />
          </div>
        </div>
        <div className="col-sm-7">
          <h3>Fill-up the form to join our event</h3>
          <h4 className="form-title-2nd">Enter your details</h4>
          <div className="form-wrapper">
            <form id="registerForm" action="event_form.php" method="post">
              <p id="message" />
              <div className="row">
                <div className="col">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="first_name"
                    name="firstName"
                    className="form-control"
                    placeholder="First name"
                    aria-label="First name"
                    required={true}
                  />
                </div>
                <div className="col">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="last_name"
                    name="lastName"
                    className="form-control"
                    placeholder="Last name"
                    aria-label="Last name"
                    required={true}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="phone">Phone *</label>
                  <input
                    type="number"
                    id="phone"
                    className="form-control"
                    name="phone"
                    placeholder="Enter phone"
                    aria-label="Phone"
                    required={true}
                  />
                </div>
                <div className="col">
                  <label htmlFor="branch">Nearest Branch *</label>
                  <select
                    name="branch"
                    id="branch"
                    className="form-select"
                    required={true}
                  >
                    <option value="">Select Nearest Branch</option>
                    <option value="bangladesh">Banani</option>
                    <option value="dhanmondi">Dhanmondi</option>
                    <option value="chittagong">Chattogram</option>
                    <option value="sylhet">Sylhet</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter email"
                    aria-label="Email"
                    required={true}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="IELTS">IELTS Score *</label>
                  <select
                    name="IELTS"
                    id="refereeType"
                    className="form-select"
                    required={true}
                  >
                    <option value="">Not Taken Yet</option>
                    <option value={5}>5</option>
                    <option value="5.5">5.5</option>
                    <option value={6}>6</option>
                    <option value="6.5+">6.5+</option>
                  </select>
                </div>
                <div className="row">
                  <div className="col">
                    <button
                      id="submitButton"
                      type="submit"
                      className="btn btn-register-to-start"
                    >
                      Register to Start
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
    </div>
  );
};

export default EventForm;