import React, { useState } from "react";
import { RxCaretDown } from "react-icons/rx";
import { CgSearch } from "react-icons/cg";
import { CiDiscount1 } from "react-icons/ci";
import { LuBadgeHelp } from "react-icons/lu";
import { MdOutlinePeople, MdOutlineShoppingCart } from "react-icons/md";

export default function Header({ cart = [], setShowCart, setShowSignIn, user, setUser, onSearch }) {
    const [toggle, setToggle] = useState(false);
    const [location, setLocation] = useState("Ratanada, Jodhpur, Rajasthan, India");
    const [input, setInput] = useState("");
    const [search, setSearch] = useState("");
    const [mobileSearchVisible, setMobileSearchVisible] = useState(false);

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
                    className="w-[300px] sm:w-[500px] bg-white h-full absolute duration-[600ms] p-5"
                    style={{
                        left: toggle ? "0%" : "-600px"
                    }}
                >
                    <h2 className="text-xl font-bold mb-4">Set Location</h2>

                    {/* Input */}
                    <input
                        type="text"
                        placeholder="Enter location"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full border p-2 mb-4 outline-none"
                    />

                    {/* Quick Locations */}
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

                    {/* Button */}
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
            <header className="p-[12px] sm:p-[15px] shadow-xl text-[#686b78] sticky top-0 bg-white z-[9999]">
                <div className="max-w-[1200px] mx-auto flex items-center relative px-2 sm:px-0">
                    
                    {/* Logo */}
                    <div className="w-20 sm:w-[100px] flex-shrink-0">
                        <img src="images/logo.png" className="w-full" alt="Logo" />
                    </div>

                    {/* Location (hidden on very small screens) */}
                    <div className="hidden sm:flex items-center ml-4 cursor-pointer max-w-[50%] truncate" onClick={showSideMenu}>
                        <div className="text-sm truncate">{location}</div>
                        <RxCaretDown className="ml-2" />
                    </div>

                    {/* Search (center) */}
                    <div className="flex-1 px-2 sm:px-6">
                        {/* Desktop / tablet search */}
                        <div className="hidden sm:flex items-center bg-gray-100 rounded overflow-hidden">
                            <CgSearch className="text-xl text-gray-500 ml-3" />
                            <input
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    onSearch && onSearch(e.target.value);
                                }}
                                className="flex-1 p-2 bg-transparent outline-none"
                                placeholder="Search for restaurants or dishes"
                            />
                        </div>

                        {/* Mobile search icon */}
                        <div className="sm:hidden flex items-center">
                            <button onClick={() => setMobileSearchVisible((v) => !v)} className="p-2">
                                <CgSearch className="text-xl text-gray-500" />
                            </button>
                        </div>

                        {/* Mobile inline search overlay */}
                        {mobileSearchVisible && (
                            <div className="absolute left-0 right-0 top-full mt-2 px-4 sm:hidden z-50">
                                <div className="flex items-center bg-gray-100 rounded overflow-hidden p-2">
                                    <CgSearch className="text-xl text-gray-500 ml-1" />
                                    <input
                                        autoFocus
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            onSearch && onSearch(e.target.value);
                                        }}
                                        className="flex-1 p-2 bg-transparent outline-none"
                                        placeholder="Search for restaurants or dishes"
                                    />
                                    <button onClick={() => setMobileSearchVisible(false)} className="ml-2 text-sm text-[#fc8019]">Close</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Links / Actions (right) */}
                    <div className="flex items-center gap-2 overflow-x-auto ml-2">
                        {links.map((link, idx) => (
                            <div
                                key={idx}
                                onClick={() => {
                                  if (link.name === "Cart" && setShowCart) setShowCart(true);
                                  if (link.name === "Sign in" && setShowSignIn) setShowSignIn(true);
                                }}
                                className="flex items-center gap-2 cursor-pointer group p-2 rounded transition-colors duration-200"
                            >
                                <div className="text-2xl text-[#686b78] group-hover:text-[#fc8019]">{link.icons}</div>
                                <div className="flex items-center text-sm text-[#686b78] group-hover:text-[#fc8019]">
                                    {link.name === "Sign in" && user ? (
                                        <div className="flex items-center gap-2">
                                            <span className="hidden sm:inline px-2 py-1 truncate max-w-[120px]">{user.email}</span>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); localStorage.removeItem('user'); setUser && setUser(null); }}
                                                className="text-sm text-[#fc8019]"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    ) : (
                                        <span className="hidden sm:inline">{link.name}</span>
                                    )}
                                    {link.name === "Cart" && (
                                        <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs bg-[#fc8019] text-white rounded-full">{cart?.length || 0}</span>
                                    )}
                                    {link.sub && (
                                        <span className="hidden sm:inline ml-2 text-xs bg-[#ffead1] text-[#fc8019] px-2 rounded group-hover:bg-[#fc8019] group-hover:text-white transition-colors duration-200">{link.sub}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </header>
        </>
    );
}