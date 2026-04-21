import React, { useEffect, useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import Card from "./Card";
import data from "../../restaurantChains.json";

export default function TopRest() {
  const [dataList, setData] = useState([]);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    setData(data.restaurants);
  }, []);

  const nextSlide = () => {
    if (dataList.length - 4 <= slide) return;
    setSlide(slide + 1);
  };

  const prevSlide = () => {
    if (slide === 0) return;
    setSlide(slide - 1);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-2">
      <div className="flex my-5 items-center justify-between">
        <div className="text-[25px] font-bold">
          Top Restaurant chains in Jodhpur
        </div>

        <div className="flex ml-auto">
          <div onClick={prevSlide} className="w-[30px] h-[30px] bg-gray-200 flex items-center justify-center rounded-full mx-2 cursor-pointer">
            <FaArrowLeft />
          </div>
          <div onClick={nextSlide} className="w-[30px] h-[30px] bg-gray-200 flex items-center justify-center rounded-full mx-2 cursor-pointer">
            <FaArrowRight />
          </div>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex gap-5 transition-transform duration-300"
          style={{ transform: `translateX(-${slide * 300}px)` }}
        >
          {dataList.map((d, i) => (
            <Card key={i} {...d} />
          ))}
        </div>
      </div>
    </div>
  );
}