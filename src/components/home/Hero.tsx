import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="relative w-full bg-cover bg-no-repeat bg-center-bottom pt-[100px] pb-[30px] px-5" style={{ backgroundImage: `url('header_back.jpg')` }}>
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#9b20643b] z-10" />
      
      {/* Content Layer */}
      <div className="relative z-20 max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between items-center">
          {/* Headline */}
          <div className="max-w-xl">
            <h1 className="text-[40px] font-bold text-[#f7f6f6] leading-[1.2] my-24 sm:text-[20px] sm:-webkit-text-stroke sm:text-white sm:text-stroke sm:my-24">
              Start your study in{" "}
              <span className="text-[#3E3664] sm:text-white sm:-webkit-text-stroke">Australia</span>{" "}
              journey with{" "}
              <span className="text-[#9B2063] sm:text-white sm:-webkit-text-stroke">StudyNet!</span>
            </h1>
          </div>

          {/* Stats */}
          <div className="text-right text-white space-y-4">
            <h3 className="text-[22pt] font-normal typing-effect">
              <span className="font-bold text-[#9B2063] text-[22pt] sm:-webkit-text-stroke">15+ </span>year of experience
            </h3>
            <h3 className="text-[22pt] font-normal typing-effect">
              <span className="font-bold text-[#672162] text-[22pt] sm:-webkit-text-stroke">30+ </span>partner Universities
            </h3>
            <h3 className="text-[22pt] font-normal typing-effect">
              <span className="font-bold text-[#3E3664] text-[22pt] sm:-webkit-text-stroke">99% </span>visa success rate
            </h3>
          </div>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap gap-5 mt-12">
          <div className="flex-1 min-w-[200px] p-5 rounded-2xl text-white bg-[#9B2063]">
            <h4 className="mb-2 font-semibold">Free counselling</h4>
            <p className="text-sm opacity-80">
              FIND out the RIGHT COURSE that is best suited to YOUR PROFILE, BUDGET; PREFERENCES..
            </p>
          </div>
          <div className="flex-1 min-w-[200px] p-5 rounded-2xl text-white bg-[#672162]">
            <h4 className="mb-2 font-semibold">Avail Up to 75% Scholarship</h4>
            <p className="text-sm opacity-80">
              Explore the latest scholarships for international students—study anytime, anywhere, your way: online, part-time, or full-time.
            </p>
          </div>
          <div className="flex-1 min-w-[200px] p-5 rounded-2xl text-white bg-[#3E3664]">
            <h4 className="mb-2 font-semibold">Migration Consultation with our MARA Agent</h4>
            <p className="text-sm opacity-80">
              Wherever you are, our expert migration agents are ready to help with all types of visa applications..
            </p>
          </div>
          <div className="flex-1 min-w-[200px] p-5 rounded-2xl text-white bg-[#282F43]">
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
