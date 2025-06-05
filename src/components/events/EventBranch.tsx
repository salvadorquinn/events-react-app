import { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function EventBranch() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const branchLocations = [
    {
      id: 1,
      location: "DHAKA (Banani)",
      phone: "+880 9606 506060",
      email: "dhaka@studynet.com.au",
      address: "Level 2, South Breeze Center, House 5, Road No 11, Banani, Dhaka 1213.",
      mapLink: "https://maps.google.com/?q=South Breeze Center, House 5, Road No 11, Banani, Dhaka 1213",
    },
    {
      id: 2,
      location: "DHAKA (Dhanmondi)",
      phone: "+880 9606 506060",
      email: "dhanmondi@studynet.com.au",
      address: "27 Shaptak, Level 3, Road 27, Dhanmondi, Dhaka 1209",
      mapLink: "https://maps.google.com/?q=27 Shaptak, Road 27, Dhanmondi, Dhaka 1209",
    },
    {
      id: 3,
      location: "CHITTAGONG",
      phone: "+880 9606 506080",
      email: "chittagong@studynet.com.au",
      address: "Aerial Legend, Level 3, 1080 CDA Avenue, GEC Circle, Chittagong 4000",
      mapLink: "https://maps.google.com/?q=Aerial Legend, 1080 CDA Avenue, GEC Circle, Chittagong 4000",
    },
    {
      id: 4,
      location: "SYLHET",
      phone: "+880 9606 506090",
      email: "sylhet@studynet.com.au",
      address: "Level 12, Elegant Shopping Mall, Jallarpar Rd, Sylhet 3100",
      mapLink: "https://maps.google.com/?q=Elegant Shopping Mall, Jallarpar Rd, Sylhet 3100",
    }
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
  <h1 className="text-3xl font-bold text-center mb-4 text-[#9b1f62]">Our Branches in Bangladesh</h1>
  


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {branchLocations.map((branch) => {
          const isHovered = hoveredCard === branch.id;
          return (
            <div
              key={branch.id}
              className={`rounded-2xl shadow-lg transition-transform duration-300 transform hover:scale-105 cursor-pointer border border-[#e1dbe5] bg-opacity-30 ${
                isHovered ? 'bg-[#9b1f62]' : 'bg-[#9b1f6220]'
              }`}
              onMouseEnter={() => setHoveredCard(branch.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="p-6 h-full flex flex-col justify-between">
                <h2 className={`text-xl font-bold mb-4 ${isHovered ? 'text-white' : 'text-[#9b1f62]'}`}>
                  {branch.location}
                </h2>

                <div className="space-y-4 flex-grow">
                  <div className="flex items-start gap-2">
                    <Phone className={`h-4 w-4 mt-1 ${isHovered ? 'text-white' : 'text-[#682161]'}`} />
                    <div className={`${isHovered ? 'text-white' : 'text-[#3e3764]'}`}>
                      <strong>Phone: </strong>
                      <a
                        href={`tel:${branch.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hover:underline ${isHovered ? 'text-white' : 'text-[#3e3764] hover:text-[#9b1f62]'}`}
                        style={{ color: isHovered ? 'white' : '#9b1f62' }}
                      >
                        {branch.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Mail className={`h-4 w-4 mt-1 ${isHovered ? 'text-white' : 'text-[#682161]'}`} />
                    <div className={`break-words ${isHovered ? 'text-white' : 'text-[#3e3764]'}`}>
                      <strong>Email: </strong>
                      <a
                        href={`mailto:${branch.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hover:underline ${isHovered ? 'text-white' : 'text-[#3e3764] hover:text-[#9b1f62]'}`}
                        style={{ color: isHovered ? 'white' : '#9b1f62' }}
                      >
                        {branch.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className={`h-4 w-4 mt-1 ${isHovered ? 'text-white' : 'text-[#682161]'}`} />
                    <div className={`${isHovered ? 'text-white' : 'text-[#3e3764]'}`}>
                      <strong>Address: </strong>
                      <a
                        href={branch.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hover:underline ${isHovered ? 'text-white' : 'text-[#3e3764] hover:text-[#9b1f62]'}`}
                        style={{ color: isHovered ? 'white' : '#9b1f62' }}
                      >
                        {branch.address}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
