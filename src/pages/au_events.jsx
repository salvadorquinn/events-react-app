function App() {
    return (
<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>StudyNet : Events</title>
  <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
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
        <img src="assets/studynet.png" alt="studynet" />
      </a>
    </div>
  </nav>
  {/* Form Section */}
  <section id="referee-form-fillup">
    <div className="container" style={{ marginTop: 10 }}>
      <div className="row">
        <div className="col-sm-5" style={{ marginBottom: 40 }}>
          <div className="image-wrapper">
            <img src="assets/form.png" alt="" />
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
                    required=""
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
                    required=""
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
                    required=""
                  />
                </div>
                <div className="col">
                  <label htmlFor="branch">Nearest Branch *</label>
                  <select
                    name="branch"
                    id="branch"
                    className="form-select"
                    required=""
                  >
                    <option value="">Select Nearest Branch</option>
                    <option value="bangladesh">Sydney</option>
                    <option value="dhanmondi">Melbourne</option>
                    <option value="chittagong">Perth</option>
                    <option value="sylhet">Brisbane</option>
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
                    required=""
                  />
                </div>
              </div>
              {/* <div class="row">
                          <div class="col">
                              <label for="location">Location *</label>
                              <input type="text" class="form-select" id="location" name="location" required>
                          </div>
                      </div> */}
              <div className="row">
                <div className="col">
                  <label htmlFor="IELTS">IELTS Score *</label>
                  <select
                    name="IELTS"
                    id="refereeType"
                    className="form-select"
                    required=""
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
  {/* Benefits of referee */}
  <section id="benefits-of-referee" className="my-5">
    <div className="container">
      <div className="row">
        <div className="col-sm-7 facts">
          <h2>Why Attend our Event?</h2>
          <p />
          <ul>
            <li>
              One-to-one virtual or Face-to-face consultation with The
              University of Queensland's representatives
            </li>
            <li>
              On-sport assessment (GTE assessment, Free SOP guideline, and visa
              assistance)
            </li>
            <li>
              No registration fee &amp; opportunity to apply with spouse and
              kids
            </li>
            <li>
              Open discussion with our education counsellors on accommodation,
              working hours, Post Study work visa &amp; PR
            </li>
            <li>
              Save up on your family or couple Overseas Student Health Cover
              (OHSC)
            </li>
          </ul>
        </div>
        <div className="col-sm-5">
          <div className="image-wrapper">
            <img src="assets/home4-benefits.svg" alt="" />
            <span className="image-bar" />
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* How our referral program works? */}
  <section className="roadmap">
    <h1>Explore Your Future with Expert Guidance</h1>
    <div className="steps">
      <div className="step" data-aos="fade-up">
        <span className="number">01</span>
        <h2>
          <i className="fas fa-comments" /> Live chat with University &amp;
          College Representatives
        </h2>
        <p>1-on-1 uni chats: Explore courses, scholarships, work options.</p>
      </div>
      <div className="step" data-aos="fade-up">
        <span className="number">02</span>
        <h2>
          <i className="fas fa-laptop" /> Chat from desktop, smartphone or
          laptop
        </h2>
        <p>Get expert help at home! Personal counsellor guides apps.</p>
      </div>
      <div className="step" data-aos="fade-up">
        <span className="number">03</span>
        <h2>
          <i className="fas fa-user-shield" /> Migration Consultation with our
          MARA Agent
        </h2>
        <p>Global visa help! In-house agents assist any location.</p>
      </div>
      <div className="step" data-aos="fade-up">
        <span className="number">04</span>
        <h2>
          <i className="fas fa-user-tie" /> Free Consultation by our expert
          counselors
        </h2>
        <p>Right course for you! Profile, budget, eligibility checks.</p>
      </div>
      <div className="step" data-aos="fade-up">
        <span className="number">05</span>
        <h2>
          <i className="fas fa-heart" /> Savings on Couple or Family OSHC
        </h2>
        <p>Family OSHC savings! Max discounts for couples/families.</p>
      </div>
      <div className="step" data-aos="fade-up">
        <span className="number">06</span>
        <h2>
          <i className="fas fa-road" /> Guidance to choose PR Pathway Courses
        </h2>
        <p>Uni &amp; visa help + PR pathways. Build your Aussie career!</p>
      </div>
      <div className="step" data-aos="fade-up">
        <span className="number">07</span>
        <h2>
          <i className="fas fa-graduation-cap" /> Affordable Courses &amp;
          Regional Options
        </h2>
        <p>Lowest tuition! Visa extension 50% off + MLTSSL deals.</p>
      </div>
      <div className="step" data-aos="fade-up">
        <span className="number">08</span>
        <h2>
          <i className="fas fa-gift" /> Avail Up to 75% Scholarship
        </h2>
        <p>Fresh scholarships list! Study online/part-time/full-time.</p>
      </div>
    </div>
  </section>
  {/* Branches */}
  <section className="branches">
    <h2>Our Branches In Australia</h2>
    <div className="card1-container">
      <div className="card1">
        <h3>SYDNEY</h3>
        <p>
          <strong>Phone:</strong>{" "}
          <a href="tel:+6128964 8826" target="_blank">
            +61 2 8964 8826
          </a>
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:sydney@studynet.com.au" target="_blank">
            sydney@studynet.com.au
          </a>
        </p>
        <p>
          <strong>Address:</strong> Suite 102/233 Castlereagh St, Sydney NSW
          2000{" "}
        </p>
      </div>
      <div className="card1">
        <h3>MELBOURNE</h3>
        <p>
          <strong>Phone:</strong>{" "}
          <a href="tel:+61390412251" target="_blank">
            +61 3 9041 2251
          </a>
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:melbourne@studynet.com.au" target="_blank">
            melbourne@studynet.com.au
          </a>
        </p>
        <p>
          <strong>Address:</strong> Suite 113, 343 Little Collins Street,
          Melbourne Vic 3000
        </p>
      </div>
      <div className="card1">
        <h3>PERTH</h3>
        <p>
          <strong>Phone:</strong>{" "}
          <a href="tel:+61480005426" target="_blank">
            +61 4 8000 5426
          </a>
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:perth@studynet.com.au" target="_blank">
            perth@studynet.com.au
          </a>
        </p>
        <p>
          <strong>Address:</strong> Suite 158, Level 2, 580 Hay Street, Perth
          6000
        </p>
      </div>
      <div className="card1">
        <h3>BRISBANE</h3>
        <p>
          <strong>Phone:</strong>{" "}
          <a href="tel:+61732100074" target="_blank">
            +61 7 3210 0074
          </a>
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:enquiry@studynet.com.au" target="_blank">
            enquiry@studynet.com.au
          </a>
        </p>
        <p>
          <strong>Address:</strong> Level 3, Suite D, 231 George Street,
          Brisbane CBD 4000
        </p>
      </div>
    </div>
  </section>
  {/* successful stories */}
  <section id="successful-stories">
    <div className="container">
      <div className="title-section d-flex justify-content-between">
        <div className="text-start">
          <h3>Our successful stories</h3>
          <p>Hear from our students!</p>
        </div>
        <div className="controller d-flex justify-content-between">
          <div className="arrow-wrapper s-prevBtn bg-transparent">
            <svg
              width={11}
              height={20}
              viewBox="0 0 11 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.6312 19.0079C10.1419 19.4979 9.35286 19.4979 8.86349 19.0079L0.564131 10.6979C0.17463 10.3079 0.17463 9.67785 0.564131 9.28785L8.86349 0.977852C9.35286 0.487852 10.1419 0.487852 10.6312 0.977852C11.1206 1.46785 11.1206 2.25785 10.6312 2.74785L3.40049 9.99785L10.6412 17.2479C11.1206 17.7279 11.1206 18.5279 10.6312 19.0079Z"
                fill="#701B64"
              />
            </svg>
          </div>
          <div className="arrow-wrapper s-nextBtn bg-transparent">
            <svg
              width={11}
              height={20}
              viewBox="0 0 11 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.368776 19.0079C0.858149 19.4979 1.64714 19.4979 2.13651 19.0079L10.4359 10.6979C10.8254 10.3079 10.8254 9.67785 10.4359 9.28785L2.13651 0.977852C1.64714 0.487852 0.858149 0.487852 0.368776 0.977852C-0.120597 1.46785 -0.120597 2.25785 0.368776 2.74785L7.59951 9.99785L0.358788 17.2479C-0.120597 17.7279 -0.120597 18.5279 0.368776 19.0079Z"
                fill="#701B64"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="slider-wrapper">
        <div className="successful-carousel">
          <div className="carousel-card">
            <div className="card bg-transparent">
              <div className="image-wrapper d-flex justify-content-center ">
                <img
                  src="https://www.studynet.com.au/images/Testitmonials_and_Reviews/arif.png"
                  alt=""
                />
              </div>
              <div className="content">
                <h4>Arif Ahmed</h4>
                <h6 style={{ fontSize: "10pt" }}>from Bangladesh</h6>
                <p className="description">
                  "It is understandable that as it is a business so they are
                  here to make money. But StudyNet staffs actually will try
                  their best to save your hard earned money as much as possible
                  by guiding you with the best pathway possible."
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-card">
            <div className="card bg-transparent">
              <div className="image-wrapper d-flex justify-content-center ">
                <img
                  src="https://www.studynet.com.au/images/Testitmonials_and_Reviews/eva.png"
                  alt=""
                />
              </div>
              <div className="content">
                <h4>Eva Bodova</h4>
                <h6 style={{ fontSize: "10pt" }}>from Slovakia</h6>
                <p className="description">
                  "Hi everybody! I am just sharing my experience with StudyNet
                  in order to help you guys to make your decision. The company
                  offers totally fantastic services - and these days it is not
                  easy to find a genuine and trustworthy education provider like
                  that in Australia. Their consultants are helpful, quick and
                  reliable."
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-card">
            <div className="card bg-transparent">
              <div className="image-wrapper d-flex justify-content-center ">
                <img
                  src="https://www.studynet.com.au/images/Testitmonials_and_Reviews/hardeep.png"
                  alt=""
                />
              </div>
              <div className="content">
                <h4>Hardeep Aulakh</h4>
                <h6 style={{ fontSize: "10pt" }}>from India</h6>
                <p className="description">
                  "Hi Guys, I am sharing my personal reviews on Studynet and
                  Team. STUDYNET has helped me to find the right path in my
                  career.Especially my a lot of thanks to Mohammad Hussain and
                  Jyothi for proper guidance. I would really appreciate their
                  efforts."
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-card">
            <div className="card bg-transparent">
              <div className="image-wrapper d-flex justify-content-center ">
                <img
                  src="https://www.studynet.com.au/images/Testitmonials_and_Reviews/mohd.png"
                  alt=""
                />
              </div>
              <div className="content">
                <h4>Mohd Asuad</h4>
                <h6 style={{ fontSize: "10pt" }}>from Malaysia</h6>
                <p className="description">
                  "Studynet help me find the right path of my career and them
                  also very heartwarming to assist and give advice for a new
                  student like me.Thank you Vee Wahid for a great and friendly
                  assistance."
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-card">
            <div className="card bg-transparent">
              <div className="image-wrapper d-flex justify-content-center ">
                <img
                  src="https://www.studynet.com.au/images/Testitmonials_and_Reviews/sitela.png"
                  alt=""
                />
              </div>
              <div className="content">
                <h4>Sitela</h4>
                <h6 style={{ fontSize: "10pt" }}>from Fiji</h6>
                <p className="description">
                  "I would like to thank study net for a big effort in my
                  application and my study . Thanking them in all they did to
                  accept me and my need of study .Would like to thank PTG as
                  well for accepting me through my need of study."
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-card">
            <div className="card bg-transparent">
              <div className="image-wrapper d-flex justify-content-center ">
                <img
                  src="https://www.studynet.com.au/images/Testitmonials_and_Reviews/ashwin.png"
                  alt=""
                />
              </div>
              <div className="content">
                <h4>Ashwin S Kumar</h4>
                <h6 style={{ fontSize: "10pt" }}>from India</h6>
                <p className="description">
                  "This place is the best if you are confused about your course
                  or career. The consultants were amazing. My consultant Jyothi
                  was amazing and has worked so hard on my admissions and paper
                  works. Really satisfied with the service and would recommend
                  it to everyone"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Refer a Friend and Win Big! */}
  <section id="refer-win-banner">
    <div className="container">
      <div className="content">
        <h3>Ready to Get Started?</h3>
        <p>
          Jump straight to our consultation form and take the first step toward
          your future. Quick, easy, and obligation-free!
        </p>
        <a href="#referee-form-fillup">
          <button className="btn btn-join-referral">Join Event</button>
        </a>
        <span className="d-circle-1">
          <svg
            width={48}
            height={30}
            viewBox="0 0 48 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12.833" cy="34.5" r="34.5" fill="#A90466" />
          </svg>
        </span>
        <span className="d-circle-2" />
        <span className="d-circle-3">
          <svg
            width={64}
            height={225}
            viewBox="0 0 64 225"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="151.333"
              cy={106}
              r="150.5"
              stroke="#701B64"
              strokeDasharray="4 4"
            />
          </svg>
        </span>
        <span className="d-circle-4">
          <svg
            width={104}
            height={225}
            viewBox="0 0 104 225"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="178.333"
              cy={133}
              r="177.5"
              stroke="#A90466"
              strokeDasharray="4 4"
            />
          </svg>
        </span>
      </div>
    </div>
  </section>
  {/* Footer */}
  <footer>
    <div className="container">
      <div className="row">
        <div className="col-sm-4">
          <img
            src="assets/white-logo.png"
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
              Sydney | Melbourne | Brisbane | Adelaide | Dhaka | Chattogram |
              Delhi | Islamabad | Kathmandu | Sunway
            </div>
          </div>
          <div className="icon-text-wrapper">
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
            <div className="text-wrapper">+61 2 8964 8826</div>
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
              <a href="studynetapp.html">
                <div className="icon-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="white"
                    className="bi bi-google-play"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14.222 9.374c1.037-.61 1.037-2.137 0-2.748L11.528 5.04 8.32 8l3.207 2.96zm-3.595 2.116L7.583 8.68 1.03 14.73c.201 1.029 1.36 1.61 2.303 1.055zM1 13.396V2.603L6.846 8zM1.03 1.27l6.553 6.05 3.044-2.81L3.333.215C2.39-.341 1.231.24 1.03 1.27" />
                  </svg>
                </div>
              </a>
              <a href="studynetapp.html">
                <div className="icon-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="white"
                    className="bi bi-apple"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
                    <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
                  </svg>
                </div>
              </a>
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
              <p>Copyright © 2024 StudyNet. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  {/* Success Message Modal */}
  <div
    className="modal fade"
    id="successModal"
    tabIndex={-1}
    aria-labelledby="successModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="successModalLabel">
            Registration Successful
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          Your registration was successful. You will be redirected to the
          sign-in page shortly.
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-dismiss="modal"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
  {/* Scripts */}
</>


 )
}

export default App
