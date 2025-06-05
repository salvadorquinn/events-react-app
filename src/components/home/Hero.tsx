import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="relative w-full bg-cover bg-no-repeat bg-center-bottom pt-[60px] md:pt-[100px] pb-[30px] px-4 md:px-5" style={{ backgroundImage: `url('header_back.jpg')` }}>
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#9b20643b] z-10" />
      
      {/* Content Layer */}
      <div className="relative z-20 max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
          {/* Headline */}
          <div className="max-w-xl text-center md:text-left">
            <h1 className="text-[28px] md:text-[40px] font-bold text-[#f7f6f6] leading-[1.2] my-8 md:my-24">
              Start your study in{" "}
              <span className="text-[#3E3664]">Australia</span>{" "}
              journey with{" "}
              <span className="text-[#9B2063]">StudyNet!</span>
            </h1>
          </div>

          {/* Stats */}
          <div className="text-center md:text-right text-white space-y-4">
            <h3 className="text-[18pt] md:text-[22pt] font-normal">
              <span className="font-bold text-[#9B2063]">15+ </span>year of experience
            </h3>
            <h3 className="text-[18pt] md:text-[22pt] font-normal">
              <span className="font-bold text-[#672162]">30+ </span>partner Universities
            </h3>
            <h3 className="text-[18pt] md:text-[22pt] font-normal">
              <span className="font-bold text-[#3E3664]">99% </span>visa success rate
            </h3>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="p-5 rounded-2xl text-white bg-[#9B2063]">
            <h4 className="mb-2 font-semibold">Free counselling</h4>
            <p className="text-sm opacity-80">
              FIND out the RIGHT COURSE that is best suited to YOUR PROFILE, BUDGET; PREFERENCES..
            </p>
          </div>
          <div className="p-5 rounded-2xl text-white bg-[#672162]">
            <h4 className="mb-2 font-semibold">Avail Up to 75% Scholarship</h4>
            <p className="text-sm opacity-80">
              Explore the latest scholarships for international students—study anytime, anywhere, your way: online, part-time, or full-time.
            </p>
          </div>
          <div className="p-5 rounded-2xl text-white bg-[#3E3664]">
            <h4 className="mb-2 font-semibold">Migration Consultation with our MARA Agent</h4>
            <p className="text-sm opacity-80">
              Wherever you are, our expert migration agents are ready to help with all types of visa applications..
            </p>
          </div>
          <div className="p-5 rounded-2xl text-white bg-[#282F43]">
            <h4 className="mb-2 font-semibold">Get best price on your Health Insurance</h4>
            <p className="text-sm opacity-80">
              Get the best deal on OSHC! Big discounts for international students—single, couple, or family coverage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
