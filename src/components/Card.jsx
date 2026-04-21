import React from "react";

export default function Card(props) {
  return (
    <div className="mb-3">
      <div className="h-[182px] rounded-[15px] overflow-hidden relative">
        <img
          className="object-cover w-full h-full"
          src={`/images/${props.image}`}  // ✅ FIXED
          alt=""
        />
      </div>

      <div className="mt-2 font-bold">{props.title}</div>
      <div>{props.rating}</div>
      <div>{props.name}</div>
      <div>{props.place}</div>
    </div>
  );
}