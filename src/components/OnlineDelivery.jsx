import React, { useEffect, useState } from "react";
import Card from "./Card";
import data from "../../restaurantChains.json";

export default function OnlineDelivery() {
  const [dataList, setData] = useState([]);

  useEffect(() => {
    setData(data.restaurants);
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto px-2">
      <div className="text-[25px] font-bold my-5">
        Restaurants with online food delivery
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {dataList.map((d, i) => (
          <Card key={i} {...d} />
        ))}
      </div>
    </div>
  );
}