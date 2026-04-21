import React, { useEffect, useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import data from "../../restaurantChains.json";

export default function Category() {
  const [slide, setSlide] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(data.restaurants);
  }, []);

  const nextSlide = () => {
    if (categories.length - 8 === slide) return;
    setSlide(slide + 3);
  };

  const prevSlide = () => {
    if (slide === 0) return;
    setSlide(slide - 3);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-2">
      <div className="flex my-3 items-center justify-between">
        <div className="text-[25px] font-bold">What's on your mind?</div>

        <div className="flex">
          <div onClick={prevSlide} className="w-[30px] h-[30px] bg-gray-200 flex items-center justify-center rounded-full mx-2 cursor-pointer">
            <FaArrowLeft />
          </div>
          <div onClick={nextSlide} className="w-[30px] h-[30px] bg-gray-200 flex items-center justify-center rounded-full mx-2 cursor-pointer">
            <FaArrowRight />
          </div>
        </div>
      </div>

      <div className="flex overflow-hidden">
        {categories.map((cat, index) => (
          <div
            key={index}
            style={{ transform: `translateX(-${slide * 100}%)` }}
            className="w-[150px] shrink-0 duration-500"
          >
            <img src={`/images/${cat.image}`} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}