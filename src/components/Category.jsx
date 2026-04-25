import React, { useEffect, useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import data from "../../db.json";

export default function Category() {
  const [slide, setSlide] = useState(0);
  const [categories, setCategories] = useState([]); // ✅ MUST

  useEffect(() => {
    setCategories(data?.categories || []);
  }, []);

  const nextSlide = () => {
    if (slide >= categories.length - 5) return;
    setSlide(slide + 1);
  };

  const prevSlide = () => {
    if (slide === 0) return;
    setSlide(slide - 1);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-3">
      
      <div className="flex items-center justify-between my-4">
        <h2 className="text-xl md:text-2xl font-bold">
          What's on your mind?
        </h2>

        <div className="flex gap-2">
          <button onClick={prevSlide} className="btn">
            <FaArrowLeft />
          </button>
          <button onClick={nextSlide} className="btn">
            <FaArrowRight />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex gap-4 transition-transform duration-500"
          style={{ transform: `translateX(-${slide * 180}px)` }}
        >
          {categories.map((cat, index) => (
            <div key={index} className="min-w-[160px]">
              <img
                src={`/images/${cat.image}`}
                alt={cat.path}
                className="w-full h-[190px] object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}