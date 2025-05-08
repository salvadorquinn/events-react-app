import React from "react";
import {
  FaPhoneAlt, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { AiFillApple, AiOutlineClose } from "react-icons/ai";
import { BsGooglePlay } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-[#1c2234] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-5 text-sm">
        
        {/* Description + Locations + Phone */}
        <div className="md:col-span-1 space-y-4">
          <img src="./white-logo.png" alt="StudyNet Logo" className="w-28" />
          <p>
            StudyNet, an Australia based Education consultancy, a unique platform to empower the international student recruitment industry by providing tools, expertise, premium support and connecting educational institutions with vetted recruitment partners and students in leading and emerging source countries.
          </p>
          <div className="flex items-start text-sm gap-2">
            <MdLocationOn className="mt-1 text-pink-500" />
            <span>
              Sydney | Melbourne | Brisbane | Adelaide | Dhaka |<br />
              Chattogram | Delhi | Islamabad | Kathmandu | Sunway
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaPhoneAlt className="text-pink-500" />
            <span>+61 2 8964 8826</span>
          </div>
        </div>

        {/* Quick Links */}
        <FooterColumn title="Quick Links" links={[
          ["Our Story", "https://www.studynet.com.au/study-net/our-story"],
          ["Our Partners", "https://www.studynet.com.au/about-us/our-partners"],
          ["Our Success stories", "https://www.studynet.com.au/study-net/our-success-stories"],
          ["Check Australian Universities Ranking", "https://www.topuniversities.com/university-rankings-articles/world-university-rankings/top-universities-australia"],
          ["Book an Appointment", "https://studynetspeaktous.as.me/"],
          ["Contact Us", "https://www.studynet.com.au/speak-to-us"],
        ]} />

        {/* Our Services */}
        <FooterColumn title="Our Services" links={[
          ["Visa Services", "https://www.studynet.com.au/our-services/visa-services"],
          ["Admission Services", "https://www.studynet.com.au/study-in-australia"],
          ["Professional Year", "https://www.studynet.com.au/professional-year0"],
          ["Study Regional", "https://www.studynet.com.au/study-in-regional-areas"],
          ["Get Scholarship", "https://www.studynet.com.au/best-scholarship-australia"],
        ]} />

        {/* Study */}
        <FooterColumn title="STUDY" links={[
          ["Study in Nursing Courses", "https://www.studynet.com.au/study-in-nursing"],
          ["Study in Health Courses", "https://www.studynet.com.au/study-in-health"],
          ["Study in Teaching Courses", "https://www.studynet.com.au/study-in-teaching-and-education-courses"],
          ["Study in Social Work Courses", "https://www.studynet.com.au/study-in-social-work-courses"],
          ["Study in IT courses", "https://www.studynet.com.au/study-in-information-technology"],
          ["Study in Cookery Courses", "https://www.studynet.com.au/study-in-cookery-courses"],
          ["Study in Engineering Courses", "https://www.studynet.com.au/study-in-engineering-courses"],
          ["Study in Trade Courses", "https://www.studynet.com.au/study-in-trade-courses"],
        ]} />

        {/* Top Universities */}
        <FooterColumn title="Top Universities" links={[
          ["University of Adelaide", "https://www.studynet.com.au/university-of-adelaide"],
          ["Macquarie University", "https://www.studynet.com.au/macquarie-university"],
          ["Western Sydney University", "https://www.studynet.com.au/western-sydney-university"],
          ["University of Wollongong", "https://www.studynet.com.au/university-of-wollongong"],
          ["University of Newcastle", "https://www.studynet.com.au/university-of-newcastle"],
          ["Flinders University", "https://www.studynet.com.au/flinders-university"],
          ["University of Tasmania", "https://www.studynet.com.au/university-of-tasmania"],
          ["See More..", "https://www.studynet.com.au/top-universities/see-more"],
        ]} />
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-6 px-4 text-sm text-gray-400 flex flex-col md:flex-row items-center justify-between">
        <div className="flex gap-4 mb-4 md:mb-0">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of use</a>
        </div>
        <div className="text-center">Copyright © {new Date().getFullYear()} StudyNet. All Rights Reserved.</div>
        <div className="flex gap-3 mt-4 md:mt-0 text-pink-500 text-lg">
          <BsGooglePlay />
          <AiFillApple />
          <FaFacebookF />
          <FaInstagram />
          <AiOutlineClose />
          <FaLinkedinIn />
          <FaYoutube />
        </div>
      </div>
    </footer>
  );
};

type FooterColumnProps = {
  title: string;
  links: [string, string][];
};

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => (
  <div>
    <h5 className="text-lg font-semibold underline decoration-pink-500 underline-offset-4 mb-4">
      {title}
    </h5>
    <ul className="space-y-2 text-sm">
      {links.map(([label, url], idx) => (
        <li key={idx}>
          <a
            href={url}
            className="text-white no-underline hover:underline hover:text-white transition-all duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
