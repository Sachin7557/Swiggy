import React from "react";

export default function Card({
  image,
  title,
  rating,
  name,
  place,
  addToCart
}) {
  return (
    <div className="mb-4 w-full">
      <div className="h-[180px] md:h-[200px] rounded-lg overflow-hidden">
        <img
          src={`/images/${image}`}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mt-2 font-bold">{title}</div>
      <div>⭐ {rating}</div>
      <div>{name}</div>
      <div>{place}</div>

      {/* ✅ BUTTON */}
      <button
        onClick={() => {
          addToCart && addToCart();
        }}
        className="mt-2 w-full bg-[#fc8019] text-white py-1 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}