import React, { useState } from "react";
import { RxCaretDown } from "react-icons/rx";
import { CgSearch } from "react-icons/cg";
import { CiDiscount1 } from "react-icons/ci";
import { LuBadgeHelp } from "react-icons/lu";
import { MdOutlinePeople, MdOutlineShoppingCart } from "react-icons/md";

export default function Header() {
    const [toggle, setToggle] = useState(false);
    const [location, setLocation] = useState("Ratanada, Jodhpur, Rajasthan, India");
    const [input, setInput] = useState("");

    const [showSearch, setShowSearch] = useState(false); // ✅ ADDED
    const [search, setSearch] = useState(""); // ✅ ADDED

    const showSideMenu = () => setToggle(true);
    const hideSideMenu = () => setToggle(false);

    const links = [
        { icons: <CgSearch />, name: "Search" },
        { icons: <CiDiscount1 />, name: "Offers", sub: "New" },
        { icons: <LuBadgeHelp />, name: "Help" },
        { icons: <MdOutlinePeople />, name: "Sign in" },
        { icons: <MdOutlineShoppingCart />, name: "Cart" }
    ];

    return (
        <>
            {/* 🔥 SEARCH POPUP */}
            {showSearch && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-[999999]">
                    <div className="bg-white p-5 rounded-lg">
                        <button onClick={() => setShowSearch(false)}>X</button>

                        <input
                            type="text"
                            placeholder="Search..."
                            className="border p-2 ml-2"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            )}

            {/* Overlay + Sidebar */}
            <div
                className="black-overlay w-full h-full fixed duration-500"
                onClick={hideSideMenu}
                style={{
                    opacity: toggle ? 1 : 0,
                    visibility: toggle ? "visible" : "hidden",
                    zIndex: 999999
                }}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="w-[500px] bg-white h-full absolute duration-[600ms] p-5"
                    style={{
                        left: toggle ? "0%" : "-600px"
                    }}
                >
                    <h2 className="text-xl font-bold mb-4">Set Location</h2>

                    <input
                        type="text"
                        placeholder="Enter location"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full border p-2 mb-4 outline-none"
                    />

                    <div className="flex flex-col gap-3">
                        {["Delhi", "Mumbai", "Bangalore", "Chandigarh", "Punjab", "Ratanada, Jodhpur, Rajasthan, India"].map((city, i) => (
                            <div
                                key={i}
                                className="p-2 border cursor-pointer hover:bg-gray-100"
                                onClick={() => {
                                    setLocation(city);
                                    hideSideMenu();
                                }}
                            >
                                {city}
                            </div>
                        ))}
                    </div>

                    <button
                        className="mt-4 bg-[#fc8019] text-white px-4 py-2 rounded"
                        onClick={() => {
                            if (input.trim()) {
                                setLocation(input);
                                setInput("");
                                hideSideMenu();
                            }
                        }}
                    >
                        Set Location
                    </button>
                </div>
            </div>

            {/* Header */}
            <header className="p-[15px] shadow-xl text-[#686b78] sticky top-0 bg-white z-[9999]">
                <div className="max-w-[1200px] mx-auto flex items-center">
                    
                    <div className="w-[100px]">
                        <img src="images/logo.png" className="w-full" alt="Logo" />
                    </div>

                    <div>
                        <span className="font-bold border-b-[3px] border-black">
                            {location.split(",")[0]},
                        </span>
                        {location.includes(",") &&
                            location.substring(location.indexOf(",") + 1)}

                        <RxCaretDown
                            fontSize={25}
                            className="inline text-[#fc8019] cursor-pointer"
                            onClick={showSideMenu}
                        />
                    </div>

                    <nav className="hidden md:flex list-none gap-10 ml-auto font-semibold text-[18px]">
                        {links.map((link, index) => (
                            <li
                                key={index}
                                className="flex items-center gap-2 hover:text-[#fc8019] cursor-pointer"
                                onClick={() => {
                                    if (link.name === "Search") {
                                        setShowSearch(true); // ✅ CLICK FIX
                                    }
                                }}
                            >
                                {link.icons}
                                {link.name}
                                {link.sub && <sup>{link.sub}</sup>}
                            </li>
                        ))}
                    </nav>
                </div>
            </header>
        </>
    );
}