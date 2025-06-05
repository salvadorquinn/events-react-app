const EventReferral = () => {
    return (
      <div>
        <section className="max-w-[900px] mx-auto px-4">
          <h1 className="text-center mb-12 text-2xl font-semibold text-[#2a2a2a]">
            Explore Your Future with Expert Guidance
          </h1>
          <div className="flex flex-col gap-8">
            {[
              {
                number: "01",
                icon: "fas fa-comments",
                title: "Live chat with University & College Representatives",
                desc: "1-on-1 uni chats: Explore courses, scholarships, work options.",
              },
              {
                number: "02",
                icon: "fas fa-laptop",
                title: "Chat from desktop, smartphone or laptop",
                desc: "Get expert help at home! Personal counsellor guides apps.",
              },
              {
                number: "03",
                icon: "fas fa-user-shield",
                title: "Migration Consultation with our MARA Agent",
                desc: "Global visa help! In-house agents assist any location.",
              },
              {
                number: "04",
                icon: "fas fa-user-tie",
                title: "Free Consultation by our expert counselors",
                desc: "Right course for you! Profile, budget, eligibility checks.",
              },
              {
                number: "05",
                icon: "fas fa-heart",
                title: "Savings on Couple or Family OSHC",
                desc: "Family OSHC savings! Max discounts for couples/families.",
              },
              {
                number: "06",
                icon: "fas fa-road",
                title: "Guidance to choose PR Pathway Courses",
                desc: "Uni & visa help + PR pathways. Build your Aussie career!",
              },
              {
                number: "07",
                icon: "fas fa-graduation-cap",
                title: "Affordable Courses & Regional Options",
                desc: "Lowest tuition! Visa extension 50% off + MLTSSL deals.",
              },
              {
                number: "08",
                icon: "fas fa-gift",
                title: "Avail Up to 75% Scholarship",
                desc: "Fresh scholarships list! Study online/part-time/full-time.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative bg-white border-l-[5px] border-[#9b1f62] p-6 rounded-lg flex flex-col gap-5 hover:-translate-y-1.5 transition-transform duration-300 ease-in-out cursor-pointer"
                data-aos="fade-up"
              >
                <span className="absolute -top-4 -left-8 bg-[#9b1f62] text-white font-bold text-sm px-3 py-2 rounded-full">
                  {item.number}
                </span>
                <h2 className="text-[#9b1f62] text-lg font-semibold flex items-center gap-2">
                  <i className={`${item.icon} text-[1.4rem]`} />
                  {item.title}
                </h2>
                <p className="text-[#555] text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  };
  
  export default EventReferral;
  