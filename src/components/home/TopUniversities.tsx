import React, { useEffect, useState } from "react";
import { supabase } from "../../createClient";

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
        console.error("Error fetching universities:", error);
      } else {
        setUniversities(data || []);
      }
    };
    fetchUniversities();
  }, []);

  return (
    <section className="py-10 max-w-[1200px] mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-8">Top Universities</h1>
      <div className="overflow-hidden w-full">
        <div className="flex whitespace-nowrap marquee">
          {[...universities, ...universities].map((university, index) => (
            <div
              key={index}
              className="w-[200px] md:w-[250px] flex-shrink-0 flex justify-center items-center p-4"
            >
              <img
                src={university.src}
                alt={university.alt}
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopUniversities;
