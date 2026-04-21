import React, { useEffect } from "react";
import { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

export default function Category() {
  const [slide, setSlide] = useState(0);

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:5000/categories");
    const data = await response.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const nextSlide = () => {
    console.log(categories.length);
    if (categories.length - 8 == slide) return false;
    setSlide(slide + 3);
  };

  const prevSlide = () => {
    if (slide == 0) return false;
    setSlide(slide - 3);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-2">
      <div className="flex my-3 items-center justify-between">
        <div className="text-[25px] font-bold">What's on your mind?</div>

        <div className="flex">
          <div
            className="flex justify-center items-center w-[30px] h-[30px] bg-[#e2e2e7] rounded-full mx-2 cursor-pointer"
            onClick={prevSlide}
          >
            <FaArrowLeft />
          </div>
          <div
            className="flex justify-center items-center w-[30px] h-[30px] bg-[#e2e2e7] rounded-full mx-2 cursor-pointer"
            onClick={nextSlide}
          >
            <FaArrowRight />
          </div>
        </div>
      </div>

      <div className="flex overflow-hidden">
        {categories.map((cat, index) => {
          return (
            <div
              style={{
                transform: `translateX(-${slide * 100}%)`,
              }}
              key={index}
              className="w-[150px] shrink-0 duration-500"
            >
              <img src={`/images/${cat.image}`} alt="" />
            </div>
          );
        })}
      </div>
      <hr className="my-6 border-[2px]" />
    </div>
  );
}
