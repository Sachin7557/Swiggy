import React, { useEffect, useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import Card from "./Card";
import data from "../../restaurantChains.json";

export default function TopRest({ setCart, search = "" }) {
  const [dataList, setData] = useState([]);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    setData(data?.restaurants || []);
  }, []);

  const parsePrice = (offer) => {
    if (!offer) return 199;
    const m = offer.match(/\d+/);
    return m ? Number(m[0]) : 199;
  };

  const addToCart = (item) => {
    const price = parsePrice(item.offer);
    const itemWithPrice = { ...item, price };
    if (typeof setCart === "function") {
      setCart((prev) => [...(prev || []), itemWithPrice]);
    }
    console.log("Added:", itemWithPrice);
  };

  const nextSlide = () => {
    if (slide >= dataList.length - 3) return;
    setSlide(slide + 1);
  };

  const prevSlide = () => {
    if (slide === 0) return;
    setSlide(slide - 1);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-3">
      <div className="flex my-5 items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold">
          Top Restaurant Chains
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
          style={{ transform: `translateX(-${slide * 260}px)` }}
        >
          {dataList
            .filter((d) => {
              if (!search) return true;
              const s = search.toLowerCase();
              return (
                (d.title && d.title.toLowerCase().includes(s)) ||
                (d.name && d.name.toLowerCase().includes(s)) ||
                (d.place && d.place.toLowerCase().includes(s)) ||
                (d.offer && d.offer.toLowerCase().includes(s))
              );
            })
            .map((d, i) => (
              <div key={i} className="min-w-[250px]">
                <Card
                  {...d}
                  addToCart={() => addToCart(d)}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}