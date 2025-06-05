import React, { useEffect, useState } from "react";
import { supabase } from "../../createClient";
import { logger } from '../../utils/logger';

type University = {
  id: number;
  src: string;
  alt: string;
};

const TopUniversities: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      const { data, error } = await supabase.from("universities").select("*");
      if (error) {
        logger.error('Error fetching universities:', error);
      } else {
        setUniversities(data || []);
      }
    };
    fetchUniversities();
  }, []);

  return (
    <section className="py-6 md:py-10 px-4 max-w-[1200px] mx-auto">
      <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6 md:mb-8">Top Universities</h1>
      <div className="overflow-hidden w-full">
        <div className="flex whitespace-nowrap marquee">
          {[...universities, ...universities].map((university, index) => (
            <div
              key={index}
              className="w-[150px] md:w-[200px] lg:w-[250px] flex-shrink-0 flex justify-center items-center p-3 md:p-4"
            >
              <img
                src={university.src}
                alt={university.alt}
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopUniversities;
