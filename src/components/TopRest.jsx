import React, { useEffect, useState } from 'react'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import Card from './Card';

export default function TopRest() {
    const [data, setData] = useState([]);
    const [slide, setSlide] = useState(0); // ✅ added

    const fetchTopRestaurent = async () => {
        const response = await fetch("http://localhost:5001/restaurants")
        const apiData = await response.json();
        setData(apiData);
    }

    useEffect(() => {
        fetchTopRestaurent();
    }, [])

    // ❌ categories -> ✅ data
    const nextSlide = () => {
        if (data.length - 4 <= slide) return;
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

            {/* ✅ slider fix */}
            <div className="overflow-hidden">
                <div
                    className="flex gap-5 transition-transform duration-300"
                    style={{ transform: `translateX(-${slide * 300}px)` }}
                >
                    {
                        data.map((d, i) => (
                            <Card width="w-full md:w-[273px] " {...d} key={i} />
                        ))
                    }
                </div>
            </div>
            <hr className="my-2 border-[2px]" />
        </div>
    )
}