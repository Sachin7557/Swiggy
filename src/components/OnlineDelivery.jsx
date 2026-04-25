import React, { useEffect, useState } from "react";
import Card from "./Card";
import data from "../../restaurantChains.json";

export default function OnlineDelivery({ search = "" }) {
  const [dataList, setData] = useState([]);

  useEffect(() => {
    setData(data?.restaurants || []);
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto px-3">
      <h2 className="text-xl md:text-2xl font-bold my-5">
        Restaurants with online food delivery
      </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
            <Card key={i} {...d} />
          ))}
      </div>
    </div>
  );
}